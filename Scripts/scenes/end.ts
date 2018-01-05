module scenes {
  export class End extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;

    private _gameOverLabel:objects.Label;
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
      this._gameOverLabel = new objects.Label("Game Over", "40px", "Consolas", "#ffffff", 400, 240, true);
      this._backButton = new objects.Button(this._assetManager, "backButton", 400, 340, true);
      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {

      this.addChild(this._gameOverLabel);


      this.addChild(this._backButton);

      this._backButton.on("click", () => {
        this._currentScene = config.PLAY;
        this.removeAllChildren();
      });
    }
  }
}
