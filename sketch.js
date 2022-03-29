var zombie;
var family,man;
var come;
var madmana;
var madman;
var det;
var music;
var game;
var gameState =1;
var life = 3;
var lit;
var treasureCollection = 0;
var coins,coin;
var collectedCoins = 0;

function preload() {
 zombian = loadImage("zombiesgroup.png");
 man = loadImage("familyimage.png");
 come = loadImage("hauntedhouse.png");
 madmana = loadImage("zombiesgroup2.png");
 detman = loadImage("zombiesgroup3.png");
 music = loadSound("bg.mp3");
 games = loadImage("gameover.png");
 lit = loadImage("th.png");
 coina = loadImage("gold.png");
}



function setup() {
 createCanvas(1300,600)
 music.play();

 family = createSprite(600,300,20,50);
 family.addImage(man);
 family.scale = 0.5;
 
 
 zombies = new Group();
 madmans = new Group();
 dets = new Group();
 coins = new Group();
 lit = new Group();


}

 


function draw() {
background(come);


if (gameState == 1) {
  background(come);
  family.x = World.mouseX;
  family.y = World.mouseY;
 
  edges = createEdgeSprites();
  family.collide(edges);

  
  if (coins.isTouching(family)) {
    coins.destroyEach();
    treasureCollection=treasureCollection+10;
    if (treasureCollection == 20) {
      gameState=1;      
      text("GOOD GAME WELL DONE",600,450);
    }
    
}

  //code to reset the background
  if (background.x > 400) {
    background.x = height / 2;
    }

  //createdetsImage();
  //createmadmansImage()
  //createzombiesImage();
  createcoinsImage();
  if (frameCount%random([50,60,80]) == 0)
{
  createObjects(Math.round(random(50,width - 50)),-50,0.80,random([-5,13,4,20,-7,-9]),random([10,19,11,16]),zombies,zombian);
  createObjects(windowWidth + 50,Math.round(random(-50,50)),0.80,random([-5,-20,-7,-9]),random([5,9,11,15]),madmans,madmana);
  createObjects(Math.round(random(30,width - 60)),20,0.80,random([7,3,-7,9]),random([4,8,6,5]),dets,detman);
}


  setTimeout(()=>{
   if (collectedCoins<1000){
     gameState = 2
   }
  },180000);

  if (zombies.isTouching(family)) {
    for (var i = 0; i < zombies.length; i++) {
      if (zombies[i].isTouching(family)) {
        zombies.destroyEach();
        life -=1
        //gameState = 2;
      }
    }
  }

  if (madmans.isTouching(family)) {
    for (var i = 0; i < madmans.length; i++) {
      if (madmans[i].isTouching(family)) {
        madmans.destroyEach();
        life -=1
       // gameState = 2;
       
      }
    }
  }

  if (dets.isTouching(family)) {
    for (var i = 0; i < dets.length; i++) {
      if (dets[i].isTouching(family))
       {console.log(i)
        dets.destroyEach();
        life -=1
        //gameState = 2;
      }
    }
  }

  if (family.isTouching(coins)) {
    for (var i = 0; i < family.length; i++) {
      if (family[i].isTouching(coins))
       {console.log(i)
        coins.destroy();
        treasureCollection +=100
        gameState = 2;
      }
    }
  }

  if (life<0) {
    gameState = 2;
  }

}

  
  if (gameState == 2) {

    game = createSprite(width/2, height/2);
    game.addImage(games);
    game.scale = 1.5;
     
    game.visible = true;

    family.destroy()

    zombies.destroyEach();  
    zombies.setVelocityYEach(0);
 
    madmans.destroyEach();  
    madmans.setVelocityYEach(0);

    dets.destroyEach();  
    dets.setVelocityYEach(0);

  }



drawSprites();
textSize(20);
fill(255);
text("your money:" + treasureCollection, 150, 30);
text("your life:" + life,170,50);
}


function createzombiesImage() {
  if (World.frameCount % 100 == 0) {
    var zombie = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    zombie.addImage(zombian);
    zombie.scale = 0.20;
    zombie.velocityY = (9+treasureCollection/50);
    zombie.lifetime = windowHeight;
    zombies.add(zombie);
  }
}
function createdetsImage() {
  if (World.frameCount % 100 == 0) {
    var det = createSprite(Math.round(50, 50, 10, random(10, width - 10)));
    det.addImage(detman);
    det.scale = 0.20;
    det.velocityX = (9+treasureCollection/50);
    det.velocityY = 4;
    det.lifetime = windowHeight;
    dets.add(det);
  }

}
function createmadmansImage() {
  if (frameCount % 100 == 0) {  
    var madman = createSprite(Math.round(900, 50, random(10, width - 10),10));
    madman.addImage(madmana);
    madman.scale = 0.20;
    madman.velocityX = (-9+treasureCollection/50);
    madman.velocityY = 4;
    madman.lifetime = windowHeight;
    madmans.add(madman);
  }
}

function createObjects(x,y,scale,vx,vy,groupName,imageName){
  var sprite = createSprite(x,y);
  sprite.addImage(imageName);
  sprite.scale = scale;
  sprite.velocityX = vx;
  sprite.velocityY = vy;
  sprite.lifetime = windowHeight;
  groupName.add(sprite);
}



function createcoinsImage() {
  if (World.frameCount % 100 == 0) {
    var coin = createSprite(Math.round(random(50, width - 50)),Math.round(random(50,height-50)), 10, 10);
    coin.addImage(coina);
    coin.scale = 0.07;
    coin.lifetime = windowHeight;
    coins.add(coin);
  }
}