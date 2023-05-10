let g = 0.5;


function reload(){
    location.reload();
}

function startGame() {
    let a1 = document.getElementById("mr").value;
    let ma = parseFloat(a1);
    let b1 = document.getElementById("mb").value; 
    let mb = parseFloat(b1);
    let c1 = document.getElementById("vrx").value; 
    let va4 = parseFloat(c1);
    let va1 = va4/0.2;
    let va = ((ma-mb)*va1)/(ma+mb);
    let vb = (2*ma*va1)/(ma+mb);
    myGameArea.start();
    myPiece = new component (0,290, 10, 0, 2*Math.PI, "red", ma, va1,va);
    myObstacle = new component (300,290, 10, 0, 2*Math.PI, "blue", mb, 0,vb);
    platform = new component (0, 300, 300, 10,0, "black", 0, 0,0);
    myGoal = new component (500, 500, 100, 10,0, "gold", 0, 0,0);
    quad();
}

const img = document.createElement("img");
img.src="https://media.istockphoto.com/id/1060000540/fr/vectoriel/sans-couture-papier-millim%C3%A9tr%C3%A9.jpg?s=612x612&w=0&k=20&c=iQFTbfglCrqxj8Y9O2ua8iaCAVrhfJUTYjIVQ0qDXSU="

function quad() {
    let adb = myGameArea.context;
    adb.drawImage(img,0,0,1000,1000);
  }
  // chaque carre est de 25 pixel par 25 pixel = 10cmx10cm
  // les vitesses du programme sont en pixel/20ms. donc 1/2,5cm / 1/50s, donc 20cm/s, donc 0,2m/s
  // il faut donc diviser les vitesses entrees par le joueur par 0,2 afin d'avoir les bonnes valeurs

let myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, 900, 900);
        quad();
    },
    stop : function() {
        clearInterval(this.interval);
    }
}


function component (x,y,u,v,w, color,m,s,vaf){
    let d1 = document.getElementById("frt").value; 
    let frt = parseFloat(d1);
	this.x = x;
    this.y = y;
    this.u = u;
	this.v = v;
    this.w = w;
    this.m = m;
    this.poid = this.m*g
    this.force = this.poid*frt;
    this.acc = this.force/this.m;
    this.vaf = vaf
    this.speedY = 0;
    this.speedX = s;
    if (w>0){
        this.update = function(){
            ctx = myGameArea.context;
	        ctx.beginPath();
	        ctx.arc(this.x,this.y,this.u,this.v,this.w);
	        ctx.stroke();
        }
        this.right = this.x+this.u;
        this.left = this.x-this.u;
        this.top = this.y-this.u;
        this.bottom = this.y+this.u;
    }
    else {
        this.update = function(){
            ctx = myGameArea.context;
	        ctx.fillStyle = color;
	        ctx.fillRect(this.x,this.y,this.u,this.v);
        }
        this.right= this.x + this.u; 
        this.left=this.x;
        this.top=this.y;
        this.bottom=this.y+this.v
    }
}


function mypieceSpeed(){
    if (myPiece.x > platform.right) {
        myPiece.speedY += g;
    }
    if ((myPiece.x+10) >= myObstacle.left) {
        myPiece.speedX =  myPiece.vaf; 
    }
    
} 

function myPieceAcc(){
    if (myPiece.speedX>0){
        myPiece.speedX -= myPiece.acc;
    }
    else if (myPiece.speedX<0){
        myPiece.speedX += myPiece.acc;
    }
    else {
        myPiece.speedX = myPiece.speedX;
    }
}
function myobstacleSpeed(){
    if (myObstacle.x > platform.right) {
        myObstacle.speedY += g;
    }
    if ((myPiece.x+10) >= myObstacle.left){
        myObstacle.speedX = myObstacle.vaf;
    }
}
function GameResult(){
    if ((myObstacle.x+10)<myGoal.x || (myObstacle.x-10)>(myGoal.x+100)) {
        alert("niveau manqué, meilleur succès la prochaine fois!")
    }
    else {
        alert("niveau réussi!")
    }
}


function updateGameArea(){
    if (((myObstacle.y+10) > myGoal.y)){
        myGameArea.stop();
        GameResult();
    }
    else{
    myobstacleSpeed();
    mypieceSpeed();
    myPieceAcc();
    myGameArea.clear();
    myPiece.x += myPiece.speedX;
    myPiece.y += myPiece.speedY;
    myObstacle.x += myObstacle.speedX;
    myObstacle.y += myObstacle.speedY;
    myPiece.update();
    myObstacle.update();
    myGoal.update();
    platform.update();
    }
}