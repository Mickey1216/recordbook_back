"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordService = void 0;
const noomi_1 = require("noomi");
let RecordService = class RecordService {
    async addRecord(id, money, type, detail, recordDate) {
        let conn = await noomi_1.getConnection();
        let r = await new Promise((resolve, reject) => {
            conn.query('insert into ' + id + '_record(money,type,detail,record_date) values(?,?,?,?)', [money, type, detail, recordDate], (err, results) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(results);
                }
                noomi_1.closeConnection(conn);
            });
        });
        return r.insertId;
    }
    async getRecord(id, year) {
        let conn = await noomi_1.getConnection();
        let r = await new Promise((resolve, reject) => {
            let sqlStr = 'select money,type,detail,record_date from ' + id + '_record where record_date like "' + year + '%" order by record_date desc';
            conn.query(sqlStr, (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
                noomi_1.closeConnection(conn);
            });
        });
        return JSON.parse(JSON.stringify(r));
    }
};
RecordService = __decorate([
    noomi_1.Instance('recordService')
], RecordService);
exports.RecordService = RecordService;
//# sourceMappingURL=recordservice.js.map