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

//开启跨域
const cors = require('cors');
app.use(cors());
//查询数据库的数据
app.get("/",(req,res)=>{
    const select = "select * from list"

    conn.query(select,(err,data) => {
        if(err) return res.send({status:500, msg:"获取数据失败"})

        // console.log(data)
        res.send({status:200, msg:"获取数据成功", data: data})
    })
})

//添加数据到数据库
app.post("/add",(req,res)=>{
    const list = req.body;
    list.date = new Date()
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
    // console.log(id.id)
    const deletes = "delete from list where id=?"

    conn.query(deletes,id.id,(err,data) => {
        if(err) return res.send({status: 500, msg:"删除失败"})
        if(data.affectedRows !== 1) return res.send({status:400,msg:"删除失败啊",data:data})
        res.send({status:200, msg:"删除成功"})
    })

    // res.send({status: 200, msg: "返回成功"})
})


app.listen(3000,() => {
    console.log("http://127.0.0.1:3000")
})
