'use client';
const hubspot = require('@hubspot/api-client');

// Function to validate reCAPTCHA token using `fetch`
async function validateRecaptcha(recaptchaToken) {
  const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY; // Your Google reCAPTCHA secret key
  const url = 'https://www.google.com/recaptcha/api/siteverify';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: recaptchaToken,
      }),
    });

    const data = await response.json();

    // Check if reCAPTCHA validation was successful
    if (data.success) {
      return true; // Validation passed
    } else {
      console.error('reCAPTCHA validation failed:', data);
      return false; // Validation failed
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export default async function handler(req, res) {
  const { method, body, headers } = req;

  const hubspotToken = process.env.HUBSPOT_TOKEN;

  const hubspotClient = new hubspot.Client({
    accessToken: hubspotToken,
  });

  if (method === 'POST' || method === 'OPTIONS') {
    //Setup cors
    if (
      req.headers?.origin &&
      process.env.ALLOW_ORIGIN?.indexOf(req.headers.origin.toString().toLowerCase()) >= 0
    ) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
  }

  if (method === 'POST') {
    try {
      // Validate reCAPTCHA token before proceeding
      const recaptchaValid = await validateRecaptcha(body?.recaptchaToken);
      if (!recaptchaValid) {
        return res
          .status(400)
          .json({ error: 'reCAPTCHA validation failed please wait', success: false, errorCode: 1 });
      }

      // Check if contact already exists by email
      const existingEmail = await hubspotClient.crm.contacts.basicApi.getById(
        body?.properties?.email,
        undefined,
        undefined,
        undefined,
        false,
        'email'
      );

      if (existingEmail) {
        const existingContactId = existingEmail?.id;
        const contact = await hubspotClient.crm.contacts.basicApi.getById(existingContactId, [
          'form_source',
        ]);
        const formSource = contact?.properties?.form_source;
        const doesUserExistsForNewsLetter = formSource?.includes(body?.properties?.form_source);
        if (doesUserExistsForNewsLetter) {
          return res.status(400).json({ success: false, errorCode: 2 });
        }
        body.properties.form_source = `${body?.properties?.form_source},${formSource}`;

        const response = await hubspotClient.crm.contacts.basicApi.update(existingContactId, body);
        const isSuccess = !!response?.properties;

        return res.status(200).json({ success: isSuccess });
      }
    } catch (error) {
      if (error && error.code === 404) {
        const response = await hubspotClient.crm.contacts.basicApi.create(body);
        const isSuccess = !!response?.properties;

        return res.status(200).json({ success: isSuccess });
      } else {
        console.error('Error fetching contacts from HubSpot:', error);
        return res.status(500).json({ error: 'Internal server error', success: false });
      }
    }
  } else if (method === 'OPTIONS') {
    res.status(204).send();
  } else {
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
// Middleware to parse JSON request body
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
