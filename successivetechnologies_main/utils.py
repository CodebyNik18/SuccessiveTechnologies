import os
from dotenv import load_dotenv
from brevo import Brevo
from brevo.transactional_emails import (
    SendTransacEmailRequestSender,
    SendTransacEmailRequestToItem
)

load_dotenv()

def send_email(email: str, name: str, message: str) -> str:
    html_message = f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#080b11;font-family:Arial,Helvetica,sans-serif;color:#f3f4f6;">

  <div style="display:none;font-size:1px;color:#080b11;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    A new project inquiry has been submitted on your website.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#080b11;padding:35px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#111827;border:1px solid #273449;">

          <tr>
            <td style="padding:28px 30px;border-bottom:1px solid #273449;">
              <p style="margin:0;color:#ffffff;font-size:19px;font-weight:bold;letter-spacing:1px;">
                SuccessiveTechnologies
              </p>
              <p style="margin:10px 0 0;color:#60a5fa;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
                New Website Inquiry
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">
              <h1 style="margin:0 0 12px;font-size:25px;line-height:1.35;color:#ffffff;">
                You've received a new inquiry.
              </h1>

              <p style="margin:0 0 26px;font-size:14px;line-height:1.8;color:#a5b4c7;">
                Someone has expressed interest in working with your team. Here are the details submitted through your website.
              </p>

              <p style="margin:0 0 8px;color:#60a5fa;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                Contact Details
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;">
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;width:35%;">Name</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#f3f4f6;">{name}</td>
                </tr>
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;">Email</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;">
                    <a href="mailto:{email}" style="color:#60a5fa;text-decoration:none;">{email}</a>
                  </td>
                </tr>
              </table>

              <p style="margin:26px 0 10px;color:#60a5fa;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                Project Requirements
              </p>

              <div style="padding:18px;background:#080b11;border:1px solid #273449;font-size:14px;line-height:1.8;color:#d1d5db;white-space:pre-wrap;overflow-wrap:anywhere;">{message}</div>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                <tr>
                  <td style="background:#f3f4f6;">
                    <a href="mailto:{email}?subject=Re%3A%20Your%20Website%20Inquiry" style="display:inline-block;padding:14px 21px;color:#080b11;font-size:13px;font-weight:bold;text-decoration:none;">
                      Reply to Inquiry &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:25px 0 0;font-size:12px;line-height:1.7;color:#64748b;">
                This notification was generated automatically when a visitor submitted the website inquiry form.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px;border-top:1px solid #273449;">
              <p style="margin:0;color:#64748b;font-size:11px;line-height:1.8;">
                &copy; SuccessiveTechnologies. All rights reserved.<br>
                Confidential business inquiry — intended for the website administrator.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
"""
    client = Brevo(api_key=os.getenv('BREVO_API_KEY'))

    result = client.transactional_emails.send_transac_email(
        subject=f"New Website Inquiry — {name}",
        html_content=html_message,
        sender=SendTransacEmailRequestSender(
                email="ashumanager77@gmail.com",
            ),
            to=[
                SendTransacEmailRequestToItem(
                    email="ashumanager77@gmail.com",
                    name="Ashu",
                )
            ],
    )