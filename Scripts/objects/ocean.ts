module objects {
  export class Ocean extends createjs.Bitmap {
    // PRIVATE INSTANCE VARIABLES
    private _verticalSpeed:number;
    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager.getResult("ocean"));

      this.Start();
    }
    // PRIVATE METHODS
    private _reset():void {
      this.x = -200;
    }

    private _checkBounds():void {
      if(this.x >= 0) {
        this._reset();
      }
    }

    // PUBLIC METHODS
    public Start():void {
      this._verticalSpeed = 2;
      this._reset();
    }

    public Update():void {
      this.x += this._verticalSpeed;
      this._checkBounds();
    }
  }
}