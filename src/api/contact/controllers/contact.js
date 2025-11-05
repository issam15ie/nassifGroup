'use strict';

/**
 * A set of functions called "actions" for `contact`
 */

module.exports = {
  async sendMessage(ctx) {
    try {
      const { name, email, message, subject, phone } = ctx.request.body;

      // Validate required fields
      if (!name || !email || !message) {
        return ctx.badRequest('Missing required fields');
      }

      // Get recipient email from environment or default
      const recipientEmail = process.env.EMAIL_FROM || 'info@nassifgroup.com';

      // Send email using Strapi email plugin
      await strapi.plugins['email'].services.email.send({
        to: recipientEmail,
        from: recipientEmail,
        replyTo: email,
        subject: `Contact Form: ${subject || 'New Message'}`,
        html: `
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      ctx.send({
        message: 'Message sent successfully',
      });
    } catch (error) {
      console.error('Email error:', error);
      ctx.internalServerError('Failed to send message');
    }
  },
};
