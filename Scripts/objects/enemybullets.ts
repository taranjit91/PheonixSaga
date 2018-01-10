module objects {
    export class EnemyBullet extends objects.GameObject {
      // PRIVATE INSTANCE VARIABLES
      private _bulletType:number;

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
        this.horizontalSpeed = 3.5;
        this._bulletType = 0;
        this._reset();
      }
      
      public Reset(): void {
        this._reset();
      }
  
      public Update(): void {
        if(this.y > 0) {
          this._updatePosition();
          this._checkBounds();
        }
      }

      public SetBulletType(bulletType: number): void {
        this._bulletType = bulletType;
      }
      
      public SetBulletSpeed(bulletSpeed: number): void {
        this.horizontalSpeed = bulletSpeed;
      }

      private _updatePosition(): void {
        this.x -= this.horizontalSpeed;

        if(this._bulletType == 1) {
          this.y -= (this.horizontalSpeed / 3);
        }
        else if(this._bulletType == 2) {
          this.y += (this.horizontalSpeed / 3);
        }

        this.position.x = this.x;
        this.position.y = this.y;
      }
    }
  }