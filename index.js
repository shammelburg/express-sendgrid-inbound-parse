const express = require('express')
const multer = require('multer')

const app = express()
const upload = multer()

app.post('/api/parse', upload.any(), async (req, res) => {

    const body = req.body
    const rawFullMimeMessageChecked = false

    console.log("dkim: ", body.dkim);
    console.log("to: ", body.to);
    console.log("cc: ", body.cc);
    console.log("from: ", body.from);
    console.log("subject: ", body.subject);
    console.log("sender_ip: ", body.sender_ip);
    console.log("spam_report: ", body.spam_report);
    console.log("envelope: ", body.envelope);
    console.log("charsets: ", body.charsets);
    console.log("SPF: ", body.SPF);
    console.log("spam_score: ", body.spam_score);

    // Logs properties 
    if (rawFullMimeMessageChecked) {
        console.log("email: ", body.email);
    } else {
        console.log("headers: ", body.headers);
        console.log("html: ", body.html);
        console.log("text: ", body.text);
        console.log("attachments: ", body.attachments);
        console.log("attachment-info: ", body['attachment-info']);
        console.log("content-ids: ", body['content-ids']);
    }

    if (req.files.length > 0) {
        // Log file data
        console.log(req.files)
    } else {
        console.log('No files...')
    }

    return res.status(200).send()
})

app.listen(3000, () => {
    console.log('Webserver running on port 3000! -> http://localhost:3000')
})
