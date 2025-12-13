# EmailJS Setup Guide for Contact Us Form

## Overview
The contact form has been integrated with EmailJS, which allows sending emails directly from the frontend without needing a backend server setup.

## Installation Status
✅ `@emailjs/browser` package has been installed

## Setup Steps

### Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create an Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Custom SMTP, etc.)
4. Follow the prompts to connect your email account
5. Copy your **Service ID** (looks like: `service_xxxxxxxxxxxx`)

### Step 3: Create an Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set the template name (e.g., "Contact Form")
4. Use the following template variables:

```
Subject: New Contact from {{from_name}}

Body:
Name: {{from_name}}
Email: {{from_email}}
Recipient: {{to_email}}

Message:
{{message}}
```

5. Save the template and copy your **Template ID** (looks like: `template_xxxxxxxxxxxx`)

### Step 4: Get Your Public Key
1. Go to **Account** settings in the EmailJS dashboard
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxxxxx`)

### Step 5: Add Credentials to .env.local
Update the `.env.local` file in your project root with:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

Replace the placeholders with your actual credentials from EmailJS.

### Step 6: Update the Recipient Email (Optional)
If you want to change the recipient email from `spec@nith.ac.in`, edit the `ContactUs1.jsx` file:

Find this line:
```jsx
to_email: 'spec@nith.ac.in', // Your recipient email
```

Replace with your desired email address.

### Step 7: Test the Form
1. Start your development server: `npm run dev`
2. Navigate to the contact form on your website
3. Fill in all fields and click "Send Message"
4. Check your email inbox for the message

## File Changes

### Modified Files:
- `src/components/ui/ContactUs1.jsx` - Updated to use EmailJS instead of simulated submission

### New Files:
- `.env.local` - Environment variables for EmailJS

## Features
✅ Client-side email sending (no backend needed)
✅ Form validation
✅ Loading state with spinner
✅ Success message after sending
✅ Error handling with user-friendly messages
✅ Automatic form clearing on success
✅ Required field validation

## Troubleshooting

### "Failed to send message" Error
- Verify your EmailJS credentials in `.env.local`
- Check that your email service is connected in the EmailJS dashboard
- Ensure your template variables match: `from_name`, `from_email`, `message`, `to_email`

### Email Not Received
- Check your email's spam/junk folder
- Verify the recipient email address in ContactUs1.jsx
- Check EmailJS dashboard activity log for failed attempts

### CORS Issues
- EmailJS handles CORS automatically for client-side requests
- If issues persist, check that your domain is added to EmailJS allowed domains (if using paid plan)

## Security Notes
- Public Key is safe to expose in `NEXT_PUBLIC_*` variables
- Service ID and Template ID are also safe to expose (no sensitive credentials)
- The form validates on the frontend before sending
- Consider adding rate limiting if using a high-traffic website

## Next Steps
1. Create your EmailJS account and complete setup
2. Update `.env.local` with your credentials
3. Test the contact form
4. Deploy to production
