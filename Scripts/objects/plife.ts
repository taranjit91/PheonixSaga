module objects {
    export class PLife extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES
  
        // PUBLIC PROPERTIES
    
        // CONSTRUCTORS
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "plife");
            this.Start();
        }
        
        // PRIVATE METHODS        

        // PUBLIC METHODS
        public Start():void
        {

        }

        public Reset():void
        {            
            this.x = 1000;
            this.y = 1000;
        }

        public Update():void
        {
           
        }

        public SetPosition(_x:number, _y:number): void
        {
            this.x = _x;
            this.y = _y;
        }        
    }
}