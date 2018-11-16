
import $ from 'jQuery';
import "./css/index.css"
import "./css/index.less"

$(function(){
    $("li:odd").css("backgroundColor", "orange")
    $("li:even").css("backgroundColor", "blue")
})