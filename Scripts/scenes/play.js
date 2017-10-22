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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // SEAN End ------------------------------
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Play(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            // SEAN Begin ----------------------------
            _this._inputManager = new core.InputManager();
            // SEAN End ------------------------------
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this._engineSound = createjs.Sound.play("engine", 0, 0, 0, -1, 0.20, 0);
            this._plane = new objects.Plane(this._assetManager);
            this._ocean = new objects.Ocean(this._assetManager);
            this._monsterBird = new objects.MonsterBird(this._assetManager);
            this._obstacleNum = 2;
            this._obstacles = new Array();
            this._bulletNum = 50;
            this._bullets = new Array();
            this._bulletCounter = 0;
            this._lives = 5;
            this._score = 0;
            this._livesLabel = new objects.Label("Lives: " + this._lives, "30px", "Consolas", "#FFFF00", 10, 10, false);
            this._scoreLabel = new objects.Label("Score: " + this._score, "30px", "Consolas", "#FFFF00", 350, 10, false);
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            // SEAN Begin ----------------------------
            this._inputData = this._inputManager.GetInput();
            // SEAN End ------------------------------
            this._plane.Update();
            // SEAN Begin ----------------------------
            this._plane.UpdatePosition(this._inputData);
            if (this._plane.TriggerFire(this._inputData)) {
                this._bulletFire();
            }
            this._bullets.forEach(function (bullet) {
                bullet.Update();
            });
            // SEAN End ------------------------------
            this._ocean.Update();
            this._monsterBird.Update();
            this._checkCollisionsBullet(this._monsterBird);
            this._obstacles.forEach(function (obstacle) {
                obstacle.Update();
                _this._checkCollision(obstacle);
            });
            return this._currentScene;
        };
        Play.prototype.Main = function () {
            this.addChild(this._ocean);
            this.addChild(this._monsterBird);
            this.addChild(this._plane);
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.Bullet(this._assetManager);
                this.addChild(this._bullets[count]);
            }
            for (var count = 0; count < this._obstacleNum; count++) {
                this._obstacles[count] = new objects.Obstacle(this._assetManager);
                this.addChild(this._obstacles[count]);
            }
            this.addChild(this._livesLabel);
            this.addChild(this._scoreLabel);
        };
        Play.prototype._bulletFire = function () {
            this._bullets[this._bulletCounter].x = this._plane.bulletSpawn.x;
            this._bullets[this._bulletCounter].y = this._plane.bulletSpawn.y;
            this._bulletCounter++;
            console.log(this._bulletCounter);
            if (this._bulletCounter >= this._bulletNum - 1) {
                this._bulletCounter = 0;
            }
        };
        Play.prototype._checkCollisionsBullet = function (other) {
            var pos = this._monsterBird.position;
            // var size = enemies[i].sprite.size;
            for (var j = 0; j < this._bullets.length; j++) {
                var pos2 = this._bullets[j].position;
                //var size2 = bullets[j].sprite.size;
                if (Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2)) < (this._plane.halfHeight + other.halfHeight)) {
                    if (!other.isColliding) {
                        console.log("Collision with " + other.name);
                        if (other.name == "monsterbird") {
                            this._score += 100;
                            this._scoreLabel.text = "Score: " + this._score;
                            //createjs.Sound.play("thunder", 0, 0, 0, 0, 0.5);
                        }
                        other.isColliding = true;
                    }
                }
                else {
                    other.isColliding = false;
                }
            }
        };
        Play.prototype._checkCollision = function (other) {
            var P1 = new createjs.Point(this._plane.x, this._plane.y);
            var P2 = other.position;
            // compare the distance between P1 and P2 is less than half the height of each object
            if (Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)) < (this._plane.halfHeight + other.halfHeight)) {
                if (!other.isColliding) {
                    console.log("Collision with " + other.name);
                    // if(other.name == "monsterbird"){
                    //   this._score += 100;
                    //   this._scoreLabel.text = "Score: " + this._score;
                    //   createjs.Sound.play("thunder", 0, 0, 0, 0, 0.5);
                    // }
                    if (other.name == "obstacle") {
                        this._lives -= 1;
                        if (this._lives <= 0) {
                            this._currentScene = config.END;
                            this._engineSound.stop();
                            this.removeAllChildren();
                        }
                        this._livesLabel.text = "Live: " + this._lives;
                    }
                    other.isColliding = true;
                }
            }
            else {
                other.isColliding = false;
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map