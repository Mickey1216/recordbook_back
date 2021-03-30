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
exports.Hello = void 0;
const noomi_1 = require("noomi");
const helloservice_1 = require("../service/helloservice");
//路由类装饰器
let Hello = class Hello {
    //路由
    sayHello() {
        return { result: this.hService.sayHello() };
    }
};
__decorate([
    noomi_1.Inject('helloService'),
    __metadata("design:type", helloservice_1.HelloService)
], Hello.prototype, "hService", void 0);
__decorate([
    noomi_1.Route('/hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Hello.prototype, "sayHello", null);
Hello = __decorate([
    noomi_1.Router()
], Hello);
exports.Hello = Hello;
//# sourceMappingURL=hello.js.map