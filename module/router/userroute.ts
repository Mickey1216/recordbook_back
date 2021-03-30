import {BaseRoute, Router, Inject, Session, HttpCookie, getConnection} from "noomi";
import { UserService } from "../service/userservice";

@Router({
    namespace:'/user',
    path:'/'
})
export class UserRoute extends BaseRoute{
    @Inject('userService')
    userService:UserService;

    async add_user(){
        try{
            let id = Math.floor(Math.random()*(99999999-10000000))+10000000
            await this.userService.addUser(id.toString(),this.model.name,this.model.psw,
                this.model.email,this.model.phone, this.model.create_time)

            let s = new Session("s1")
            await s.set("userId", id.toString())

            return {success:true, msg: "ok"}
        }catch(e){
            return {success:false,msg:e};
        }
    }

    async check_valid(){
        try{
            let s = new Session("s1")
            let res = await s.get("verifyCode")

            if(res == null){
                return {success: false, msg: "Disappear"}
            }else if(res == this.model.code){
                let r = await this.userService.checkUnique(this.model.email, this.model.phone)
                if(r.length){
                    return {success: false, msg: "Occupied"}
                }else{
                    return {success: true, msg: "OK"}
                }
            }else{
                return {success: false, msg: "Unmatched"}
            }
        }catch (e) {
            console.log(e)

        }
    }

    async load_user(){
        try{
           let s = new Session("s1")
           let userId = await s.get("userId")

            if(userId == null){
                return {success: false, msg: "notLogin"}
            }else{
                let r = await this.userService.getUser(userId)
                if(r.length){
                    return {success: true,
                        msg: {userName: r[0].user_name,
                            userEmail: r[0].user_email,
                            userPhoto: r[0].user_photo,
                            userPhone: r[0].user_phone}}
                }else{
                    return {success: false, msg: "invalidId"}
                }
            }
        }catch (e) {}
    }

    async check_login(){
        try{
            let s = new Session("s1")
            let u = await s.get("userId")

            if(u == null){
                return {success: false, msg: "notLogin"}
            }else{
                return {success: true, msg: "ok"}
            }
        }catch (e) {}
    }

    async login(){
        try{
            let r = await this.userService.userLogin(this.model.account)

            if(r[0].user_psw == this.model.psw){
                let s = new Session("s1")
                await s.set("userId", r[0].user_id)

                return {success: true, msg: "1"}
            }
            else
                return {success: false, msg: "-1"}
        }catch (e) {
            return {success: false, msg: "noAccount"}
        }
    }

    async change_username(){
        try{
            let s = new Session("s1")
            let id = await s.get("userId")
            let r = await this.userService.changeUsername(id, this.model.newName)
            r = JSON.parse(JSON.stringify(r)).affectedRows

            if(r){
                return {success: true, msg: "ok"}
            }else{
                return {success: false, msg: "notOk"}
            }
        }catch (e) {}
    }

    async change_psw(){
        try{
            let s = new Session("s1")
            let id = await s.get("userId")
            let checkRes = await this.userService.checkPsw(id, this.model.oldPsw)
            if(!checkRes){
                return {success: false, msg: "opWrong"}
            }
            else{
                let r = await this.userService.changePsw(id, this.model.newPsw)
                r = JSON.parse(JSON.stringify(r)).affectedRows

                if(r){
                    return {success: true, msg: "ok"}
                }else{
                    return {success: false, msg: "notOk"}
                }
            }
        }catch (e) {}
    }

    async upload_avatar(){
        try{
            let s = new Session("s1")
            let id = await s.get("userId")
            if(await this.userService.updateAvatar(id, this.model.avatar)){
                return {success: true, msg: "ok"}
            }else{
                return {success: false, msg: "notOk"}
            }
        }catch (e) {}
    }

    async load_avatar(){
        try{
            let s = new Session("s1")
            let id = await s.get("userId")
            let r = await this.userService.getAvatar(id)

            return r[0].user_photo
        }catch (e) {}
    }

    async load_profile_info(){
        try{
            let s = new Session("s1")
            let id = await s.get("userId")

            return await this.userService.loadProfileInfo(id)
        }catch (e) {}
    }
}