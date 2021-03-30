import { Instance } from "noomi";
//实例装饰器
@Instance('helloService')
export class HelloService{
    sayHello(){
        return "Hello World!"
    }
}