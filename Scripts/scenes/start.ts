module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;
    private _bg:objects.Background;

    private _welcomeLabel:objects.Label;
    private _startButton:objects.Button;
    private _levelsButton:objects.Button;
    private _tutorialButton:objects.Button;
    private _exitButton:objects.Button;
    private _instructionsButton:objects.Button;

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
      this._bg = new objects.Background(this._assetManager,"defaultbg",0);
        
      this._welcomeLabel = new objects.Label("PHOENIX SAGA", "50px", "gameFont", "#b42e2e", 400, 40, true);
      this._startButton = new objects.Button(this._assetManager, "startButton", 400, 150, true);
      this._levelsButton = new objects.Button(this._assetManager, "levels", 400, 230, true);      
      this._tutorialButton = new objects.Button(this._assetManager, "tutorialButton", 400, 310, true);
      this._exitButton = new objects.Button(this._assetManager, "exitButton", 400, 390, true);
      
      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {

      this.addChild(this._bg);
      this.addChild(this._welcomeLabel);


      this.addChild(this._startButton);
      this.addChild(this._levelsButton);
      this.addChild(this._tutorialButton);
      this.addChild(this._exitButton);

      this._startButton.on("click", () => {
        this._currentScene = config.START;
        this.removeAllChildren();
      });

      this._levelsButton.on("click", () => {
        this._currentScene = config.CHOOSELEVEL;
        this.removeAllChildren();
      });

      this._tutorialButton.on("click", () => {
        this._currentScene = config.HOWTOPLAY;
        this.removeAllChildren();
      });
    }
  }
}
