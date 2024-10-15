import { transporter } from '../libs/nodemailer'

export const sendEmail = async (email: string, token: string) => {
  console.log(email)

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `

    <div style="text-align: center;">
      <h1>Reset Password</h1>
      <a style="text-decoration: none; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px;" href="http://localhost:3000/reset-password/${token}">Click here to reset password</a>
    </div>
    `
  }
  await transporter.sendMail(mailOptions)
}
