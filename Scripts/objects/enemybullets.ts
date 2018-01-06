module objects {
    export class EnemyBullet extends objects.GameObject {
      // PRIVATE INSTANCE VARIABLES
      // PUBLIC PROPERTIES
      // CONSTRUCTORS
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager, "bullet");
  
        this.Start();
      }
      // PRIVATE METHODS
      private _reset(): void {
       // this.y = -1000;
        this.x = -500;
      }
  
      private _checkBounds(): void {
        if (this.x <= 0 + this.width) {
          this._reset();
        }
      }
  
      // PUBLIC METHODS
      public Start(): void {
        this.horizontalSpeed = -5;
        this._reset();
      }
      
      public Reset(): void {
        this._reset();
      }

      private _updatePosition(): void {
        this.x += this.horizontalSpeed;
        this.position.x = this.x;
        this.position.y = this.y;
      }
  
      public Update(): void {
        if(this.y > 0) {
          this._updatePosition();
          this._checkBounds();
        }
      }
    }
  }