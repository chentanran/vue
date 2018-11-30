const fs = require("fs")

   function getPromise(path){
        let promise = new Promise(function(resolve,reject){
            fs.readFile(path, "utf-8", (err,data)=>{
                if(err) return reject(err);
                resolve(data);
            })
        })

        return promise;
    }

    let p = getPromise("./1.txt")

    p.then(function(data){
        console.log(data);
    },function(err){
        console.log(err)
    })