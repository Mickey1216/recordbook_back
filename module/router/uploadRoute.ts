import {BaseRoute, Router, Route, } from "noomi"

@Router()
class UploadRoute extends BaseRoute{
    @Route("/upload")
    upload(){
        console.log(this.model.avatar);

        return {success: true, msg: "ok"}
    }
}
