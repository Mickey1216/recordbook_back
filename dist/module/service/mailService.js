"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const noomi_1 = require("noomi");
const nodemailer = require('nodemailer');
let MailService = class MailService {
    async sendMail(to, subject, html) {
        let transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            secure: true,
            auth: {
                user: '383449174@qq.com',
                pass: 'zvqruuxqiuxicajb',
            },
        });
        await transporter.sendMail({
            from: '383449174@qq.com',
            to: to,
            subject: subject,
            html: html,
        });
        return { msg: "ok" };
    }
};
MailService = __decorate([
    noomi_1.Instance('mailService')
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mailService.js.map