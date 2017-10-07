module scenes {
  export class Play extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;

    private _playLabel:objects.Label;
    private _backButton:objects.Button;
    private _nextButton:objects.Button;

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
      this._playLabel = new objects.Label("Game Playing", "40px", "Consolas", "#000000", 320, 240, true);
      this._backButton = new objects.Button(this._assetManager, "backButton", 100, 340, true);
      this._nextButton = new objects.Button(this._assetManager, "nextButton", 540, 340, true);
      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {

      this.addChild(this._playLabel);

      this.addChild(this._backButton);

      this.addChild(this._nextButton);

      this._backButton.on("click", () => {
        this._currentScene = config.START;
        this.removeAllChildren();
      });

      this._nextButton.on("click", () => {
        this._currentScene = config.END;
        this.removeAllChildren();
      });
    }
  }
}
