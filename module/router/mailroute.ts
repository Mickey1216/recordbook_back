import { BaseRoute, Router, Inject, Session } from "noomi";
import { MailService } from "../service/mailService";

@Router({
    namespace: '/mail',
    path: '/'
})
export class Mailroute extends BaseRoute{
    @Inject('mailService')
    mailService:MailService

    async sendMail(){
        try{
            let randCode = Math.floor(Math.random()*(9999-1000))+1000
            let s = new Session("s1")
            s.set("verifyCode", randCode)

            let infos = {
                to: this.model.to,
                subject: "邮箱验证码-Mickey露记账",
                html:  ` 
                    <span>你的验证码是： <b style="color: #FF9933">${ randCode }</b></span><br/><br/>
                    <span>30分钟内有效</span>
                `
            }

            let r = await this.mailService.sendMail(infos.to, infos.subject, infos.html)
            return r
        }catch (e) {
            return e
        }
    }
}