import { Router, Route, Inject} from "noomi";
import { HelloService } from "../service/helloservice";

//路由类装饰器
@Router()
export class Hello{
    //注入
    @Inject('helloService')
    hService:HelloService;
    //路由
    @Route('/hello')
    sayHello(){
        return {result:this.hService.sayHello()};
    }
}