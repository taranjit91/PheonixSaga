module scenes {
    export class Level2 extends objects.Scene {
      // PRIVATE INSTANCE VARIABLES
      private _assetManager:createjs.LoadQueue;
  
      private _level2Label:objects.Label;
      private _backButton:objects.Button;
  
      // PUBLIC PROPERTIES
  
      // CONSTRUCTORS
      constructor(assetManager:createjs.LoadQueue, currentScene:number) {
        super();
        this._assetManager = assetManager;
        this._currentScene = currentScene;
        this.Start();
      }
      // PRIVATE METHODS
  
      // PUBLIC METHODS
      public Start():void {
        this._level2Label = new objects.Label("LEVEL 2", "40px", "Consolas", "#ffffff", 400, 240, true);
        this._backButton = new objects.Button(this._assetManager, "backButton", 400, 340, true);
        this.Main();
      }
  
      public Update():number {
        return this._currentScene;
      }
  
      public Main():void {
  
        this.addChild(this._level2Label);
  
  
        this.addChild(this._backButton);
  
        this._backButton.on("click", () => {
          this._currentScene = config.PLAY;
          this.removeAllChildren();
        });
      }
    }
  }
  