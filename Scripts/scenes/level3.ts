module scenes {
    export class Level3 extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _assetManager:createjs.LoadQueue;
        private _bg:objects.Background;
        private _level2Label:objects.Label;
        private _backButton:objects.Button;     
            
        private _player:objects.Phoenix;
        private _inputManager: core.InputManager;
        private _inputData: core.InputData;

        // For Boss
        private _monsterBoss:objects.MonsterBoss;
        private _monsterBossHPBar:createjs.Shape;
        
        private _bullets: objects.Bullet[];
        private _bulletNum: number;
        private _bulletCounter: number;

        private _powerbullets: objects.PowerBullet[];
        private _powerbulletNum: number;
        private _powerbulletCounter: number;

  
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
        this._bg = new objects.Background(this._assetManager,"level2bg");
        this._level2Label = new objects.Label("LEVEL 3", "40px", "Consolas", "#ffffff", 400, 20, true);
        this._backButton = new objects.Button(this._assetManager, "backButton", 400, 340, true);
        this._player = new objects.Phoenix(this._assetManager);
        this._monsterBoss = new objects.MonsterBoss(this._assetManager);

        this._bulletNum = 20;
        this._bullets = new Array<objects.Bullet>();
        this._bulletCounter = 0;

        this._powerbulletNum = 5;
        this._powerbullets = new Array<objects.PowerBullet>();
        this._powerbulletCounter = 0;
        
        this.Main();
      }
  
    // =======================================================
    // Start of Update()
    public Update():number {
        this._inputData = this._inputManager.GetInput();
        this._player.Update();
        this._monsterBoss.Update();
        this._player.UpdatePosition(this._inputData);

        if( this._player.TriggerFire(this._inputData) ) {
            if(this._bulletCounter<this._bulletNum)
            {
            console.log("fire >> "+this._bulletCounter+" >> "+this._bulletNum);
            this._bulletFire(1);
            }
            else{
            console.log("no bullets");
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

        this._powerbullets.forEach(bullet => {
            bullet.Update();
        // this._checkCollisionsBullet(bullet);
        });

        this._updateBossHPBar();

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
                    //  this._score += 100;
                      //this._scoreLabel.text = "Score: " + this._score;
                      // if(this._score>=800){
                      //   this._currentScene = config.LEVEL2;
                      //  // this._engineSound.stop();
                      //   this.removeAllChildren(); 
                      // }
                      //createjs.Sound.play("thunder", 0, 0, 0, 0, 0.5);
                      this._monsterBoss.Damaged();
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
  
    private _createBossHPBar():void {
        this._monsterBossHPBar = new createjs.Shape();
        this._monsterBossHPBar.x = config.Screen.WIDTH - 350;
        this._monsterBossHPBar.y = config.Screen.HEIGHT - 25;
        this._monsterBossHPBar.graphics.setStrokeStyle(2);
        this._monsterBossHPBar.graphics.beginStroke('#000');
        this._monsterBossHPBar.graphics.drawRect(0, 0, 300, 20);
        this.addChild(this._monsterBossHPBar);
    }

    private _updateBossHPBar():void {
        this._monsterBossHPBar.graphics.clear();
        this._monsterBossHPBar.graphics.beginFill('#f00');
        this._monsterBossHPBar.graphics.drawRect(0, 0, 300 * this._monsterBoss._life / 20, 20);
        this._monsterBossHPBar.graphics.endFill();
        this._monsterBossHPBar.graphics.setStrokeStyle(2);
        this._monsterBossHPBar.graphics.beginStroke('#000');
        this._monsterBossHPBar.graphics.drawRect(0, 0, 300, 20);
        this._monsterBossHPBar.graphics.endStroke();
    }

    public Main():void {
  
        this.addChild(this._bg);
        this.addChild(this._level2Label);
  
        this.addChild(this._player);
        this.addChild(this._monsterBoss);
        for (let count = 0; count < this._bulletNum; count++) {
          this._bullets[count] = new objects.Bullet(this._assetManager,"bullet");
          this.addChild(this._bullets[count]);
        }

        for (let count = 0; count < this._powerbulletNum; count++) {
          this._powerbullets[count] = new objects.PowerBullet(this._assetManager,"powerBullet");
          this.addChild(this._powerbullets[count]);
        }
        
        this._createBossHPBar();
  
        this._backButton.on("click", () => {
          this._currentScene = config.PLAY;
          this.removeAllChildren();
        });
      }
    }
  }
  