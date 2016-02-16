<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript" src="js/mySnake.js"></script>

<style type="text/css">

#pannel table{
    border-collapse: collapse; 
}
#pannel table td{
    border:1px solid #808080;
    width: 10px; 
    height: 10px; 
    font-size: 0; 
    line-height: 0; 
    overflow: hidden; 
}
#pannel table .snake { 
    background-color: green; 
} 
#pannel table .food { 
    background-color: blue; 
} 
</style>
<title>mySnake－js</title>
</head>
<body>
<div id="pannel" style="margin-bottom: 10px;"></div> 

<select id="selSize"> 
<option value="20">20*20</option> 
<option value="30">30*30</option> 
<option value="40">40*40</option> 
</select> 
<select id="selSpeed"> 
<option value="500">速度-慢</option> 
<option value="250" selected="selected">速度-中</option> 
<option value="100">速度-快</option> 
</select> 
<input type="button" id="btnStart" value="开始"/> 
</body>
</html>