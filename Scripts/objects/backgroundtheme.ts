module objects {
<<<<<<< HEAD
    export class Background extends createjs.Bitmap {
      // PRIVATE INSTANCE VARIABLES
      private _dx: number;
    private _offset: number;
      // PUBLIC PROPERTIES
      // CONSTRUCTORS
      constructor(assetManager: createjs.LoadQueue, name: string, offset: number, scrollSpeed: number = 3) {
        super(assetManager.getResult(name));
        this._dx = scrollSpeed
        this._offset = offset;
  
        this.start();
      }
  
      public start(): void {
            this.x = this._offset;
      }
  
      public update(): void {
          this.x -= this._dx;
          this._reset();
      }
  
      // PRIVATE METHODS
      private _reset(): void {
          if (this.x <= -790) {
              this.x = 790;
          }
      }
    }
  }

    
=======
  export class Background extends createjs.Bitmap {
    // PRIVATE INSTANCE VARIABLES
    private _dx: number;
    private _offset: number;

    // PUBLIC PROPERTIES
    // CONSTRUCTORS
    constructor(assetManager: createjs.LoadQueue, name: string, offset: number, scrollSpeed: number = 3) {
      super(assetManager.getResult(name));
      this._dx = scrollSpeed
      this._offset = offset;

      this.start();
    }

    public start(): void {
          this.x = this._offset;
    }

    public update(): void {
        this.x -= this._dx;
        this._reset();
    }

    // PRIVATE METHODS
    private _reset(): void {
        if (this.x <= -800) {
            this.x = 800;
        }
    }
  }
}
>>>>>>> 587cc2c6d94bb8003ab4ac8ea1a20534e7b3aee6
