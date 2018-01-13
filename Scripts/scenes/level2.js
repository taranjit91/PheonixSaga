var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Level2 = /** @class */ (function (_super) {
        __extends(Level2, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Level2(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this._inputManager = new core.InputManager();
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Level2.prototype.Start = function () {
            this._lives = 5;
            this._score = 0;
            this._bg = new objects.Background(this._assetManager, "level2bg", 0);
            this._level2Label = new objects.Label("LEVEL 2", "40px", "Consolas", "#ffffff", 400, 20, true);
            this._backButton = new objects.Button(this._assetManager, "backButton", 400, 340, true);
            this._player = new objects.Phoenix(this._assetManager);
            this._monsterBird = new objects.MonsterBird(this._assetManager);
            this._bulletNum = 20;
            this._bullets = new Array();
            this._bulletCounter = 0;
            this._powerbulletNum = 5;
            this._powerbullets = new Array();
            this._powerbulletCounter = 0;
            this._livesLabel = new objects.Label("Lives: " + this._lives, "30px", "gameFont", "#b42e2e", 10, 10, false);
            this._scoreLabel = new objects.Label("Score: " + this._score, "30px", "gameFont", "#b42e2e", 550, 10, false);
            this._ashesLabel = new objects.Label("Ashes: 20%", "30px", "gameFont", "#b42e2e", 250, 10, false);
            this.Main();
        };
        Level2.prototype.Update = function () {
            var _this = this;
            this._inputData = this._inputManager.GetInput();
            this._player.Update();
            this._monsterBird.Update();
            this._player.UpdatePosition(this._inputData);
            if (this._player.TriggerFire(this._inputData)) {
                if (this._bulletCounter < this._bulletNum) {
                    console.log("fire >> " + this._bulletCounter + " >> " + this._bulletNum);
                    this._bulletFire(1);
                }
                else {
                    console.log("no bullets");
                }
            }
            if (this._player.TriggerPowerBullet(this._inputData)) {
                if (this._powerbulletCounter < this._powerbulletNum) {
                    this._bulletFire(2); //power bullet
                }
                else {
                    console.log("no bullets");
                }
            }
            this._checkCollisionsBullet(this._monsterBird);
            this._bullets.forEach(function (bullet) {
                bullet.Update();
                _this._checkCollisionsBullet(bullet);
            });
            this._powerbullets.forEach(function (bullet) {
                bullet.Update();
                // this._checkCollisionsBullet(bullet);
            });
            return this._currentScene;
        };
        Level2.prototype._bulletFire = function (type) {
            if (type == 1) {
                this._bullets[this._bulletCounter].x = this._player.bulletSpawn.x;
                this._bullets[this._bulletCounter].y = this._player.bulletSpawn.y;
                this._bulletCounter++;
            }
            else {
                this._powerbullets[this._powerbulletCounter].x = this._player.powerBulletSpawn.x;
                this._powerbullets[this._powerbulletCounter].y = this._player.powerBulletSpawn.y;
                this._powerbulletCounter++;
            }
        };
        Level2.prototype._checkCollisionsBullet = function (other) {
            var pos = this._monsterBird.position;
            // var size = enemies[i].sprite.size;
            for (var j = 0; j < this._bullets.length; j++) {
                var pos2 = this._bullets[j].position;
                //var size2 = bullets[j].sprite.size;
                if (Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) < (this._player.halfHeight + other.halfHeight)) {
                    if (!other.isColliding) {
                        if (other.name == "enemy") {
                            console.log("Collision with " + other.name);
                            this._score += 100;
                            this._scoreLabel.text = "Score: " + this._score;
                            if (this._score >= 800) {
                                this._currentScene = config.LEVEL2;
                                // this._engineSound.stop();
                                this.removeAllChildren();
                            }
                            //createjs.Sound.play("thunder", 0, 0, 0, 0, 0.5);
                            this._monsterBird.Reset();
                            this._bullets[j].Reset();
                        }
                        other.isColliding = true;
                    }
                }
                else {
                    other.isColliding = false;
                }
            }
        };
        Level2.prototype.Main = function () {
            var _this = this;
            this.addChild(this._bg);
            // this.addChild(this._level2Label);
            this.addChild(this._player);
            this.addChild(this._monsterBird);
            this.addChild(this._livesLabel);
            this.addChild(this._ashesLabel);
            this.addChild(this._scoreLabel);
            // this.addChild(this._backButton);
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.Bullet(this._assetManager, "bullet");
                this.addChild(this._bullets[count]);
            }
            for (var count = 0; count < this._powerbulletNum; count++) {
                this._powerbullets[count] = new objects.PowerBullet(this._assetManager, "powerBullet");
                this.addChild(this._powerbullets[count]);
            }
            this._backButton.on("click", function () {
                _this._currentScene = config.PLAY;
                _this.removeAllChildren();
            });
        };
        return Level2;
    }(objects.Scene));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));
//# sourceMappingURL=level2.js.map