module objects {
    export class MonsterBird extends objects.GameObject {
      // PRIVATE INSTANCE VARIABLES
      // PUBLIC PROPERTIES
      // CONSTRUCTORS
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager, "monsterbird");
  
        this.Start();
      }
      // PRIVATE METHODS
      private _reset():void {
        this.y = -this.height;
        this.x = (Math.random() * (800-this.width))+this.halfWidth;
      }
  
      private _checkBounds():void {
        if(this.y >= 600 + this.height) {
          this._reset();
        }
      }
      
      public Reset(): void {
        this._reset();
      }
      // PUBLIC METHODS
      public Start():void {
        this.verticalSpeed = 5;
        this._reset();
      }
  
      private _updatePosition():void {
        this.y += this.verticalSpeed;
        this.position.x =this.x;
        this.position.y = this.y;
      }
  
      public Update():void {
        this._updatePosition();
        this._checkBounds();
      }
    }
  }