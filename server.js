const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/send-email", (req, res) => {
  const { email, chartImage } = req.body;
  console.log("works!!!");

  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "your-email@gmail.com",
  //       pass: "your-email-password",
  //     },
  //   });

  //   const mailOptions = {
  //     from: "your-email@gmail.com",
  //     to: email,
  //     subject: "Your Chart Image",
  //     text: "Please find the attached chart image.",
  //     attachments: [
  //       {
  //         filename: "chart.png",
  //         content: chartImage.split("base64,")[1],
  //         encoding: "base64",
  //       },
  //     ],
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return res.status(500).json({ message: "Error sending email" });
  //     }
  //     res.status(200).json({ message: "Email sent successfully" });
  //   });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
