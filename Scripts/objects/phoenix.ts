module objects {
    export class Phoenix extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES  
        private _speed: number;
        private _hitTime: number;
  
        // PUBLIC PROPERTIES
        bulletSpawn:createjs.Point;
        powerBulletSpawn:createjs.Point;
  
        // CONSTRUCTORS
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "phoenix_play");
  
            this.Start();
        }
  
        // PRIVATE METHODS
        private _checkBounds() {
        //   if(this.x >= (736 - this.halfHeight)) {
        //       this.x = 736 - this.halfWidth;
        //   }
        //   if(this.x <= this.halfWidth) {
        //       this.x = this.halfWidth;
        //   }
        //   if(this.y >= (300 - this.halfHeight)) {
        //       this.y = 300 - this.halfHeight;
        //   }
        //   if(this.y <= this.halfHeight) {
        //       this.y = this.halfHeight
        //   }

            if(this.x >= (config.Screen.WIDTH  - (this.width * 0.3))) {
                this.x = config.Screen.WIDTH - (this.width * 0.3);
            }
            if(this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            if(this.y >= (config.Screen.HEIGHT - (this.height * 1.2))) {
                this.y = config.Screen.HEIGHT - (this.height * 1.2);
            }
            if(this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        }
  
        // PUBLIC METHODS
        public Start() {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.x = 150;
            this.y = 200;
  
            // SEAN Begin ---------------------------- 
            this._speed = 5;
            // SEAN End ------------------------------
            this.bulletSpawn = new createjs.Point(this.y - 10, this.x);
            this.powerBulletSpawn = new createjs.Point(this.y - 20, this.x);            
        }
  
        public Update() {
            //this.x = this.stage.mouseX;
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 10;

            this.powerBulletSpawn.x = this.x;
            this.powerBulletSpawn.y = this.y - 20;
            this._checkBounds();

            if (createjs.Ticker.getTime() - this._hitTime < 400) {
                if (createjs.Ticker.getTime() % 20 >= 10) {
                    this.alpha = 0.5;
                } else {
                    this.alpha = 1;
                }
              }
              else {
                  this.alpha = 1;
              }
        }

        public Damaged():void {
            this._hitTime = createjs.Ticker.getTime();
        } 
      
        public UpdatePosition(_inputData:core.InputData) {
            if(_inputData.up == true)
                this.y -= this._speed;
            if(_inputData.down == true)
                this.y += this._speed;
            if(_inputData.left == true)
                this.x -= this._speed;
            if(_inputData.right == true)
                this.x += this._speed;                
        }
  
        public TriggerFire(_inputData:core.InputData):boolean {
            if(_inputData.button1 == true){
                _inputData.button1 = false;
                return true;
            }
            return false;
        }

        public TriggerPowerBullet(_inputData:core.InputData):boolean {
            if(_inputData.button2 == true){
                _inputData.button2 = false;
                return true;
            }
            return false;
        }
       
    }
  }