module objects {
    export class MonsterBird extends objects.GameObject {
      // PRIVATE INSTANCE VARIABLES
      private _bulletTrigger: boolean;
      private _bulletTriggerCount: number;
      private _bulletTriggerPoint: number;

      // PUBLIC PROPERTIES
      bulletSpawn:createjs.Point;

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
        this.verticalSpeed = 2;
        this._reset();

        this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
        this._bulletTrigger = false;
        this._bulletTriggerCount = 0;
        this._bulletTriggerPoint = 50;
      }
  
      private _updatePosition():void {
        this.y += this.verticalSpeed;
        this.position.x =this.x;
        this.position.y = this.y;
      }
  
      public Update():void {
        this.bulletSpawn.x = this.x;
        this.bulletSpawn.y = this.y + 20;

        this._updatePosition();
        this._checkBounds();
        
        this._bulletTriggerCount++;
        
        if(this._bulletTriggerCount > this._bulletTriggerPoint) {
          console.log(this._bulletTriggerCount);
          this._bulletTrigger = true;
          this._bulletTriggerCount = 0;
        }
      }

      public SetBulletTrigger(bulletFlag: boolean) {
        this._bulletTrigger = bulletFlag;
      }

      public TriggerFire():boolean {
        return this._bulletTrigger;
      }
    }
  }