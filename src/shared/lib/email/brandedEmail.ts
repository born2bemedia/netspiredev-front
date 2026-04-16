import {
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
} from '@/shared/lib/constants/constants';

const WEBSITE_URL = 'https://netspiredev.com';
const EMAIL_HEADER_IMAGE = `${WEBSITE_URL}/images/email_header.png`;
const EMAIL_FOOTER_MARK_IMAGE = `${WEBSITE_URL}/images/email-footer-mark.png`;

export type EmailDetail = {
  label: string;
  value: string;
};

export type EmailHeadingLine = {
  text: string;
  color?: string;
};

type CreateBrandedEmailOptions = {
  previewTitle: string;
  headingLines: EmailHeadingLine[];
  bodyHtml: string;
  detailsHtml?: string;
  signoffLines?: string[];
};

export const escapeHtml = (value: string | number | null | undefined) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const renderEmailParagraph = (content: string) =>
  `<p style="margin: 0; color: #efefef; font-size: 14px; line-height: 1.4; font-weight: 400; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">${content}</p>`;

export const renderEmailSpacer = (height = 24) =>
  `<div style="height: ${height}px; line-height: ${height}px;">&nbsp;</div>`;

export const renderEmailLink = (href: string, label: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #ff4500; text-decoration: underline;">${label}</a>`;

export const renderEmailDetailsSection = (title: string, details: EmailDetail[]) => `
  <div style="margin-top: 24px;">
    <p style="margin: 0 0 12px; color: #ff4500; font-size: 10px; line-height: 1.4; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
      ${escapeHtml(title)}
    </p>
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      ${details
        .map(
          ({ label, value }) => `
            <tr>
              <td valign="top" style="padding: 0 0 10px; width: 170px; color: rgba(239, 239, 239, 0.55); font-size: 12px; line-height: 1.4; font-weight: 400; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                ${escapeHtml(label)}
              </td>
              <td valign="top" style="padding: 0 0 10px; color: #efefef; font-size: 12px; line-height: 1.4; font-weight: 400; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                ${value}
              </td>
            </tr>
          `
        )
        .join('')}
    </table>
  </div>
`;

const renderHeading = (headingLines: EmailHeadingLine[]) =>
  headingLines
    .map(
      ({ text, color = '#efefef' }, index) => `
        <p style="margin: ${index === 0 ? '0' : '2px'} 0 0; color: ${color}; font-size: 24px; line-height: 1.2; font-weight: 700; letter-spacing: -0.03em; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
          ${escapeHtml(text)}
        </p>
      `
    )
    .join('');

const renderSignoff = (signoffLines: string[]) => `
  <div style="margin-top: 24px;">
    ${signoffLines
      .map(
        (line) => `
          <p style="margin: 0; color: #efefef; font-size: 18px; line-height: 1.2; font-weight: 700; letter-spacing: -0.03em; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
            ${escapeHtml(line)}
          </p>
        `
      )
      .join('')}
    <p style="margin: 2px 0 0; font-size: 18px; line-height: 1.2; font-weight: 700; letter-spacing: -0.03em; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
      ${renderEmailLink(WEBSITE_URL, 'netspiredev.com')}
    </p>
  </div>
`;

export const createBrandedEmailHtml = ({
  previewTitle,
  headingLines,
  bodyHtml,
  detailsHtml = '',
  signoffLines = ['Kind regards,', 'The Netspire Dev Crew'],
}: CreateBrandedEmailOptions) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(previewTitle)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #1a1a1a;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #1a1a1a;">
      <tr>
        <td align="center" style="padding: 0;">
          <table role="presentation" style="width: 100%; max-width: 640px; border-collapse: collapse; background-color: #1a1a1a; margin: 0 auto;">
            <tr>
              <td style="padding: 0; background-color: #0d0d0d;">
                <img
                  src="${EMAIL_HEADER_IMAGE}"
                  alt="Netspire Dev"
                  width="640"
                  style="display: block; width: 100%; max-width: 640px; height: auto; border: 0;"
                />
              </td>
            </tr>
            <tr>
              <td style="padding: 40px; background-color: #141312;">
                ${renderHeading(headingLines)}
                <div style="margin-top: 24px;">${bodyHtml}</div>
                ${detailsHtml}
                ${renderSignoff(signoffLines)}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 24px 14px; background-color: #0d0d0d;">
                <p style="margin: 0 0 10px; color: #ff4500; font-size: 6px; line-height: 1.4; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                  ■ Contact
                </p>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td valign="top" style="padding: 0 12px 0 0; width: 120px;">
                      <a
                        href="mailto:${escapeHtml(WEBSITE_EMAIL)}"
                        style="color: rgba(239, 239, 239, 0.7); font-size: 10px; line-height: 1.4; font-weight: 400; text-decoration: underline; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;"
                      >
                        ${escapeHtml(WEBSITE_EMAIL)}
                      </a>
                      <p style="margin: 4px 0 0; color: rgba(239, 239, 239, 0.7); font-size: 10px; line-height: 1.4; font-weight: 400; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                        ${escapeHtml(WEBSITE_PHONE)}
                      </p>
                    </td>
                    <td valign="top" style="padding: 0 12px 0 0; width: 150px;">
                      <p style="margin: 0; color: rgba(239, 239, 239, 0.35); font-size: 10px; line-height: 1.4; font-weight: 400; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                        Office address:
                      </p>
                      <p style="margin: 0; color: rgba(239, 239, 239, 0.7); font-size: 10px; line-height: 1.4; font-weight: 400; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                        ${escapeHtml(WEBSITE_OFFICE_ADDRESS)}
                      </p>
                    </td>
                    <td valign="top" style="padding: 0 12px 0 0; width: 150px;">
                      <p style="margin: 0; color: rgba(239, 239, 239, 0.35); font-size: 10px; line-height: 1.4; font-weight: 400; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                        Registered address:
                      </p>
                      <p style="margin: 0; color: rgba(239, 239, 239, 0.7); font-size: 10px; line-height: 1.4; font-weight: 400; font-family: 'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                        ${escapeHtml(WEBSITE_REGISTERED_ADDRESS)}
                      </p>
                    </td>
                    <td align="right" valign="bottom" style="width: 56px;">
                      <img
                        src="${EMAIL_FOOTER_MARK_IMAGE}"
                        alt="Netspire Dev mark"
                        width="45"
                        height="42"
                        style="display: block; width: 45px; height: 42px; border: 0; margin-left: auto;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
