module objects {
  export class MonsterBoss extends objects.GameObject {
    // PRIVATE INSTANCE VARIABLES
    private _bulletTrigger: boolean;
    private _bulletTriggerCount: number;
    private _bulletTriggerPoint: number;
    private _hitTime: number;

    private _dy: number;
    private _dyF: boolean = true; // distinguish +-
    private _dx: number;
    private _dxF: boolean = true; // distinguish +-

    // PUBLIC PROPERTIES
    public bulletSpawn:createjs.Point;
    public powerBulletSpawn:createjs.Point;
    public _life:number = 20;

    public _dead:boolean = false;
    
    // CONSTRUCTORS
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "enemyBoss");
      this.Start();
    }
    // PRIVATE METHODS
    private _reset():void {
      this._life = 20;

      // this.y = -this.height;
      this._dx = Math.floor((Math.random() * 5) + 6); // vertical drispeedft
      this._dy = Math.floor((Math.random() * 4) + 1); // horizontal drift

      this.x = config.Screen.WIDTH + this.width;
      this.y = config.Screen.CENTER_Y;
    }

    private _checkBounds():void {
      if (this.x >= config.Screen.WIDTH - this.width * 0.5) {
        this._dx = Math.floor((Math.random() * 3) + 2); // vertical drispeedft
        this._dxF = false;
      } else if (this.x <= config.Screen.CENTER_X + this.width * 0.5) {
          this._dx = Math.floor((Math.random() * 3) + 2); // vertical drispeedft
          this._dxF = true;
      }
      // Y-Axis bound check
      if (this.y >= config.Screen.HEIGHT - 20 - this.height * 0.5) {
          this._dy = Math.floor((Math.random() * 3) + 3);
          this._dyF = false;
      } else if (this.y <= 0 + this.height * 0.5) {
          this._dy = Math.floor((Math.random() * 3) + 3);
          this._dyF = true;
      }
      // if(this.x <= -200 + this.width) {
      //   this._reset();
      // }
    }
    
    public Reset(): void {
     // this._dead= false;
     // this._reset();
    }
    public isDead():boolean{
      console.log(" life "+this._life+" >> "+this._dead );
      if (this._life <= 0) 
        {
          this._dead = true;  
        }
        else
        {
          this._dead = false; 
        }
        console.log(" life "+this._life+" >> "+this._dead );
      return this._dead;
    }
    // PUBLIC METHODS
    public Start():void {
      this.horizontalSpeed = 2;
      this._reset();

      this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
      this.powerBulletSpawn = new createjs.Point(this.y - 35, this.x);
      this._bulletTrigger = false;
      this._bulletTriggerCount = 0;
      this._bulletTriggerPoint = 100;
    }

    private _updatePosition():void {
      if (this._dxF) {
        this.x += this._dx;
      } else {
        this.x -= this._dx;
      }
      if (this._dyF) {
        this.y += this._dy;
      } else {
        this.y -= this._dy;
      }
      

      this.position.x = this.x;
      this.position.y = this.y;
    }

    public Damaged(bulletType:number):void {
      console.log("bullet type:: "+bulletType);
      if(bulletType == 1)
      this._life= this._life-2;
      else 
      {
        this._life= this._life-1;
      }
      this._hitTime = createjs.Ticker.getTime();

      if (this._life <= 0) {
        this.Reset();
      }
    }

    public Update():void {
      this.bulletSpawn.x = this.x;
      this.bulletSpawn.y = this.y + 20;

      this.powerBulletSpawn.x = this.x;
      this.powerBulletSpawn.y = this.y + 20;

      this._updatePosition();
      this._checkBounds();
      
      this._bulletTriggerCount++;
      
      if(this._bulletTriggerCount > this._bulletTriggerPoint) {
        //console.log(this._bulletTriggerCount);
        this._bulletTrigger = true;
        this._bulletTriggerCount = 0;
      }

      // Blink when enemy is hitted
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

    public SetBulletTrigger(bulletFlag: boolean) {
      this._bulletTrigger = bulletFlag;
    }

    public TriggerFire():boolean {
      return this._bulletTrigger;
    }
  }
}