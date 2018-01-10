module objects {
  export class Plane extends objects.GameObject {
      // PRIVATE INSTANCE VARIABLES  
      private _speed: number;

      // PUBLIC PROPERTIES
      bulletSpawn:createjs.Point;

      // CONSTRUCTORS
      constructor(assetManager:createjs.LoadQueue) {
          super(assetManager, "plane");

          this.Start();
      }

      // PRIVATE METHODS
      private _checkBounds() {
        if(this.x >= (800 - (this.width * 0.3))) {
            this.x = 800 - (this.width * 0.3);
        }
        if(this.x <= this.halfWidth) {
            this.x = this.halfWidth;
        }
        if(this.y >= (600 -(this.height * 0.3))) {
            this.y = 600 - (this.height * 0.3);
        }
        if(this.y <= (this.height * 0.3)) {
            this.y = (this.height * 0.3);
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
          this.x = 320;
          this.y = 430;

          // SEAN Begin ---------------------------- 
          this._speed = 5;
          // SEAN End ------------------------------
          this.bulletSpawn = new createjs.Point(this.y - 35, this.x);            
      }

      public Update() {
          //this.x = this.stage.mouseX;
          this.bulletSpawn.x = this.x;
          this.bulletSpawn.y = this.y - 35;
          this._checkBounds();
      }

      // SEAN Begin ----------------------------
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
      // SEAN End  ----------------------------
  }
}