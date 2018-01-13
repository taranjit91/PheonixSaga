module scenes {
  export class Play extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;

    private _player:objects.Phoenix;
    private _background:objects.Background;
    private _background1:objects.Background;
    private _monsterBird:objects.MonsterBird;
    // private _obstacles:objects.Obstacle[];  
    // private _obstacleNum:number;

    private _livesLabel: objects.Label;
    private _ashesLabel: objects.Label;
    private _scoreLabel: objects.Label;
    private _bulletsCountLabel: objects.Label;

    private _bullets: objects.Bullet[];
    private _bulletNum: number;
    private _bulletCounter: number;

    private _enemyBullets: objects.EnemyBullet[];
    private _enemyBulletNum: number;
    private _enemyBulletCounter: number;
    
    private _lives: number;
    private _score: number;
    private _bulletsCount: number;

    private _engineSound: createjs.AbstractSoundInstance;

    private numberOfTicks = 0;

    // SEAN Begin ----------------------------
    private _inputManager: core.InputManager;
    private _inputData: core.InputData;
    // SEAN End ------------------------------
    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(assetManager:createjs.LoadQueue, currentScene:number) {
      super();
      this._assetManager = assetManager;
      this._currentScene = currentScene;

      // SEAN Begin ----------------------------
      this._inputManager = new core.InputManager();
      // SEAN End ------------------------------
      
      this.Start();
    }
    // PRIVATE METHODS

    // PUBLIC METHODS
    public Start():void {
      
      //this._engineSound = createjs.Sound.play("engine", 0, 0, 0, -1, 0.20, 0);
      this._player = new objects.Phoenix(this._assetManager);
      this._background = new objects.Background(this._assetManager,"level2bg",0);
      this._background1 = new objects.Background(this._assetManager,"level2bg",800);
      this._monsterBird = new objects.MonsterBird(this._assetManager);
      //this._obstacleNum = 2;
      //this._obstacles = new Array<objects.Obstacle>();
      
      this._bulletNum = 50;
      this._bullets = new Array<objects.Bullet>();
      this._bulletCounter = 0;

      this._enemyBulletNum = 100;
      this._enemyBullets = new Array<objects.EnemyBullet>();
      this._enemyBulletCounter = 0;

      
      //console.log(this._bullets);
      //console.log(this._enemyBullets);
      
      this._lives = 5;
      this._score = 0;
      
      this._livesLabel = new objects.Label("Lives: " + this._lives, "30px", "gameFont", "#b42e2e", 10, 10, false);        
      this._scoreLabel = new objects.Label("Score: " + this._score, "30px", "gameFont", "#b42e2e", 550, 10, false);
      this._ashesLabel = new objects.Label("Ashes: 0%" , "30px", "gameFont", "#b42e2e", 250, 10, false);        
      
      this.Main();
     
    }

    public Update():number {
      // SEAN Begin ----------------------------
      this._inputData = this._inputManager.GetInput();
      this._background.update();
      this._background1.update();
      this._player.Update();
      this.BirdMovementPattern();
      // SEAN Begin ----------------------------
      this._player.UpdatePosition(this._inputData);
      if( this._player.TriggerFire(this._inputData) ) {
        this._bulletFire();
      }
      // SEAN End ------------------------------
      
    //  this._background.Update();
   
      this._monsterBird.Update();
      this._checkCollision(this._monsterBird);
      if( this._monsterBird.TriggerFire() ) {
        this._enemyBulletFire();
      }

      this._checkCollisionsBullet(this._monsterBird);

      this._bullets.forEach(bullet => {
        bullet.Update();
        this._checkCollisionsBullet(bullet);
      });

      this._enemyBullets.forEach(enemyBullet => {
        enemyBullet.Update();
      //  this._checkCollisionsEnemyBullet(enemyBullet);
      });
      this._checkCollisionsEnemyBullet(this._player);
      // this._obstacles.forEach(obstacle => {
      //   obstacle.Update();
      //   this._checkCollision(obstacle);
      // });

      return this._currentScene;
    }

    
 
 BirdMovementPattern() :void{
    this.numberOfTicks++;
    this._monsterBird.y = (125 * Math.sin(this.numberOfTicks /50)) + 150;
    this._monsterBird.x += this._monsterBird.horizontalSpeed;
}


    public Main():void {
      this.addChild(this._background);
      this.addChild(this._background1);
      this.addChild(this._monsterBird);
      this.addChild(this._player);
      
      for (let count = 0; count < this._bulletNum; count++) {
        this._bullets[count] = new objects.Bullet(this._assetManager,"bullet");
        this.addChild(this._bullets[count]);
      }

      for (let counte = 0; counte < this._enemyBulletNum; counte++) {
        this._enemyBullets[counte] = new objects.EnemyBullet(this._assetManager);
        this.addChild(this._enemyBullets[counte]);
      }
      
      // for (let count = 0; count < this._obstacleNum; count++) {
      //   this._obstacles[count] = new objects.Obstacle(this._assetManager);
      //   this.addChild(this._obstacles[count]);
      // }

      this.addChild(this._livesLabel);
      this.addChild(this._ashesLabel);
      this.addChild(this._scoreLabel);
    }

    private _bulletFire():void {
      this._bullets[this._bulletCounter].x = this._player.bulletSpawn.x;
      this._bullets[this._bulletCounter].y = this._player.bulletSpawn.y;

      this._bulletCounter++;
      //console.log(this._bulletCounter);
      if(this._bulletCounter >= this._bulletNum - 1) {
        this._bulletCounter = 0;
      }
    }

    private _enemyBulletFire():void {
      this._monsterBird.SetBulletTrigger(false);

      //console.log("TEST" + this._enemyBullets);
      //console.log("X = " + this._enemyBullets[0].x + "Y = " + this._enemyBullets[0].y);

      this._enemyBullets[this._enemyBulletCounter].x = this._monsterBird.bulletSpawn.x;
      this._enemyBullets[this._enemyBulletCounter].y = this._monsterBird.bulletSpawn.y;

      this._enemyBulletCounter++;
      if(this._enemyBulletCounter >= this._enemyBulletNum - 1) {
        this._enemyBulletCounter = 0;
      }
    }

    private _checkCollisionsBullet(other:objects.GameObject) {
      var pos = this._monsterBird.position;
      // var size = enemies[i].sprite.size;

        for(var j = 0; j < this._bullets.length; j++) {
            var pos2 = this._bullets[j].position;
            //var size2 = bullets[j].sprite.size;

            if(Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) <(
              this._player.halfHeight + other.halfHeight))
              {
                console.log("first page :: "+Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) +" is to : "+this._player.halfHeight/2 + other.halfHeight/2)
         
                if(!other.isColliding){  
                  console.log("Collision with " + other.name);
                  if(other.name == "enemy1"){
                    console.log("Collision with " + other.name);
                    this._score += 100;
                    this._scoreLabel.text = "Score: " + this._score;
                    if(this._score>=400){
                      this._currentScene = config.LEVEL2;
                     // this._engineSound.stop();
                      this.removeAllChildren(); 
                    }
                 
                    //createjs.Sound.play("thunder", 0, 0, 0, 0, 0.5);
                    this._monsterBird.Reset();
                    this._bullets[j].Reset();              
                  }
                other.isColliding = true;
              }
            }
            else 
            {
              other.isColliding = false;
            }            
        }       
    }

   
          
      private _checkCollisionsEnemyBullet(other:objects.GameObject) {
      //  var pos = this._player.position;
        // var size = enemies[i].sprite.size;
        let pos:createjs.Point = new createjs.Point(this._player.x, this._player.y);
      
          for(var j = 0; j < this._enemyBullets.length; j++) {
              var pos2 = this._enemyBullets[j].position;
              //var size2 = bullets[j].sprite.size;
  
              if(Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) <(
 //               this._monsterBird.halfHeight + other.halfHeight))
              60))
                {
                  console.log("second page :: "+Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) +" is to : "+209)
           
                  if(!other.isColliding){  
                    console.log("Collision with " + other.name);
                    if(other.name == "phoenix_play"){
                      console.log("Collision with " + other.name);
                      this._lives = this._lives-1;
                      this._livesLabel.text = "Lives: " + this._lives;
                      if(this._lives<=0){
                      //  this._currentScene = config.LEVEL2;
                       // this._engineSound.stop();
                        //this.removeAllChildren(); 
                      }
                   
                      //createjs.Sound.play("thunder", 0, 0, 0, 0, 0.5);
                   //   this._monsterBird.Reset();
                     // this._bullets[j].Reset();              
                    
                  other.isColliding = true;
                    }
                }
              }
              else 
              {
                other.isColliding = false;
              }            
          }       
    }

    private _checkCollision(other:objects.GameObject) {
      let P1:createjs.Point = new createjs.Point(this._player.x, this._player.y);
      let P2:createjs.Point = other.position;

      // compare the distance between P1 and P2 is less than half the height of each object
      
      if(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)) <(
        this._player.halfHeight + other.halfHeight)) {
          if(!other.isColliding){  
          //console.log("Collision with " + other.name);
          // if(other.name == "monsterbird"){
          //   this._score += 100;
          //   this._scoreLabel.text = "Score: " + this._score;
          //   createjs.Sound.play("thunder", 0, 0, 0, 0, 0.5);
          // }
          console.log(other.name);
            if(other.name == "obstacle" || other.name == "monsterbird") 
            {
              console.log(this._lives+" >> ");
            //this._lives -= 1;
            //other.Reset();
            if(this._lives <= 0) {
              this._currentScene = config.END;
            //  this._engineSound.stop();
              this.removeAllChildren();                
            }
            this._livesLabel.text = "Lives: " + this._lives;
          }
          other.isColliding = true;
          }
      }
      else 
      {
        other.isColliding = false;
      }
    }
  }
}