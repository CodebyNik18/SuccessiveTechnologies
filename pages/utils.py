html_message = f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Request</title>
</head>
<body style="margin:0;padding:0;background:#080b11;font-family:Arial,Helvetica,sans-serif;color:#f3f4f6;">

  <div style="display:none;font-size:1px;color:#080b11;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    A new project request has arrived from the SuccessiveTechnologies contact form.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#080b11;padding:35px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:650px;background:#111827;border:1px solid #273449;">

          <tr>
            <td style="padding:28px 30px;border-bottom:1px solid #273449;">
              <p style="margin:0;color:#ffffff;font-size:19px;font-weight:bold;letter-spacing:1px;">
                SuccessiveTechnologies
              </p>
              <p style="margin:10px 0 0;color:#60a5fa;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
                Project Inquiry Notification
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">
              <h1 style="margin:0 0 12px;color:#ffffff;font-size:26px;line-height:1.35;">
                A new project starts here.
              </h1>

              <p style="margin:0 0 28px;color:#a5b4c7;font-size:14px;line-height:1.8;">
                A visitor has submitted a detailed project inquiry. Review their requirements below and follow up with them.
              </p>

              <p style="margin:0 0 10px;color:#60a5fa;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                01 / Contact Information
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;">
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;width:36%;">Full name</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#f3f4f6;">{{name}}</td>
                </tr>
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;">Work email</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;overflow-wrap:anywhere;">
                    <a href="mailto:{{email}}" style="color:#60a5fa;text-decoration:none;">{{email}}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;">Company</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#f3f4f6;">{{company}}</td>
                </tr>
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;">Phone</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#f3f4f6;">{{phone}}</td>
                </tr>
              </table>

              <p style="margin:28px 0 10px;color:#60a5fa;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                02 / Project Scope
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;">
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;width:36%;">Service required</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#f3f4f6;">{{service}}</td>
                </tr>
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;">Timeline</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#f3f4f6;">{{timeline}}</td>
                </tr>
                <tr>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#94a3b8;">Budget range</td>
                  <td style="padding:13px 0;border-bottom:1px solid #273449;color:#f3f4f6;">{{budget}}</td>
                </tr>
              </table>

              <p style="margin:28px 0 10px;color:#60a5fa;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                03 / Project Description
              </p>

              <div style="padding:20px;background:#080b11;border:1px solid #273449;color:#d1d5db;font-size:14px;line-height:1.9;white-space:pre-wrap;overflow-wrap:anywhere;">{{message}}</div>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                <tr>
                  <td style="background:#f3f4f6;">
                    <a href="mailto:{{email}}?subject=Re%3A%20Your%20Project%20Inquiry" style="display:inline-block;padding:14px 21px;color:#080b11;font-size:13px;font-weight:bold;text-decoration:none;">
                      Reply to Client &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:26px 0 0;color:#64748b;font-size:12px;line-height:1.8;">
                Please review the requirements and respond within one business day where possible.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px;border-top:1px solid #273449;">
              <p style="margin:0;color:#64748b;font-size:11px;line-height:1.8;">
                &copy; SuccessiveTechnologies. All rights reserved.<br>
                Automated notification for the website administrator.
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