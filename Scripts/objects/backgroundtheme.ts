module objects {
    export class Background extends createjs.Bitmap {
      // PRIVATE INSTANCE VARIABLES
      
      // PUBLIC PROPERTIES
      // CONSTRUCTORS
      constructor(assetManager: createjs.LoadQueue,name: string) {
        super(assetManager.getResult(name));
       
      }
      

    }
  }