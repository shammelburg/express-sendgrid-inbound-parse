## Express SendGrid Inbound Parse

A Node.js / Express.js app using SendGrid's Inbound Parse to parse email data / attachments.

### Prerequisites

[SendGrid Guide](https://sendgrid.com/docs/for-developers/parsing-email/setting-up-the-inbound-parse-webhook/)

- Log into your SendGrid account
- Go to Settings > Inbound Parse
- Click `Add Host & URL`

  - Select a verified domain
  - Add a sub-domain `parse` (This will narrow down the parsed email to this sub-domain)
  - Add a `Destination URL` (This has to be publicly available)
  - Check `Check incoming emails for spam` (This will return a `spam_score` and `spam_report`)
  - Leave `POST the raw, full MIME message` unchecked

- Log into you domain registrar
- Add an MX record
  - Host `parse`
  - TTL `10m`
  - Mail Server `mx.sendgrid.net`


### Install

1. `npm install`
2. `npm start`

You can now test the Inbound Parse by sending an email to `[anything]@parse.[domain]`.

#### Parsed data properties

```js
console.log('dkim: ', body.dkim)
console.log('to: ', body.to)
console.log('cc: ', body.cc)
console.log('from: ', body.from)
console.log('subject: ', body.subject)
console.log('sender_ip: ', body.sender_ip)
console.log('spam_report: ', body.spam_report)
console.log('envelope: ', body.envelope)
console.log('charsets: ', body.charsets)
console.log('SPF: ', body.SPF)
console.log('spam_score: ', body.spam_score)
```

#### RAW or Not RAW

These are the additional properties returned whether you have `POST the raw, full MIME message` checked or not.

```js
if (rawFullMimeMessageChecked) {
	console.log('email: ', body.email)
} else {
	console.log('headers: ', body.headers)
	console.log('html: ', body.html)
	console.log('text: ', body.text)
	console.log('attachments: ', body.attachments)
	console.log('attachment-info: ', body['attachment-info'])
	console.log('content-ids: ', body['content-ids'])
}
```
