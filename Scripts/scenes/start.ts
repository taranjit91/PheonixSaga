module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;

    private _welcomeLabel:objects.Label;
    private _startButton:objects.Button;
    private _tutorialButton:objects.Button;
    private _exitButton:objects.Button;


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
      this._welcomeLabel = new objects.Label("Pheonix Saga", "40px", "Consolas", "#ffffff", 400, 100, true);
      this._startButton = new objects.Button(this._assetManager, "startButton", 400, 200, true);
      this._tutorialButton = new objects.Button(this._assetManager, "tutorialButton", 400, 300, true);
      this._exitButton = new objects.Button(this._assetManager, "exitButton", 400, 400, true);
      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {

      this.addChild(this._welcomeLabel);


      this.addChild(this._startButton);
      this.addChild(this._tutorialButton);
      this.addChild(this._exitButton);

      this._startButton.on("click", () => {
        this._currentScene = config.PLAY;
        this.removeAllChildren();
      });
    }
  }
}
