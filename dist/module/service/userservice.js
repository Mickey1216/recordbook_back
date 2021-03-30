"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const noomi_1 = require("noomi");
let UserService = class UserService {
    async addUser(id, name, psw, email, phone, create_time) {
        let conn = await noomi_1.getConnection();
        await new Promise((resolve, reject) => {
            conn.query('insert into users_info(user_id,user_name,user_psw,user_email,user_phone,create_time) values(?,?,?,?,?,?)', [id, name, psw, email, phone, create_time], (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
            conn.query("create table " + id + "_record(" +
                "record_id int(10) not null primary key auto_increment, " +
                "money float not null, type varchar(6), detail text, " +
                "record_date datetime not null)", (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
                //手动关闭连接
                noomi_1.closeConnection(conn);
            });
        });
    }
    async checkUnique(email, phone) {
        let conn = await noomi_1.getConnection();
        let r = await new Promise((resolve, reject) => {
            let sql = "select user_id from users_info where" +
                " user_email = '" + email + "' or user_phone = '" + phone + "'";
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
                noomi_1.closeConnection(conn);
            });
        });
        return JSON.parse(JSON.stringify(r));
    }
    async getUser(id) {
        let conn = await noomi_1.getConnection();
        let r = await new Promise((resolve, reject) => {
            let sql = "select user_name, user_email, user_photo, user_phone from users_info " +
                "where user_id = '" + id + "'";
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
                noomi_1.closeConnection(conn);
            });
        });
        return JSON.parse(JSON.stringify(r));
    }
    async userLogin(account) {
        let conn = await noomi_1.getConnection();
        let r = await new Promise((resolve, reject) => {
            let str = "select user_id, user_psw from users_info where user_email = '" + account +
                "' or user_phone = '" + account + "'";
            conn.query(str, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
                noomi_1.closeConnection(conn);
            });
        });
        return JSON.parse(JSON.stringify(r));
    }
    async changeUsername(id, newName) {
        let conn = await noomi_1.getConnection();
        return new Promise((resolve, reject) => {
            let str = "update users_info set user_name = '" + newName + "' where user_id = '"
                + id + "'";
            conn.query(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
                noomi_1.closeConnection(conn);
            });
        });
    }
    async checkPsw(id, oldPsw) {
        let conn = await noomi_1.getConnection();
        let r = await new Promise((resolve, reject) => {
            let str = "select user_psw from users_info where user_id = '" + id + "'";
            conn.query(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
                noomi_1.closeConnection(conn);
            });
        });
        return JSON.parse(JSON.stringify(r))[0].user_psw == oldPsw;
    }
    async changePsw(id, newPsw) {
        let conn = await noomi_1.getConnection();
        return new Promise((resolve, reject) => {
            let str = "update users_info set user_psw = '" + newPsw + "' where user_id = '"
                + id + "'";
            conn.query(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
                noomi_1.closeConnection(conn);
            });
        });
    }
    async updateAvatar(id, avatar) {
        let conn = await noomi_1.getConnection();
        let r = await new Promise((resolve, reject) => {
            let str = "update users_info set user_photo = '" + avatar + "' " +
                "where user_id ='" + id + "'";
            conn.query(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
                noomi_1.closeConnection(conn);
            });
        });
        return JSON.parse(JSON.stringify(r)).affectedRows == 1;
    }
    async getAvatar(id) {
        let conn = await noomi_1.getConnection();
        return new Promise((resolve, reject) => {
            let str = "select user_photo from users_info where user_id='" + id + "'";
            conn.query(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
                noomi_1.closeConnection(conn);
            });
        });
    }
    async loadProfileInfo(id) {
        let conn = await noomi_1.getConnection();
        let r = await new Promise((resolve, reject) => {
            let str = "select create_time from users_info where user_id='" + id + "'";
            conn.query(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        let m = await new Promise((resolve, reject) => {
            let str = "select count(record_id) from " + id + "_record";
            conn.query(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        let obj = {};
        obj["createTime"] = JSON.parse(JSON.stringify(r))[0].create_time;
        obj["rowsCount"] = JSON.parse(JSON.stringify(m))[0]["count(record_id)"];
        return obj;
    }
};
UserService = __decorate([
    noomi_1.Instance('userService')
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=userservice.js.map