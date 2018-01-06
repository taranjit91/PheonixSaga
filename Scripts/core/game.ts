// IIFE - Immediately Invoked Function Expression
(function(){
  let stage:createjs.Stage;
  let canvas:any;
  let assetManager:createjs.LoadQueue;
  let assetManifest = [
    {id: "backButton", src:"./Assets/images/back.png"},
    {id: "nextButton", src:"./Assets/images/next.png"},
    {id: "tutorialButton", src:"./Assets/images/tutorial.png"},
    {id: "exitButton", src:"./Assets/images/exit.png"},
    {id: "startButton", src:"./Assets/images/start.png"},

    {id: "levels", src:"./Assets/images/levels.png"},
    {id: "level1Button", src:"./Assets/images/level1.png"},
    {id: "bosslevelButton", src:"./Assets/images/bosslevel.png"},

    {id: "restartButton", src:"./Assets/images/pagain.png"},
    {id: "ocean", src:"./Assets/images/background/level1bg.jpg"},
    
    {id: "bullet", src:"./Assets/images/bullet.png"},
    {id: "monsterbird", src:"./Assets/images/monsterbird.png"},
    {id: "obstacle", src:"./Assets/images/obstacle.png"},
    {id: "engine", src:"./Assets/audio/engine.ogg"},
    {id: "defaultbg", src:"./Assets/images/background/level1bg_new.png"},
    {id: "level2bg", src:"./Assets/images/background/level2bg.png"},
    {id: "phoenix_play", src:"./Assets/images/pheonix_images/spritesheet_01.png"},
    {id: "powerBullet", src:"./Assets/images/pb1.png"},
    {id: "enemy1", src:"./Assets/images/enemy1.png"},
    {id: "enemyBoss", src:"./Assets/images/Groth_golka_boss.png"},
  ];

     

  let currentScene: objects.Scene;
  let currentState:number;

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
    let newState = currentScene.Update();
    if(newState != currentState) {
      currentState = newState;
      Main();
    }
    stage.update();
  }

  function Main() {

    stage.removeAllChildren();

    switch(currentState) {
      case config.START:
      currentScene = new scenes.Start(assetManager, currentState);
      break;

      case config.PLAY:
      currentScene = new scenes.Play(assetManager, currentState);
      break;

      case config.LEVEL2:
      currentScene = new scenes.Level2(assetManager, currentState);
      break;

      case config.LEVEL3:
      currentScene = new scenes.Level3(assetManager, currentState);
      break;

      case config.HOWTOPLAY:
      currentScene = new scenes.Instructions(assetManager, currentState);
      break;

      case config.WIN:
      currentScene = new scenes.Win(assetManager, currentState);
      break;

      case config.CHOOSELEVEL:
      currentScene = new scenes.ChooseLevel(assetManager, currentState);
      break;

      case config.END:
      currentScene = new scenes.End(assetManager, currentState);
      break;
    }

    stage.addChild(currentScene);
  }

  window.onload = Init;

})();