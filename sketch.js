var doreamon,doreamon_img;                 
var ground;
var doracake;
var PLAY = 1;
var END = 0;
var gameState = 1;
var miceGroup , doracakeGroup;
var score = 0;


function preload()
{     
  bg= loadImage("images/bg1.png");
  doreamon_img = loadAnimation("images/doreamon1.png","images/tenor-1.png","images/doreamon2.png","images/tenor-3.png","images/doreamon4.png","images/doreamon5.png","images/tenor-6.png","images/doreamon7.png"); 
  ground_img = loadImage("images/ground.png");
  doracake_img = loadImage("images/food.png");
  mouse_img = loadAnimation("images/mouse1.png","images/mouse2.png","images/mouse3.png","images/mouse4.png","images/mouse5.png");
  reset = loadImage("images/reset2.png");
  gameover = loadImage("images/gameover.png");
  start_img = loadImage("images/start.png");
  sound1 = loadSound("jump.mp3");
  gameover1 =  loadSound("gameover.mp3");
  theme = loadSound("bgm.mp3");
}


function setup() {
 createCanvas(displayWidth,displayHeight);
   
 background= createSprite(0,-90,displayWidth,displayHeight);
 background.velocityX=-7;
 background.addImage(bg);
  
 invisibleground = createSprite(0, displayHeight-225, 1000, 20);
 invisibleground.visible = false;

 doreamon = createSprite(120, 480, 50, 50);
 doreamon.addAnimation("doreamon", doreamon_img);
 doreamon.debug = true;
 doreamon.setCollider("rectangle" , 0,0,100,100);
 
 resetbutton = createSprite(700, 300, 50, 50);
 resetbutton.addImage(reset);
 resetbutton.scale= 0.2;

 startbutton = createSprite(700, 300, 50, 50);
 startbutton.addImage(start_img);
 startbutton.scale= 0.2;

 gameoverr = createSprite(700, 200, 50, 50);
 gameoverr.addImage(gameover);
 gameoverr.scale= 0.2;

 doracakeGroup = new Group();
 miceGroup = new Group();
}


function draw() {
  background.velocityX = -10;
  startbutton.visible=true;
  background.velocityX = -(6 + 8*score/100);
  
 if(gameState=== 1)
{
  
  resetbutton.visible=false;
  gameoverr.visible=false;
  startbutton.visible=false;
 


  if(background.x < 0)
 {
   background.x = background.width/2;
 }
  
 if(keyDown("space") ) 
 {
  doreamon.velocityY = -10; 
  sound1.play();
  
}

doreamon.velocityY = doreamon.velocityY+ 0.8;

if(doracakeGroup.isTouching(doreamon))
{
  doracakeGroup.destroyEach(0);
  score = score +5;
 

}

if(miceGroup.isTouching(doreamon))
{
     gameState = 0;
     gameover1.play();
}
spawnmouse();
doracakes();
}



if(gameState === 0)
{
  startbutton.visible=false;
  resetbutton.visible=true;
  gameoverr.visible=true;
  background.velocityX = 0;
  miceGroup.setVelocityXEach(0);
  doracakeGroup.setVelocityXEach(0);
  
  if(mousePressedOver(resetbutton))
  {
    reload();
  }
}

doreamon.collide(invisibleground);
drawSprites();
textSize(20);
fill("black");
text("SCORE : " + score , 1200,25);

}


function reload(){
 
  gameState = 1;
  doracakeGroup.destroyEach();
  miceGroup.destroyEach();
  score = 0;
}

function doracakes()
{ 
   if(frameCount %60 === 0)
   {
    doracake = createSprite(500,300,20,20);
    doracake.y = Math.round(random(300,500));
    doracake.addImage(doracake_img);
    doracake.velocityX = -3;
    doracake.scale = 0.2;
    doracake.lifetime = 300;
    doracakeGroup.add(doracake);
   }
}

function spawnmouse()
{ 
   if(frameCount%100 === 0)
   {
    mice = createSprite(800,500,20,20);
    
    mice.addAnimation("mouse image" ,mouse_img);
    mice.velocityX = -4;
    mice.scale = 0.5;
    mice.lifetime = 300;

    miceGroup.add(mice);
   }
}

