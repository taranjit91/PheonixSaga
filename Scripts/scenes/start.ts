module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;

    private _welcomeLabel:objects.Label;
    private _startButton:objects.Button;

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
      this._welcomeLabel = new objects.Label("Welcome to the Game", "40px", "Consolas", "#000000", 320, 240, true);
      this._startButton = new objects.Button(this._assetManager, "startButton", 320, 340, true);
      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {

      this.addChild(this._welcomeLabel);


      this.addChild(this._startButton);

      this._startButton.on("click", () => {
        this._currentScene = config.PLAY;
        this.removeAllChildren();
      });
    }
  }
}
