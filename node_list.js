const express = require("express")
const bodyparser = require("body-parser")
const mysql = require("mysql")

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'vue'
  })

const app = express()

app.use(bodyparser.urlencoded({extended: false}))
//添加数据到数据库
app.post("/add",(req,res)=>{
    const list = req.body;
    // console.log(list);
    const insert = "insert into list set ?"

    conn.query(insert, list, (err, data)=>{
        if(err) return res.send({status:500,msg:"添加失败",err:err.message})

        res.send({status:200, msg:"添加成功"})
    })

    // res.send("成功返回")
})
//删除数据
app.get("/del/:id",(req,res) =>{
    const id = req.params;
    // console.log(id)
    const deletes = "delete from list where id=?"

    conn.query(deletes,id,(err,data) => {
        if(err) return res.send({status: 500, msg:"删除失败"})
        if(data.affectedRows !== 1) return res.send({status:400,msg:"删除失败啊"})
        res.send({status:200, msg:"删除成功"})
    })

    // res.send({status: 200, msg: "返回成功"})
})


app.listen(3000,() => {
    console.log("http://127.0.0.1:3000")
})
