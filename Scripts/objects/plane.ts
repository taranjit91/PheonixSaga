module objects {
    export class Plane extends createjs.Sprite {
      // PRIVATE INSTANCE VARIABLES
      width:number;
      height:number;
      halfWidth:number;
      halfHeight:number;
  
      bulletSpawn:createjs.Point;
  
      // PUBLIC PROPERTIES
      // CONSTRUCTORS
      constructor(textureAtlas: createjs.SpriteSheet) {
        super(textureAtlas, "plane");
        this.Start();
      }
      // PRIVATE METHODS
      private _checkBounds() {
        if(this.x >= 640 - this.halfWidth) {
          this.x = 640 - this.halfWidth;
        }
        if(this.x <= this.halfWidth) {
          this.x = this.halfWidth;
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
        this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
      }
  
      public Update() {
        this.x = this.stage.mouseX;
        this.bulletSpawn.x = this.x;
        this.bulletSpawn.y = this.y -35;
        this._checkBounds();
      }
    }
  }