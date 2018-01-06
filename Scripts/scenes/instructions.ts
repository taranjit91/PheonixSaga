module scenes {
    export class Instructions extends objects.Scene {
      // PRIVATE INSTANCE VARIABLES
      private _assetManager:createjs.LoadQueue;
      private _bg:objects.Background;
  
      private _titleLabel:objects.Label;
      private _gameControlsTitleLabel:objects.Label;
      private _descriptionLabel:objects.Label;
      private _gameControlsDescLabel:objects.Label;
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
          
        this._titleLabel = new objects.Label("HOW TO PLAY", "40px", "gameFont", "#b42e2e", 400, 40, true);
        this._descriptionLabel = new objects.Label("\n\nThe goal is to play for Phoenix, \ncollect ashes and submit it to sun", "20px", "gameFont", "#333333", 600, 110, true);
        this._gameControlsTitleLabel = new objects.Label("GAME CONTROLS", "35px", "gameFont", "#b42e2e", 400, 200, true);
        this._gameControlsDescLabel= new objects.Label("\n\n\u2022    Use arrow keys for navigation. \n\u2022    Use space bar to shoot enemy.\n\u2022    Use Z to use power bullets.", "20px", "gameFont", "#333333", 760, 280, true);
        this.Main();
      }
  
      public Update():number {
        return this._currentScene;
      }
  
      public Main():void {
  
        this.addChild(this._bg);
        this.addChild(this._titleLabel);
        this.addChild(this._descriptionLabel);
        this.addChild(this._gameControlsTitleLabel);
        this.addChild(this._gameControlsDescLabel);
      }
    }
  }
  