import nodemailer from 'nodemailer'

function escapeHtml(str) {
  if (!str) return '—'
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(request) {
  try {
    const { name, business, phone, email, message } = await request.json()

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_USER.includes('YOUR_')) {
      return Response.json({ error: 'Email service not yet configured.' }, { status: 503 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Selmasi Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'Info@selmasi.africa',
      replyTo: email,
      subject: `New enquiry from ${escapeHtml(name)} – ${escapeHtml(business) || 'No business name'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#fdfaf6;border:1px solid #ede3d5;border-radius:12px;">
          <h2 style="font-size:22px;color:#2a1a0e;margin-bottom:24px;">New Website Enquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #ede3d5;color:#7a6350;font-size:13px;width:140px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #ede3d5;font-size:14px;color:#2a1a0e;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #ede3d5;color:#7a6350;font-size:13px;">School / Business</td><td style="padding:10px 0;border-bottom:1px solid #ede3d5;font-size:14px;color:#2a1a0e;">${escapeHtml(business)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #ede3d5;color:#7a6350;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #ede3d5;font-size:14px;color:#2a1a0e;">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #ede3d5;color:#7a6350;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #ede3d5;font-size:14px;color:#2a1a0e;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:10px 0;color:#7a6350;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px 0;font-size:14px;color:#2a1a0e;line-height:1.7;">${escapeHtml(message)}</td></tr>
          </table>
          <p style="margin-top:28px;font-size:12px;color:#b0a090;">Sent from selmasi.africa contact form</p>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Failed to send message. Please contact us via WhatsApp or email directly.' }, { status: 500 })
  }
}
