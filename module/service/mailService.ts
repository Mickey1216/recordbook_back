import { Instance } from 'noomi'
const nodemailer = require('nodemailer')

@Instance('mailService')
export class MailService {
    async sendMail(to: string, subject: string, html: string) {
        let transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            secure: true, // true for 465, false for other ports
            auth: {
                user: '383449174@qq.com', // generated ethereal user
                pass: 'zvqruuxqiuxicajb', // generated ethereal password
            },
        })

        await transporter.sendMail({
            from: '383449174@qq.com', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        })

        return {msg: "ok"}
    }
}
