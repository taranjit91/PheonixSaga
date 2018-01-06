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
        
        // For Bullet
        private _bullets: objects.Bullet[];
        private _bulletNum: number;
        private _bulletCounter: number;

        private _powerbullets: objects.PowerBullet[];
        private _powerbulletNum: number;
        private _powerbulletCounter: number;
  
        private _bulletLabel:objects.Label;
        private _powerBulletLabel:objects.Label;

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

        this._bulletNum = 20;
        this._bullets = new Array<objects.Bullet>();
        this._bulletCounter = 0;

        this._powerbulletNum = 5;
        this._powerbullets = new Array<objects.PowerBullet>();
        this._powerbulletCounter = 0;

        this._bulletLabel = new objects.Label("Bullet: ", "16px", "gameFont", "#ffffff", 10, config.Screen.HEIGHT - 80, false); 
        this._powerBulletLabel = new objects.Label("Power Bullet: ", "16px", "gameFont", "#ffffff", 10, config.Screen.HEIGHT - 50, false); 
        
        this.Main();
      }
  
    // =======================================================
    // Start of Update()
    public Update():number {
        this._inputData = this._inputManager.GetInput();
        this._bg.update();
        this._bg1.update();

        this._player.Update();
        this._monsterBoss.Update();
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
                this._bulletFire(2);//power bullet
            }
            else{
                //console.log("no bullets");
            }
        }

        this._checkCollisionsBullet(this._monsterBoss);
        this._bullets.forEach(bullet => {
            bullet.Update();
            this._checkCollisionsBullet(bullet);
        });
        this._checkCollisionsPowerBullet(this._monsterBoss);
        this._powerbullets.forEach(pbullet => {
            pbullet.Update();
         this._checkCollisionsPowerBullet(pbullet);
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


      private _checkCollisionsPowerBullet(other:objects.GameObject) {
        var pos = this._monsterBoss.position;
        // var size = enemies[i].sprite.size;
  
          for(var j = 0; j < this._powerbullets.length; j++) {
              var pos2 = this._powerbullets[j].position;
              //var size2 = bullets[j].sprite.size;
  
              if(Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) <(
                this._player.halfHeight + other.halfHeight))
                {
                  if(!other.isColliding){  
                      console.log(">>> %% "+this.name+" ** "+other.name);
                    if(other.name == "enemyBoss"){
                      console.log("Collision with " + other.name);
                      this._monsterBoss.Damaged(1);
                      this._powerbullets[j].Reset(); 
                      console.log("^^^^^^^^ "+this._monsterBoss.isDead());
                       
                      if(this._monsterBoss.isDead()== true)
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
        // var size = enemies[i].sprite.size;
  
          for(var j = 0; j < this._bullets.length; j++) {
              var pos2 = this._bullets[j].position;
              //var size2 = bullets[j].sprite.size;
  
              if(Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) <(
                this._player.halfHeight + other.halfHeight))
                {
                  if(!other.isColliding){  
                    if(other.name == "enemyBoss"){
                      console.log("Collision with " + other.name);
                  
                      this._monsterBoss.Damaged(0);
                      this._bullets[j].Reset();  
                      console.log("^^^^^^^^ "+this._monsterBoss.isDead());
                      if(this._monsterBoss.isDead()== true)
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
        
        this._createBossHPBar();
  
        this._backButton.on("click", () => {
          this._currentScene = config.PLAY;
          this.removeAllChildren();
        });
      }
    }
  }
  