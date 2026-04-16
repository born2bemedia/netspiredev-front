import { NextResponse } from 'next/server';

import type { MailDataRequired } from '@sendgrid/mail';
import sgMail from '@sendgrid/mail';

import {
  createBrandedEmailHtml,
  escapeHtml,
  renderEmailDetailsSection,
  renderEmailLink,
  renderEmailParagraph,
  renderEmailSpacer,
  type EmailDetail,
} from '@/shared/lib/email/brandedEmail';
import { verifyRecaptcha } from '@/shared/lib/recaptcha';

export const runtime = 'nodejs';

const ENABLE_RECAPTCHA = false;

type RequestPayload = {
  service: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  message: string;
};

type CustomSolutionPayload = {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  projectTypes: string[];
  projectTypeOther: string;
  budget: string;
  goals: string;
  timeline: string;
  communicationPreferences: string[];
  attachmentNames: string[];
};

type Attachment = {
  content: string;
  filename: string;
  type: string;
  disposition: 'attachment';
};

const formatList = (items: string[]) =>
  items.filter(Boolean).map((item) => escapeHtml(item)).join(', ') || 'Not specified';

const getOptionalText = (value: string | undefined | null, fallback: string) => {
  const trimmed = String(value ?? '').trim();
  return trimmed ? escapeHtml(trimmed) : fallback;
};

const parseEmailList = (value: string | undefined) =>
  (value ?? '')
    .split(/[,\n;]/)
    .map((item) => item.trim())
    .filter(Boolean);

const getEmailConfig = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  const adminEmails = parseEmailList(process.env.ADMIN_EMAIL);
  const fromEmail = process.env.FROM_EMAIL?.trim();

  if (!apiKey || adminEmails.length === 0 || !fromEmail) {
    throw new Error('Email configuration is missing.');
  }

  sgMail.setApiKey(apiKey);

  return { adminEmails, fromEmail };
};

const sendEmail = async (message: MailDataRequired, label: string) => {
  try {
    await sgMail.send(message);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'body' in error.response
    ) {
      console.error(`SendGrid ${label} error:`, error.response.body);
    }

    throw error;
  }
};

const buildParagraphStack = (paragraphs: string[]) =>
  paragraphs
    .map((paragraph, index) =>
      `${index > 0 ? renderEmailSpacer() : ''}${renderEmailParagraph(paragraph)}`
    )
    .join('');

const buildUserEmailHtml = (options: {
  previewTitle: string;
  intro: string;
  followUp?: string;
}) =>
  createBrandedEmailHtml({
    previewTitle: options.previewTitle,
    headingLines: [
      { text: 'Thank you for reaching out to' },
      { text: 'Netspire Dev!', color: '#ff4500' },
    ],
    bodyHtml: buildParagraphStack(
      [options.intro, options.followUp ?? 'We look forward to working with you.'].filter(Boolean)
    ),
  });

const buildAdminEmailHtml = (options: {
  previewTitle: string;
  headingLines: { text: string; color?: string }[];
  intro: string;
  detailsTitle: string;
  details: EmailDetail[];
}) =>
  createBrandedEmailHtml({
    previewTitle: options.previewTitle,
    headingLines: options.headingLines,
    bodyHtml: buildParagraphStack([
      options.intro,
      `You can reply directly to this email or contact the client via ${renderEmailLink(
        `mailto:${options.details.find((detail) => detail.label === 'Email')?.value ?? ''}`,
        options.details.find((detail) => detail.label === 'Email')?.value ?? 'their email'
      )}.`,
    ]),
    detailsHtml: renderEmailDetailsSection(options.detailsTitle, options.details),
    signoffLines: ['Internal notification,', 'Netspire Dev Website'],
  });

const buildRequestUserEmailHtml = (_payload: RequestPayload) =>
  buildUserEmailHtml({
    previewTitle: 'Request Received - Netspire Dev',
    intro:
      "We've received your project request and are currently reviewing the details. Our team will contact you shortly to discuss your idea, clarify requirements, and outline the next steps.",
  });

const buildRequestAdminEmailHtml = (payload: RequestPayload) =>
  buildAdminEmailHtml({
    previewTitle: `New Service Request: ${payload.service || 'Unknown service'}`,
    headingLines: [
      { text: 'New service request' },
      { text: payload.service || 'Netspire Dev', color: '#ff4500' },
    ],
    intro: 'A new service request has been submitted through the website.',
    detailsTitle: 'Request details',
    details: [
      { label: 'Service', value: escapeHtml(payload.service || 'Not specified') },
      { label: 'Full name', value: escapeHtml(payload.fullName) },
      { label: 'Email', value: escapeHtml(payload.email) },
      { label: 'Phone', value: getOptionalText(payload.phone, 'Not provided') },
      { label: 'Company name', value: getOptionalText(payload.companyName, 'Not provided') },
      { label: 'Website', value: getOptionalText(payload.website, 'Not provided') },
      { label: 'Message', value: getOptionalText(payload.message, 'Not provided') },
    ],
  });

const buildCustomSolutionUserEmailHtml = (_payload: CustomSolutionPayload) =>
  buildUserEmailHtml({
    previewTitle: 'Custom Solution Request Received - Netspire Dev',
    intro:
      "We've received your project request and are currently reviewing the details. Our team will contact you shortly to discuss your idea, clarify requirements, and outline the next steps.",
  });

const buildCustomSolutionAdminEmailHtml = (payload: CustomSolutionPayload) =>
  buildAdminEmailHtml({
    previewTitle: 'Custom Solution Request - Netspire Dev',
    headingLines: [
      { text: 'New custom solution' },
      { text: 'request received', color: '#ff4500' },
    ],
    intro: 'A new custom solution request has been submitted through the website.',
    detailsTitle: 'Project details',
    details: [
      { label: 'Full name', value: escapeHtml(payload.fullName) },
      { label: 'Email', value: escapeHtml(payload.email) },
      { label: 'Phone', value: getOptionalText(payload.phone, 'Not provided') },
      { label: 'Website', value: getOptionalText(payload.website, 'Not provided') },
      { label: 'Project types', value: formatList(payload.projectTypes) },
      { label: 'Other project type', value: getOptionalText(payload.projectTypeOther, 'Not specified') },
      { label: 'Estimated budget', value: getOptionalText(payload.budget, 'Not specified') },
      { label: 'Main goals', value: getOptionalText(payload.goals, 'Not specified') },
      { label: 'Timeline', value: getOptionalText(payload.timeline, 'Not specified') },
      {
        label: 'Preferred communication',
        value: formatList(payload.communicationPreferences),
      },
      { label: 'Attachments', value: formatList(payload.attachmentNames) },
    ],
  });

const parseJsonBody = async (request: Request) => {
  const body = (await request.json()) as {
    formType: 'request';
    data: RequestPayload & { recaptcha?: string };
  };

  return {
    formType: body.formType,
    payload: body.data,
    attachments: [] as Attachment[],
  };
};

const parseMultipartBody = async (request: Request) => {
  const formData = await request.formData();
  const attachments: Attachment[] = [];
  const files = formData.getAll('attachments');

  for (const value of files) {
    if (!(value instanceof File) || value.size === 0) {
      continue;
    }

    const buffer = Buffer.from(await value.arrayBuffer());

    attachments.push({
      content: buffer.toString('base64'),
      filename: value.name,
      type: value.type || 'application/octet-stream',
      disposition: 'attachment',
    });
  }

  return {
    formType: String(formData.get('formType') ?? ''),
    payload: {
      fullName: String(formData.get('fullName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      website: String(formData.get('website') ?? ''),
      projectTypes: formData.getAll('projectTypes').map(String),
      projectTypeOther: String(formData.get('projectTypeOther') ?? ''),
      budget: String(formData.get('budget') ?? ''),
      goals: String(formData.get('goals') ?? ''),
      timeline: String(formData.get('timeline') ?? ''),
      communicationPreferences: formData.getAll('communicationPreferences').map(String),
      attachmentNames: attachments.map((attachment) => attachment.filename),
      recaptcha: String(formData.get('recaptcha') ?? ''),
    },
    attachments,
  };
};

async function handleRequestForm(
  payload: RequestPayload & { recaptcha?: string },
  attachments: Attachment[]
) {
  const { adminEmails, fromEmail } = getEmailConfig();

  const { recaptcha: _recaptcha, ...requestData } = payload;
  void _recaptcha;
  void attachments;

  await sendEmail({
    to: adminEmails,
    from: fromEmail,
    replyTo: requestData.email,
    subject: `New Service Request: ${requestData.service || 'Unknown service'}`,
    html: buildRequestAdminEmailHtml(requestData),
  }, 'admin request notification');

  await sendEmail({
    to: requestData.email,
    from: fromEmail,
    subject: "We've Received Your Request",
    html: buildRequestUserEmailHtml(requestData),
  }, 'request confirmation');
}

async function handleCustomSolutionForm(
  payload: (CustomSolutionPayload & { recaptcha?: string }) | Record<string, unknown>,
  attachments: Attachment[]
) {
  const { adminEmails, fromEmail } = getEmailConfig();
  const customPayload = payload as CustomSolutionPayload & { recaptcha?: string };
  const { recaptcha: _recaptcha, ...requestData } = customPayload;
  void _recaptcha;

  await sendEmail({
    to: adminEmails,
    from: fromEmail,
    replyTo: requestData.email,
    subject: 'Custom Solution Request',
    html: buildCustomSolutionAdminEmailHtml(requestData),
    attachments,
  }, 'admin custom solution notification');

  await sendEmail({
    to: requestData.email,
    from: fromEmail,
    subject: "We've Received Your Custom Solution Request",
    html: buildCustomSolutionUserEmailHtml(requestData),
  }, 'custom solution confirmation');
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    const parsed = contentType.includes('multipart/form-data')
      ? await parseMultipartBody(request)
      : await parseJsonBody(request);

    const rawData = parsed.payload as Record<string, unknown> & { recaptcha?: string };
    const recaptcha = rawData.recaptcha;

    if (ENABLE_RECAPTCHA) {
      if (!recaptcha || recaptcha === 'disabled') {
        return NextResponse.json(
          { message: 'reCAPTCHA verification is required.' },
          { status: 400 }
        );
      }

      const isValid = await verifyRecaptcha(recaptcha);

      if (!isValid) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    if (parsed.formType === 'request') {
      await handleRequestForm(parsed.payload as RequestPayload & { recaptcha?: string }, parsed.attachments);
    } else if (parsed.formType === 'custom-solution') {
      await handleCustomSolutionForm(parsed.payload, parsed.attachments);
    } else {
      return NextResponse.json({ message: 'Unsupported form type.' }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Email configuration is missing.') {
      console.error('SENDGRID_API_KEY, ADMIN_EMAIL or FROM_EMAIL is not set');
      return NextResponse.json({ message: 'Email configuration is missing.' }, { status: 500 });
    }

    console.error('Error submitting request:', error);
    return NextResponse.json({ message: 'Failed to submit request' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Request submitted successfully' }, { status: 200 });
}
