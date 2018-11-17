//引入jquery
import $ from "jquery"
import "./css/index.css"
import "bootstrap/dist/css/bootstrap.css"

$(function(){
    $("p:odd").css("backgroundColor","pink")
    $("p:even").css("backgroundColor","hotpink")
    // console.log(1);
})
