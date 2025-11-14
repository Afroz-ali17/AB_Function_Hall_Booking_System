import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingNotificationProps = {
  bookingId: number;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  message?: string;
};

export async function sendBookingNotification(data: BookingNotificationProps) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@abfunctionhall.com';
    
    const emailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .detail-row { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #666; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #1a1a1a; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Booking Request</h1>
              <p>AB Function Hall</p>
            </div>
            
            <div class="content">
              <p>A new booking request has been submitted. Please review the details below:</p>
              
              <div class="detail-row">
                <div class="label">Booking ID</div>
                <div class="value">#${data.bookingId}</div>
              </div>
              
              <div class="detail-row">
                <div class="label">Client Name</div>
                <div class="value">${data.name}</div>
              </div>
              
              <div class="detail-row">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              
              <div class="detail-row">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              
              <div class="detail-row">
                <div class="label">Event Type</div>
                <div class="value">${data.eventType}</div>
              </div>
              
              <div class="detail-row">
                <div class="label">Event Dates</div>
                <div class="value">${data.startDate} to ${data.endDate}</div>
              </div>
              
              <div class="detail-row">
                <div class="label">Expected Guests</div>
                <div class="value">${data.guestCount} guests</div>
              </div>
              
              ${data.message ? `
              <div class="detail-row">
                <div class="label">Additional Requirements</div>
                <div class="value">${data.message}</div>
              </div>
              ` : ''}
              
              <div style="text-align: center; margin-top: 30px;">
                <p><strong>Next Steps:</strong></p>
                <p>Contact the client to discuss pricing and confirm the booking.</p>
              </div>
            </div>
            
            <div class="footer">
              <p>This is an automated notification from AB Function Hall booking system.</p>
              <p>© ${new Date().getFullYear()} AB Function Hall. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: 'AB Function Hall <onboarding@resend.dev>',
      to: [adminEmail],
      subject: `New Booking Request #${data.bookingId} - ${data.eventType}`,
      html: emailContent,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}
