const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/send-email", (req, res) => {
  const { email, chartImage } = req.body;
  console.log("works!!!", { email, chartImage });

  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false,
    auth: {
      user: "resend",
      pass: "re_MJpJu3k5_54yX8xMttavGAYpWSRjeds8X",
    },
  });

  const mailOptions = {
    from: "test@resend.dev",
    to: email,
    subject: "Your Chart Image",
    text: "Please find the attached chart image.",
    attachments: [
      {
        filename: "chart.png",
        content: chartImage.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending email" });
    }
    res.status(200).json({ message: "Email sent successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
