module scenes {
    export class ChooseLevel extends objects.Scene {
      // PRIVATE INSTANCE VARIABLES
      private _assetManager:createjs.LoadQueue;
      private _bg:objects.Background;
  
      private _welcomeLabel:objects.Label;
      private _level1Button:objects.Button;
      private _bossLevelButton:objects.Button;
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
        this._bg = new objects.Background(this._assetManager,"defaultbg");
          
        this._welcomeLabel = new objects.Label("PHOENIX SAGA", "50px", "gameFont", "#b42e2e", 400, 40, true);
        this._level1Button = new objects.Button(this._assetManager, "levels", 400, 150, true);
        this._bossLevelButton = new objects.Button(this._assetManager, "bosslevelButton", 400, 230, true);
        this._backButton = new objects.Button(this._assetManager, "exitButton", 400, 310, true);
        
        this.Main();
      }
  
      public Update():number {
        return this._currentScene;
      }
  
      public Main():void {
  
        this.addChild(this._bg);
        this.addChild(this._welcomeLabel);
  
  
        this.addChild(this._level1Button);
        this.addChild(this._bossLevelButton);
        this.addChild(this._backButton);
  
        this._level1Button.on("click", () => {
          this._currentScene = config.PLAY;
          this.removeAllChildren();
        });
  
        this._bossLevelButton.on("click", () => {
          this._currentScene = config.LEVEL3;
          this.removeAllChildren();
        });
        this._backButton.on("click", () => {
            this._currentScene = config.START;
            this.removeAllChildren();
          });
      }
    }
  }
  