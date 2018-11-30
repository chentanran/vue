const fs = require("fs")

function getFileData(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path, "utf8",(err, data)=>{
            if(err) return reject(err);
            resolve(data);
        })
    })
}

const promise = getFileData("./1.txt").then(data=>{
    console.log(data)
    // 调第一个文件,成功后,继续调第二个函数
    return getFileData("./22.txt");
}).then(data=>{
    console.log(data);

    return getFileData("./3.txt");
}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})