// IIFE - Immediately Invoked Function Expression
(function () {
    var stage;
    var canvas;
    var assetManager;
    var assetManifest = [
        { id: "backButton", src: "./Assets/images/back.png" },
        { id: "nextButton", src: "./Assets/images/next.png" },
        { id: "tutorialButton", src: "./Assets/images/tutorial.png" },
        { id: "exitButton", src: "./Assets/images/exit.png" },
        { id: "startButton", src: "./Assets/images/start.png" },
        { id: "ocean", src: "./Assets/images/background/output-0.jpg" },
        { id: "plane", src: "./Assets/images/plane.png" },
        { id: "bullet", src: "./Assets/images/bullet.png" },
        { id: "monsterbird", src: "./Assets/images/monsterbird.png" },
        { id: "obstacle", src: "./Assets/images/obstacle.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
    ];
    var currentScene;
    var currentState;
    function Init() {
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.on("complete", Start);
        assetManager.loadManifest(assetManifest);
    }
    function Start() {
        canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        currentState = config.START;
        Main();
    }
    function Update() {
        var newState = currentScene.Update();
        if (newState != currentState) {
            currentState = newState;
            Main();
        }
        stage.update();
    }
    function Main() {
        stage.removeAllChildren();
        switch (currentState) {
            case config.START:
                currentScene = new scenes.Start(assetManager, currentState);
                break;
            case config.PLAY:
                currentScene = new scenes.Play(assetManager, currentState);
                break;
            case config.LEVEL2:
                currentScene = new scenes.Level2(assetManager, currentState);
                break;
            case config.END:
                currentScene = new scenes.End(assetManager, currentState);
                break;
        }
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map