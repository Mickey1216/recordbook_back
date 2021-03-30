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
exports.RecordRoute = void 0;
const noomi_1 = require("noomi");
const recordservice_1 = require("../service/recordservice");
let RecordRoute = class RecordRoute extends noomi_1.BaseRoute {
    async add_record() {
        try {
            let s = new noomi_1.Session("s1");
            let id = await s.get("userId");
            let r = await this.recordService.addRecord(id, this.model.money, this.model.type, this.model.detail, this.model.record_time);
            return { success: true, result: { id: r } };
        }
        catch (e) {
            return { success: false, msg: e };
        }
    }
    async get_record() {
        try {
            let s = new noomi_1.Session("s1");
            let id = await s.get("userId");
            let r = await this.recordService.getRecord(id, this.model.year);
            return { success: true, data: r };
        }
        catch (e) {
            return { success: false, msg: e };
        }
    }
};
__decorate([
    noomi_1.Inject('recordService'),
    __metadata("design:type", recordservice_1.RecordService)
], RecordRoute.prototype, "recordService", void 0);
RecordRoute = __decorate([
    noomi_1.Router({
        namespace: '/record',
        path: '/'
    })
], RecordRoute);
exports.RecordRoute = RecordRoute;
//# sourceMappingURL=recordroute.js.map