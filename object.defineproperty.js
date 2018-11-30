
var obj = {
    name : "小猫",
    age: 18
}

var obj1 = Object.defineProperty(obj,"z", {
    enumerable : true,
    value: 12,
    // y : 14
})
console.log(obj1)
for(var i in obj){
    console.log(i)
}