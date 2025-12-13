# EmailJS Troubleshooting Checklist

## Current Status
✅ EmailJS package installed (@emailjs/browser)
✅ Environment variables configured in .env.local
✅ ContactUs1 component updated with proper initialization
✅ Development server running on http://localhost:3000

## What You Need to Do (CRITICAL!)

### 1. Verify Your EmailJS Account Setup
- Go to https://dashboard.emailjs.com
- Check that your **Email Service** is properly connected and verified
- Check that your **Email Template** is created with the correct variables

### 2. EmailJS Template Requirements
Your template MUST have these **exact variable names** in the template editor:

```
{{from_name}}      - Sender's name
{{from_email}}     - Sender's email address
{{message}}        - The message content
{{to_email}}       - Recipient email (community.spec@gmail.com)
```

Example template structure:
```
Subject: New Contact from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Recipient: {{to_email}}

Message:
{{message}}
```

### 3. Verify Your Credentials in .env.local
The following values are already set but double-check they match your EmailJS dashboard:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=_-NPtejtXyw33vmwo
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_t5zvm5t
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_u78dwjm
```

**To find these:**
1. Public Key: Account → API Keys
2. Service ID: Email Services (when you create a service)
3. Template ID: Email Templates (when you create a template)

### 4. Test the Form
1. Navigate to http://localhost:3000
2. Scroll to the "Let's talk about everything!" section (Contact Us)
3. Fill in all fields:
   - Name
   - Email
   - Message
4. Click "Send Message"

### 5. Check Browser Console for Debugging
Open Developer Tools (F12 or Cmd+Option+I) and look for:
- "EmailJS initialized successfully" message
- Detailed error messages if sending fails
- The exact error from EmailJS

### 6. Common Issues & Solutions

**Issue: "Failed to send message: Not Found"**
- Check that your Template ID is correct
- Verify the template was saved

**Issue: "Failed to send message: Bad Request"**
- Check that template variables match exactly: `from_name`, `from_email`, `message`, `to_email`
- Verify no extra spaces in variable names

**Issue: "Failed to send message: Unauthorized"**
- Check that your Public Key is correct
- Check that your Service ID is correct

**Issue: Email not received**
- Check spam/junk folder
- Verify recipient email in the code is correct: community.spec@gmail.com
- Check EmailJS dashboard Activity log for failed attempts

### 7. Restart the Development Server
After any changes to .env.local:
```bash
npm run dev
```

## Files Modified
- `/src/components/ui/ContactUs1.jsx` - Added proper EmailJS integration with better error handling
- `/.env.local` - Contains your EmailJS credentials

## Quick Test
Try filling out the form and submitting. Check the browser console (F12) for detailed error messages that will help identify any remaining issues.
