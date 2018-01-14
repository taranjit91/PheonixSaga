module scenes {
    export class Level3 extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _assetManager:createjs.LoadQueue;
        private _bg:objects.Background;
        private _bg1:objects.Background;
        private _level2Label:objects.Label;
        private _backButton:objects.Button;     
            
        private _player:objects.Phoenix;
        private _inputManager: core.InputManager;
        private _inputData: core.InputData;

        // For Boss
        private _monsterBoss:objects.MonsterBoss;
        private _monsterBossHPBar:createjs.Shape;

        // For Enemy Bullet
        private _enemyBullets: objects.EnemyBullet[];
        private _enemyBulletNum: number;
        private _enemyBulletCounter: number;

        private _enemyBulletsL: objects.EnemyBullet[];
        private _enemyBulletNumL: number;
        private _enemyBulletCounterL: number;

        private _enemyBulletsR: objects.EnemyBullet[];
        private _enemyBulletNumR: number;
        private _enemyBulletCounterR: number;
        
        // For Bullet
        private _bullets: objects.Bullet[];
        private _bulletNum: number;
        private _bulletCounter: number;

        private _powerbullets: objects.PowerBullet[];
        private _powerbulletNum: number;
        private _powerbulletCounter: number;
  
        private _bulletLabel:objects.Label;
        private _powerBulletLabel:objects.Label;

        private _livesLabel: objects.Label;
        private _lives: number;
        private _logConuter: number = 0;
        private _isHit: boolean = false;
        private _hitTime: number = 50;
        private _hitCounter: number = 0;

        // PUBLIC PROPERTIES
  
        // CONSTRUCTORS
        constructor(assetManager:createjs.LoadQueue, currentScene:number) {
            super();
            this._assetManager = assetManager;
            this._currentScene = currentScene;
            this._inputManager = new core.InputManager();
            this.Start();
        }
        
        // PRIVATE METHODS
  
      // PUBLIC METHODS
      public Start():void {
        this._bg = new objects.Background(this._assetManager,"level2bg",0);
        this._bg1 = new objects.Background(this._assetManager,"level2bg",800);
        this._level2Label = new objects.Label("LEVEL 3", "40px", "gameFont", "#ffffff", 400, 20, true);
        this._backButton = new objects.Button(this._assetManager, "backButton", 400, 340, true);
        this._player = new objects.Phoenix(this._assetManager);
        this._monsterBoss = new objects.MonsterBoss(this._assetManager);

        // For Boss Bullet
        this._enemyBulletNum = 100;
        this._enemyBullets = new Array<objects.EnemyBullet>();
        this._enemyBulletCounter = 0;

        this._enemyBulletNumL = 100;
        this._enemyBulletsL = new Array<objects.EnemyBullet>();
        this._enemyBulletCounterL = 0;

        this._enemyBulletNumR = 100;
        this._enemyBulletsR = new Array<objects.EnemyBullet>();
        this._enemyBulletCounterR = 0;

        // For Bullet
        this._bulletNum = 20;
        this._bullets = new Array<objects.Bullet>();
        this._bulletCounter = 0;

        this._powerbulletNum = 5;
        this._powerbullets = new Array<objects.PowerBullet>();
        this._powerbulletCounter = 0;

        this._bulletLabel = new objects.Label("Bullet: ", "16px", "gameFont", "#ffffff", 10, config.Screen.HEIGHT - 80, false); 
        this._powerBulletLabel = new objects.Label("Power Bullet: ", "16px", "gameFont", "#ffffff", 10, config.Screen.HEIGHT - 50, false); 
    
        this._lives = 5;
        this._livesLabel = new objects.Label("Lives: " + this._lives, "30px", "gameFont", "#b42e2e", 10, 10, false);
        
        this._isHit = false;
        this._hitTime = 50;
        this._hitCounter = 0;

        this.Main();
      }
  
    // =======================================================
    // Start of Update()
    public Update():number {
        this._inputData = this._inputManager.GetInput();
        this._bg.update();
        this._bg1.update();

        this._player.Update();
        
        // For Enemy
        this._monsterBoss.Update();
    
        if( this._monsterBoss.TriggerFire() ) {
            this._enemyBulletFire();
        }

        this._player.UpdatePosition(this._inputData);

        if( this._player.TriggerFire(this._inputData) ) {
            if(this._bulletCounter<this._bulletNum)
            {
                //console.log("fire >> "+this._bulletCounter+" >> "+this._bulletNum);
            this._bulletFire(1);
            }
            else{
                //console.log("no bullets");
            }
        }

        if( this._player.TriggerPowerBullet(this._inputData) ) {
            if(this._powerbulletCounter<this._powerbulletNum)
            {
                this._bulletFire(2); //power bullet
            }
            else{
                //console.log("no bullets");
            }
        }

        // For Bullet
        this._checkCollisionsBullet(this._monsterBoss);
        this._bullets.forEach(bullet => {
            bullet.Update();
            this._checkCollisionsBullet(bullet);
        });

        // For Power Bullet
        this._checkCollisionsPowerBullet(this._monsterBoss);
        this._powerbullets.forEach(pbullet => {
            pbullet.Update();
            this._checkCollisionsPowerBullet(pbullet);
        });

        // For Enemy Bullet
        //this._checkCollisionsEnemyBullet(this._player);
        // this._logConuter++;
        // if(this._logConuter > 50 ) {
        //     this._logConuter = 0;
        //     console.log("" + this._player.x + ", " + this._player.y );
        // }

        var offsetX = this._player.width * 0.5;
        var offsetY = this._player.height * 0.5;

        // Temp Bullet Collision
        for(var j = 0; j < this._enemyBullets.length; j++) {
            var pos2 = this._enemyBullets[j].position;             
            
            if( (this._player.x - offsetX) < pos2.x && (this._player.x) > pos2.x 
                  && (this._player.y - offsetY) < pos2.y && (this._player.y) > pos2.y)
            {
                if(!this._player.isColliding){
                    //console.log("HitX: " + this._player.x + ", " + (this._player.x + offsetX) + ", " + pos2.x);
                    //console.log("HitY: " + this._player.y + ", " + (this._player.y + offsetY) + ", " + pos2.y);

                    if( this._isHit == false ) {
                        this._lives -= 1;
                        this._isHit = true;
                        this._player.Damaged();
                    }
                    this._player.isColliding = true;
                }                
            }
            else 
            {
                this._player.isColliding = false;
            }
        }

        for(var j = 0; j < this._enemyBulletsL.length; j++) {
            var pos2 = this._enemyBulletsL[j].position;             
            
            if( (this._player.x - offsetX) < pos2.x && (this._player.x) > pos2.x 
                  && (this._player.y - offsetY) < pos2.y && (this._player.y) > pos2.y)
            {
                if(!this._player.isColliding){
                    //console.log("HitX: " + this._player.x + ", " + (this._player.x + offsetX) + ", " + pos2.x);
                    //console.log("HitY: " + this._player.y + ", " + (this._player.y + offsetY) + ", " + pos2.y);

                    if( this._isHit == false ) {
                        this._lives -= 1;
                        this._isHit = true;
                        this._player.Damaged();
                    }
                    this._player.isColliding = true;
                }                
            }
            else 
            {
                this._player.isColliding = false;
            }
        }

        for(var j = 0; j < this._enemyBulletsR.length; j++) {
            var pos2 = this._enemyBulletsR[j].position;             
            
            if( (this._player.x - offsetX) < pos2.x && (this._player.x) > pos2.x 
                  && (this._player.y - offsetY) < pos2.y && (this._player.y) > pos2.y)
            {
                if(!this._player.isColliding){
                    console.log("HitX: " + this._player.x + ", " + (this._player.x + offsetX) + ", " + pos2.x);
                    console.log("HitY: " + this._player.y + ", " + (this._player.y + offsetY) + ", " + pos2.y);

                    if( this._isHit == false ) {
                        this._lives -= 1;
                        this._isHit = true;
                        this._player.Damaged();
                    }
                    this._player.isColliding = true;
                }                
            }
            else 
            {
                this._player.isColliding = false;
            }
        }

        this._livesLabel.text = "Lives: " + this._lives;

        if( this._isHit == true ) {
            this._hitCounter++;
            if(this._hitCounter > this._hitTime){
                this._hitCounter = 0;
                this._isHit = false;
            }
        }

        if(this._lives <= 0) {
            this._currentScene = config.END;
            this.removeAllChildren();                
        }

        this._enemyBullets.forEach(enemyBullet => {
            enemyBullet.Update();
        });
        this._enemyBulletsL.forEach(enemyBulletL => {
            enemyBulletL.Update();
        });
        this._enemyBulletsR.forEach(enemyBulletR => {
            enemyBulletR.Update();
        });

        this._updateBossHPBar();

        // Update Bullet Label
        this._updateBulletLabel();
        this._updatePowerBulletLabel();

        return this._currentScene;
    }
    // END of Update()
    // =======================================================

    private _bulletFire(type:number):void {
        if(type ==1)
        {
            this._bullets[this._bulletCounter].x = this._player.bulletSpawn.x;
            this._bullets[this._bulletCounter].y = this._player.bulletSpawn.y;
    
            this._bulletCounter++;       
        }
        else
        {
            this._powerbullets[this._powerbulletCounter].x = this._player.powerBulletSpawn.x;
            this._powerbullets[this._powerbulletCounter].y = this._player.powerBulletSpawn.y;
    
            this._powerbulletCounter++;
        }
      }

      private _enemyBulletFire():void {
        this._monsterBoss.SetBulletTrigger(false);
  
        // Bullet
        this._enemyBullets[this._enemyBulletCounter].x = this._monsterBoss.bulletSpawn.x;
        this._enemyBullets[this._enemyBulletCounter].y = this._monsterBoss.bulletSpawn.y;
        this._enemyBulletCounter++;

        if(this._enemyBulletCounter >= this._enemyBulletNum - 1) {
          this._enemyBulletCounter = 0;
        }

        // BulletL
        this._enemyBulletsL[this._enemyBulletCounterL].x = this._monsterBoss.bulletSpawn.x;
        this._enemyBulletsL[this._enemyBulletCounterL].y = this._monsterBoss.bulletSpawn.y;
        this._enemyBulletCounterL++;

        if(this._enemyBulletCounterL >= this._enemyBulletNumL - 1) {
          this._enemyBulletCounterL = 0;
        }

        // BulletR
        this._enemyBulletsR[this._enemyBulletCounterR].x = this._monsterBoss.bulletSpawn.x;
        this._enemyBulletsR[this._enemyBulletCounterR].y = this._monsterBoss.bulletSpawn.y;
        this._enemyBulletCounterR++;

        if(this._enemyBulletCounterR >= this._enemyBulletNumR - 1) {
          this._enemyBulletCounterR = 0;
        }
      }

      private _checkCollisionsEnemyBullet(other:objects.GameObject) {
        var pos = this._player.position;
        var offsetX = this._player.width;
        var offsetY = this._player.height;

        //console.log("Collision with " + pos);
          for(var j = 0; j < this._enemyBullets.length; j++) {
              var pos2 = this._enemyBullets[j].position;             
              
              if( pos.x < pos2.x && (pos.x + offsetX) > pos2.x 
                    && pos.y < pos2.y && (pos.y + offsetY) > pos2.y)
              {
                console.log("Hit");
                other.isColliding = true;
              }
              else 
              {
                other.isColliding = false;
              }            
          }       
      }

      private _checkCollisionsPowerBullet(other:objects.GameObject) {
        var pos = this._monsterBoss.position;
  
          for(var j = 0; j < this._powerbullets.length; j++) {
              var pos2 = this._powerbullets[j].position;
  
              if(Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) <(
                this._player.halfHeight + other.halfHeight))
                {
                  if(!other.isColliding){  
                    if(other.name == "enemyBoss"){
                      this._monsterBoss.Damaged(1);
                      this._powerbullets[j].Reset(); 
                       
                      if(this._monsterBoss.isDead() == true)
                      {
                          this._currentScene = config.WIN;
                          // this._engineSound.stop();
                          this.removeAllChildren(); 
                      }
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

    private _checkCollisionsBullet(other:objects.GameObject) {
        var pos = this._monsterBoss.position;
        
        for(var j = 0; j < this._bullets.length; j++) {
            var pos2 = this._bullets[j].position;

            if(Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) <(
            this._player.halfHeight + other.halfHeight))
            {
                //console.log("other position: " + other.position);
                if(!other.isColliding)
                {
                    //console.log("Collision with " + other.name);
                    if(other.name == "enemyBoss")
                    {                  
                        console.log("TEST1");
                        this._monsterBoss.Damaged(0);
                        this._bullets[j].Reset(); 

                        if(this._monsterBoss.isDead() == true)
                        {
                            this._currentScene = config.WIN;
                            // this._engineSound.stop();
                            this.removeAllChildren(); 
                        }                 
                    }
                    other.isColliding = true;
                }
            }
            else 
            {
            other.isColliding = false;
            }            
        }

        // // 
        // for(var j = 0; j < this._enemyBullets.length; j++) {
        //     var pos2 = this._enemyBullets[j].position;

        //     if(Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) <(
        //     this._player.halfHeight + other.halfHeight))
        //     {
        //         if(!other.isColliding)
        //         {
        //             //console.log("Collision with " + other.name);
        //             if(other.name == "phoenix_play")
        //             { 
        //                 console.log("Collision with " + other.name);
        //                 //this._enemyBullets[j].Reset(); 
        //             }
        //             other.isColliding = true;
        //         }
        //         else
        //         {
        //             other.isColliding = false;
        //         }
        //     }
        // }
    }
  
    private _createBossHPBar():void {
        this._monsterBossHPBar = new createjs.Shape();
        this._monsterBossHPBar.x = config.Screen.WIDTH - 350;
        this._monsterBossHPBar.y = config.Screen.HEIGHT - 35;
        this._monsterBossHPBar.graphics.setStrokeStyle(2);
        this._monsterBossHPBar.graphics.beginStroke('#000');
        this._monsterBossHPBar.graphics.drawRect(0, 0, 300, 20);
        this.addChild(this._monsterBossHPBar);
    }

    private _updateBossHPBar():void {
        this._monsterBossHPBar.graphics.clear();
        this._monsterBossHPBar.graphics.beginFill('#b42e2e');
        this._monsterBossHPBar.graphics.drawRect(0, 0, 300 * this._monsterBoss._life / 20, 20);
        this._monsterBossHPBar.graphics.endFill();
        this._monsterBossHPBar.graphics.setStrokeStyle(2);
        this._monsterBossHPBar.graphics.beginStroke('#000');
        this._monsterBossHPBar.graphics.drawRect(0, 0, 300, 20);
        this._monsterBossHPBar.graphics.endStroke();
    }

    private _updateBulletLabel():void {
        this._bulletLabel.text = "Bullets: " + (this._bulletNum - this._bulletCounter);
        this._ifNoBullets();
    }

    private _updatePowerBulletLabel():void {
        this._powerBulletLabel.text = "Power Bullets: " + (this._powerbulletNum - this._powerbulletCounter);
        this._ifNoBullets();
    }

    private _ifNoBullets()
    {
        if((this._bulletNum-this._bulletCounter) <= 0 && (this._powerbulletNum - this._powerbulletCounter) <=0)
        {
            this._currentScene = config.END;
            
             this.removeAllChildren();
        }
    }
    public Main():void {
  
        this.addChild(this._bg);
        this.addChild(this._bg1);
        
        this.addChild(this._level2Label);
  
        this.addChild(this._player);
        this.addChild(this._monsterBoss);

        // For Boss Bullet
        for (let count = 0; count < this._enemyBulletNum; count++) {
            this._enemyBullets[count] = new objects.EnemyBullet(this._assetManager);
            this.addChild(this._enemyBullets[count]);
        }

        for (let countL = 0; countL < this._enemyBulletNumL; countL++) {
            this._enemyBulletsL[countL] = new objects.EnemyBullet(this._assetManager);
            this._enemyBulletsL[countL].SetBulletType(1);
            this.addChild(this._enemyBulletsL[countL]);
        }

        for (let countR = 0; countR < this._enemyBulletNumR; countR++) {
            this._enemyBulletsR[countR] = new objects.EnemyBullet(this._assetManager);
            this._enemyBulletsR[countR].SetBulletType(2);
            this.addChild(this._enemyBulletsR[countR]);
        }

        // For Bullet
        for (let count = 0; count < this._bulletNum; count++) {
          this._bullets[count] = new objects.Bullet(this._assetManager,"bullet");
          this.addChild(this._bullets[count]);
        }

        for (let count = 0; count < this._powerbulletNum; count++) {
          this._powerbullets[count] = new objects.PowerBullet(this._assetManager,"powerBullet");
          this.addChild(this._powerbullets[count]);
        }
        
        this.addChild(this._bulletLabel);
        this.addChild(this._powerBulletLabel);

        this.addChild(this._livesLabel);
        
        this._createBossHPBar();
  
        this._backButton.on("click", () => {
          this._currentScene = config.PLAY;
          this.removeAllChildren();
        });
      }
    }
  }
  