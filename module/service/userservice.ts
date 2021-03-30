import {getConnection, closeConnection, Instance} from "noomi";
import {rejects} from "assert";
@Instance('userService')
export class UserService{
    async addUser(id:string,name:string,psw:string,email:string, phone:string, create_time: string){
        let conn:any = await getConnection()
        await new Promise((resolve,reject)=>{
            conn.query('insert into users_info(user_id,user_name,user_psw,user_email,user_phone,create_time) values(?,?,?,?,?,?)',
                [id,name,psw,email,phone,create_time],
                (err,results)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                });

            conn.query("create table " + id + "_record(" +
                "record_id int(10) not null primary key auto_increment, " +
                "money float not null, type varchar(6), detail text, " +
                "record_date datetime not null)", (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }

                //手动关闭连接
                closeConnection(conn);
            })
        })
    }

    async checkUnique(email: string, phone: string){
        let conn = await getConnection()
        let r = await new Promise((resolve, reject) => {
            let sql = "select user_id from users_info where" +
                " user_email = '" + email + "' or user_phone = '" + phone + "'"

            conn.query(sql, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }

                closeConnection(conn)
            })
        })

        return JSON.parse(JSON.stringify(r))
    }

    async getUser(id:string){
        let conn = await getConnection()
        let r = await new Promise((resolve, reject) => {
            let sql = "select user_name, user_email, user_photo, user_phone from users_info " +
                "where user_id = '" + id + "'"

            conn.query(sql, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }

                closeConnection(conn)
            })
        })

        return JSON.parse(JSON.stringify(r))
    }

    async userLogin(account:string){
        let conn = await getConnection()
        let r = await new Promise((resolve, reject) => {
            let str = "select user_id, user_psw from users_info where user_email = '" + account +
                "' or user_phone = '" + account + "'"

            conn.query(str, (err, res) => {
                if(err)
                    reject(err)
                else
                    resolve(res)

                closeConnection(conn)
            })
        })

        return JSON.parse(JSON.stringify(r))
    }

    async changeUsername(id: string, newName: string){
        let conn = await getConnection()
        return new Promise((resolve, reject) => {
            let str = "update users_info set user_name = '" + newName +"' where user_id = '"
                + id +"'"
            conn.query(str, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }

                closeConnection(conn)
            })
        })
    }

    async checkPsw(id: string, oldPsw: string){
        let conn = await getConnection()
        let r = await new Promise((resolve, reject) => {
            let str = "select user_psw from users_info where user_id = '" + id + "'"
            conn.query(str, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }

                closeConnection(conn)
            })
        })

        return JSON.parse(JSON.stringify(r))[0].user_psw == oldPsw
    }

    async changePsw(id: string, newPsw: string){
        let conn = await getConnection()
        return new Promise((resolve, reject) => {
            let str = "update users_info set user_psw = '" + newPsw +"' where user_id = '"
                + id +"'"
            conn.query(str, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }

                closeConnection(conn)
            })
        })
    }

    async updateAvatar(id:string, avatar: string){
        let conn = await getConnection()
        let r = await new Promise((resolve, reject) => {
            let str = "update users_info set user_photo = '" + avatar + "' " +
                "where user_id ='" + id + "'"
            conn.query(str, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }

                closeConnection(conn)
            })
        })

        return JSON.parse(JSON.stringify(r)).affectedRows == 1
    }

    async getAvatar(id:string){
        let conn = await getConnection()
        return new Promise((resolve, reject) => {
            let str = "select user_photo from users_info where user_id='" + id + "'"
            conn.query(str, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }

                closeConnection(conn)
            })
        })
    }

    async loadProfileInfo(id:string){
        let conn = await getConnection()
        let r = await new Promise((resolve, reject) => {
            let str = "select create_time from users_info where user_id='" + id + "'"
            conn.query(str, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })

        let m = await new Promise((resolve, reject) => {
            let str = "select count(record_id) from " + id + "_record"
            conn.query(str, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })

        let obj = {}
        obj["createTime"] = JSON.parse(JSON.stringify(r))[0].create_time
        obj["rowsCount"] = JSON.parse(JSON.stringify(m))[0]["count(record_id)"]

        return obj
    }
}