module objects {
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

    
