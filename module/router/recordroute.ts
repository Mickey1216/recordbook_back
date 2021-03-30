import { BaseRoute, Router, Inject, Session } from "noomi";
import { RecordService } from "../service/recordservice";
@Router({
    namespace:'/record',
    path:'/'
})
export class RecordRoute extends BaseRoute{
    @Inject('recordService')
    recordService:RecordService;

    async add_record(){
        try{
            let s = new Session("s1")
            let id = await s.get("userId")
            let r = await this.recordService.addRecord(id,this.model.money,this.model.type,this.model.detail,this.model.record_time)
            return {success:true,result:{id:r}}
        }catch(e){
            return {success:false,msg:e}
        }
    }

    async get_record(){
        try{
            let s = new Session("s1")
            let id = await s.get("userId")
            let r = await this.recordService.getRecord(id, this.model.year)
            return {success:true,data:r}
        }catch(e){
            return {success:false,msg:e}
        }
    }
}