# Marketing Mayhem Meter Deployment

## Netlify

Use these Netlify build settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

The app submits leads to `/api/marketing-mayhem-meter`. `netlify.toml` routes that path to the Netlify Function.

## Required Environment Variables

Set these in Netlify under Site configuration > Environment variables.

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`, for example `Clever Calicco <hello@clevercalic.co>`
- `INTERNAL_LEAD_EMAIL`, defaults to `hello@clevercalic.co`

## Optional MailerLite Variables

If `MAILERLITE_API_KEY` is set, the function will add or update the subscriber in MailerLite.

- `MAILERLITE_API_KEY`
- `MAILERLITE_GROUP_ID`
- `MAILERLITE_GROUP_ID_ZOOMIE_FOUNDER`
- `MAILERLITE_GROUP_ID_SUNBEAM_STRATEGIST`
- `MAILERLITE_GROUP_ID_MIRROR_CAT`
- `MAILERLITE_GROUP_ID_MIDNIGHT_CODER`
- `MAILERLITE_GROUP_ID_TREADMILL_TABBY`

Create these MailerLite custom fields before launch if you want them stored:

- `business_name`
- `website_url`
- `marketing_mayhem_result`
- `marketing_mayhem_result_name`
- `marketing_mayhem_newsletter_opt_in`
- `marketing_mayhem_answers`

MailerLite sync is non-blocking. If it fails, the user and internal emails can still send.
