import { getConnection, closeConnection, Instance } from "noomi";
@Instance('recordService')
export class RecordService{
    async addRecord(id:string,money:number,type:string,detail:string,recordDate:string):Promise<number>{
        let conn:any = await getConnection()
        let r:any = await new Promise((resolve,reject) => {
            conn.query('insert into ' + id + '_record(money,type,detail,record_date) values(?,?,?,?)',
                [money,type,detail,recordDate],
                (err,results) => {
                    if(err){
                        reject()
                    }else{
                        resolve(results)
                    }
                    closeConnection(conn)
                })
        })

        return r.insertId
    }

    async getRecord(id:string,year:string):Promise<any>{
        let conn:any = await getConnection()
        let r:any = await new Promise((resolve,reject) => {
            let sqlStr = 'select money,type,detail,record_date from ' + id + '_record where record_date like "' + year + '%" order by record_date desc'
            conn.query(sqlStr,(err,results) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(results)
                    }

                    closeConnection(conn)
                })
        })

        return JSON.parse(JSON.stringify(r))
    }

}