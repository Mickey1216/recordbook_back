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
exports.UserRoute = void 0;
const noomi_1 = require("noomi");
const userservice_1 = require("../service/userservice");
let UserRoute = class UserRoute extends noomi_1.BaseRoute {
    async add_user() {
        try {
            let id = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
            await this.userService.addUser(id.toString(), this.model.name, this.model.psw, this.model.email, this.model.phone, this.model.create_time);
            let s = new noomi_1.Session("s1");
            await s.set("userId", id.toString());
            return { success: true, msg: "ok" };
        }
        catch (e) {
            return { success: false, msg: e };
        }
    }
    async check_valid() {
        try {
            let s = new noomi_1.Session("s1");
            let res = await s.get("verifyCode");
            if (res == null) {
                return { success: false, msg: "Disappear" };
            }
            else if (res == this.model.code) {
                let r = await this.userService.checkUnique(this.model.email, this.model.phone);
                if (r.length) {
                    return { success: false, msg: "Occupied" };
                }
                else {
                    return { success: true, msg: "OK" };
                }
            }
            else {
                return { success: false, msg: "Unmatched" };
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async load_user() {
        try {
            let s = new noomi_1.Session("s1");
            let userId = await s.get("userId");
            if (userId == null) {
                return { success: false, msg: "notLogin" };
            }
            else {
                let r = await this.userService.getUser(userId);
                if (r.length) {
                    return { success: true,
                        msg: { userName: r[0].user_name,
                            userEmail: r[0].user_email,
                            userPhoto: r[0].user_photo,
                            userPhone: r[0].user_phone } };
                }
                else {
                    return { success: false, msg: "invalidId" };
                }
            }
        }
        catch (e) { }
    }
    async check_login() {
        try {
            let s = new noomi_1.Session("s1");
            let u = await s.get("userId");
            if (u == null) {
                return { success: false, msg: "notLogin" };
            }
            else {
                return { success: true, msg: "ok" };
            }
        }
        catch (e) { }
    }
    async login() {
        try {
            let r = await this.userService.userLogin(this.model.account);
            if (r[0].user_psw == this.model.psw) {
                let s = new noomi_1.Session("s1");
                await s.set("userId", r[0].user_id);
                return { success: true, msg: "1" };
            }
            else
                return { success: false, msg: "-1" };
        }
        catch (e) {
            return { success: false, msg: "noAccount" };
        }
    }
    async change_username() {
        try {
            let s = new noomi_1.Session("s1");
            let id = await s.get("userId");
            let r = await this.userService.changeUsername(id, this.model.newName);
            r = JSON.parse(JSON.stringify(r)).affectedRows;
            if (r) {
                return { success: true, msg: "ok" };
            }
            else {
                return { success: false, msg: "notOk" };
            }
        }
        catch (e) { }
    }
    async change_psw() {
        try {
            let s = new noomi_1.Session("s1");
            let id = await s.get("userId");
            let checkRes = await this.userService.checkPsw(id, this.model.oldPsw);
            if (!checkRes) {
                return { success: false, msg: "opWrong" };
            }
            else {
                let r = await this.userService.changePsw(id, this.model.newPsw);
                r = JSON.parse(JSON.stringify(r)).affectedRows;
                if (r) {
                    return { success: true, msg: "ok" };
                }
                else {
                    return { success: false, msg: "notOk" };
                }
            }
        }
        catch (e) { }
    }
    async upload_avatar() {
        try {
            let s = new noomi_1.Session("s1");
            let id = await s.get("userId");
            if (await this.userService.updateAvatar(id, this.model.avatar)) {
                return { success: true, msg: "ok" };
            }
            else {
                return { success: false, msg: "notOk" };
            }
        }
        catch (e) { }
    }
    async load_avatar() {
        try {
            let s = new noomi_1.Session("s1");
            let id = await s.get("userId");
            let r = await this.userService.getAvatar(id);
            return r[0].user_photo;
        }
        catch (e) { }
    }
    async load_profile_info() {
        try {
            let s = new noomi_1.Session("s1");
            let id = await s.get("userId");
            return await this.userService.loadProfileInfo(id);
        }
        catch (e) { }
    }
};
__decorate([
    noomi_1.Inject('userService'),
    __metadata("design:type", userservice_1.UserService)
], UserRoute.prototype, "userService", void 0);
UserRoute = __decorate([
    noomi_1.Router({
        namespace: '/user',
        path: '/'
    })
], UserRoute);
exports.UserRoute = UserRoute;
//# sourceMappingURL=userroute.js.map