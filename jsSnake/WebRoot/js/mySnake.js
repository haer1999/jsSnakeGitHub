var Common = new function () { 
this.width = 20; /*水平方向方格数*/ 
this.height = 20; /*垂直方向方格数*/ 
this.speed = 250; /*速度 值越小越快*/ 
this.timer = null; 
}; 

var Direction = new function () { 
	this.up = 38; 
	this.right = 39; 
	this.down = 40; 
	this.left = 37; 
}; 

var presentDir;
var nextDir;
var isDead;

function init(pid){
	isDead = false;
	presentDir = 39;
	nextDir =39;
	var html = [];
	html.push("<table>");
	for(var y=0; y<Common.height; y++){
		html.push("<tr>");
		for(var x=0; x<Common.width; x++){
			html.push('<td id="box_'+ x + '_' + y + '">' + x + y + '</td>');
		}
		html.push("</tr>");
	}
	html.push("</table>");
	document.getElementById(pid).innerHTML=html.join("");
	document.getElementById("btnStart").disabled = false;
	document.getElementById("selSpeed").disabled = false; 
	document.getElementById("selSize").disabled = false; 
};

window.onload = function(){
	init("pannel");
	/*调速度按钮*/ 
	document.getElementById("selSpeed").onchange = function () { 
		Common.speed = this.value; 
	} ;
	/*调大小按钮*/ 
	document.getElementById("selSize").onchange = function () { 
		Common.width = this.value; 
		Common.height = this.value; 
		init("pannel"); 
	} ;
	document.getElementById("btnStart").onclick = function(){
		this.disabled = true; 
		document.getElementById("selSpeed").disabled = true; 
		document.getElementById("selSize").disabled = true; 
		Start();
	};
};

function SnakeNode(x, y){
	this.x = 0;
	this.y = 0;
	if(arguments.length>=1) this.x = x;
	if(arguments.length>=2) this.y = y;
}

function Snake(){
	this.array = new Array();
	this.array.push(new SnakeNode(5,8));
}

function DrawSnake(snake){
	document.getElementById("box_" + snake.array[0].x + "_" +snake.array[0].y).className = "snake";
}

function Start(){
	var snake = new Snake();
	var food = new Food(snake);
	DrawFood(food);
	DrawSnake(snake);
	KeyListener();
	Common.timer = setInterval(function(){
		Move(snake, food);
	}, Common.speed);
}

function Move(snake, food){
	var head;
	var oldHead = snake.array[0];
	switch(presentDir){
	case Direction.up:
		head = new SnakeNode(oldHead.x, oldHead.y-1); break;
	case Direction.down:
		head = new SnakeNode(oldHead.x, oldHead.y+1); break;
	case Direction.left:
		head = new SnakeNode(oldHead.x-1, oldHead.y); break;
	case Direction.right:
		head = new SnakeNode(oldHead.x+1, oldHead.y); break;
	default:
		head = new SnakeNode(0,0);
	}
	snake.array.splice(0,0,head);
	BorderCollision(head);
	BodyCollision(head, snake);
	if(isDead==true){
		gameOver();
	}
	DrawSnake(snake);
	var len = snake.array.length;
	if(head.x==food.x && head.y == food.y){
		f = new Food(snake);
		food.x = f.x;
		food.y = f.y;
		DrawFood(food);
	}else{
		document.getElementById("box_" + snake.array[len-1].x + "_" + snake.array[len-1].y).className = "";
		snake.array.pop();
	}
}

function SetDirection(ev){
	var evt = window.event || ev; 
	nextDir = evt.keyCode;
	switch(nextDir){
	case Direction.up:
		if(presentDir != Direction.down){ presentDir = nextDir;} break;
	case Direction.down:
		if(presentDir != Direction.up){ presentDir = nextDir;} break;
	case Direction.left:
		if(presentDir != Direction.right){ presentDir = nextDir;} break;
	case Direction.right:
		if(presentDir != Direction.left){ presentDir = nextDir;} break;
	}
}

function KeyListener(){
	try { 
    	document.attachEvent("onkeydown", SetDirection); 
    } catch (e) { 
    	document.addEventListener("keydown", SetDirection, false); 
    } 
}

function Food(snake){
	var i;
	this.x = Math.floor(Math.random()*Common.width);
	this.y = Math.floor(Math.random()*Common.height);
	for( i=0; i<snake.array.length; i++){
		if(this.x == snake.array[i].x && this.y==snake.array[i].y){
			this.x = Math.floor(Math.random()*Common.width);
			this.y = Math.floor(Math.random()*Common.height);
			i = 0;
		}
	}
}

function DrawFood(food){
	document.getElementById("box_" + food.x + "_" + food.y).className = "food";
}

function BorderCollision(head){
	if(head.x<0||head.x>=Common.width||head.y<0||head.y>=Common.height){
		isDead = true;
	}
}

function BodyCollision(head, snake){
	for(var i = 2; i<snake.array.length; i++){
		if(head.x==snake.array[i].x && head.y==snake.array[i].y){
			isDead = true;
			break;
		}
	}
}

function gameOver(){
	clearInterval(Common.timer);
	alert("游戏结束");
	init("pannel");
}
