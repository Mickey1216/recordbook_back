"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailroute = void 0;
const noomi_1 = require("noomi");
const mailService_1 = require("../service/mailService");
let Mailroute = class Mailroute extends noomi_1.BaseRoute {
    async sendMail() {
        try {
            let randCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
            let s = new noomi_1.Session("s1");
            s.set("verifyCode", randCode);
            let infos = {
                to: this.model.to,
                subject: "邮箱验证码-Mickey露记账",
                html: ` 
                    <span>你的验证码是： <b style="color: #FF9933">${randCode}</b></span><br/><br/>
                    <span>30分钟内有效</span>
                `
            };
            let r = await this.mailService.sendMail(infos.to, infos.subject, infos.html);
            return r;
        }
        catch (e) {
            return e;
        }
    }
};
__decorate([
    noomi_1.Inject('mailService'),
    __metadata("design:type", mailService_1.MailService)
], Mailroute.prototype, "mailService", void 0);
Mailroute = __decorate([
    noomi_1.Router({
        namespace: '/mail',
        path: '/'
    })
], Mailroute);
exports.Mailroute = Mailroute;
//# sourceMappingURL=mailroute.js.map