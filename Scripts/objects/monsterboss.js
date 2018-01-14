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
var objects;
(function (objects) {
    var MonsterBoss = /** @class */ (function (_super) {
        __extends(MonsterBoss, _super);
        // CONSTRUCTORS
        function MonsterBoss(assetManager) {
            var _this = _super.call(this, assetManager, "enemyBoss") || this;
            _this._dyF = true; // distinguish +-
            _this._dxF = true; // distinguish +-
            _this._2ndMovement = false;
            _this._2ndTempSwitch = false;
            _this._3rdTempSwitch = false;
            _this._life = 20;
            _this._dead = false;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        MonsterBoss.prototype._reset = function () {
            this._life = 20;
            // this.y = -this.height;
            this._dx = Math.floor((Math.random() * 5) + 6); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 1); // horizontal drift
            this.x = config.Screen.WIDTH + this.width;
            this.y = config.Screen.CENTER_Y;
        };
        MonsterBoss.prototype._checkBounds = function () {
            if (this.x >= config.Screen.WIDTH - this.width * 0.5) {
                this._dx = Math.floor((Math.random() * 3) + 2); // vertical drispeedft
                this._dxF = false;
            }
            else if (this.x <= config.Screen.CENTER_X + this.width * 0.5) {
                this._dx = Math.floor((Math.random() * 3) + 2); // vertical drispeedft
                this._dxF = true;
            }
            // Y-Axis bound check
            if (this.y >= config.Screen.HEIGHT - 20 - this.height * 0.5) {
                this._dy = Math.floor((Math.random() * 3) + 3);
                this._dyF = false;
            }
            else if (this.y <= 0 + this.height * 0.5) {
                this._dy = Math.floor((Math.random() * 3) + 3);
                this._dyF = true;
            }
            // if(this.x <= -200 + this.width) {
            //   this._reset();
            // }
        };
        MonsterBoss.prototype.Reset = function () {
            // this._dead= false;
            // this._reset();
        };
        MonsterBoss.prototype.isDead = function () {
            if (this._life <= 0) {
                this._dead = true;
            }
            else {
                this._dead = false;
            }
            return this._dead;
        };
        // PUBLIC METHODS
        MonsterBoss.prototype.Start = function () {
            this.horizontalSpeed = 2;
            this._reset();
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
            this.powerBulletSpawn = new createjs.Point(this.y - 35, this.x);
            this._bulletTrigger = false;
            this._bulletTriggerCount = 0;
            this._bulletTriggerPoint = 100;
        };
        MonsterBoss.prototype._updatePosition = function () {
            if (this._dxF) {
                this.x += this._dx;
            }
            else {
                this.x -= this._dx;
            }
            if (this._dyF) {
                this.y += this._dy;
            }
            else {
                this.y -= this._dy;
            }
            this.position.x = this.x;
            this.position.y = this.y;
        };
        MonsterBoss.prototype._updatePosition2nd = function () {
            if (this._3rdTempSwitch == false) {
                this.x += 5;
            }
            else {
                this.x -= 5;
            }
            if (this._2ndTempSwitch == false) {
                if (this.position.x > (config.Screen.WIDTH * 1.5)) {
                    this.x = 0 - this.width;
                    this._2ndTempSwitch = true;
                }
            }
            else {
                if (this._3rdTempSwitch == true) {
                    if (this.position.x < -(config.Screen.WIDTH * 0.5)) {
                        this.x = config.Screen.WIDTH + this.width;
                        this._2ndTempSwitch = false;
                        this._3rdTempSwitch = false;
                        this._2ndMovement = false;
                    }
                }
                else {
                    if (this.position.x > (config.Screen.WIDTH * 0.5)) {
                        this._3rdTempSwitch = true;
                    }
                }
            }
            this.position.x = this.x;
        };
        MonsterBoss.prototype.Damaged = function (bulletType) {
            if (bulletType == 1) {
                this._life = this._life - 2;
            }
            else {
                this._life = this._life - 1;
            }
            this._hitTime = createjs.Ticker.getTime();
            if ((this._life % 4) == 0) {
                this._2ndMovement = true;
            }
            if (this._life <= 0) {
                this.Reset();
            }
        };
        MonsterBoss.prototype.Update = function () {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y + 20;
            this.powerBulletSpawn.x = this.x;
            this.powerBulletSpawn.y = this.y + 20;
            if (this._2ndMovement == true) {
                this._updatePosition2nd();
            }
            else {
                this._updatePosition();
                this._checkBounds();
            }
            this._bulletTriggerCount++;
            if (this._bulletTriggerCount > this._bulletTriggerPoint) {
                //console.log(this._bulletTriggerCount);
                this._bulletTrigger = true;
                this._bulletTriggerCount = 0;
            }
            // Blink when enemy is hitted
            if (createjs.Ticker.getTime() - this._hitTime < 400) {
                if (createjs.Ticker.getTime() % 20 >= 10) {
                    this.alpha = 0.5;
                }
                else {
                    this.alpha = 1;
                }
            }
            else {
                this.alpha = 1;
            }
        };
        MonsterBoss.prototype.SetBulletTrigger = function (bulletFlag) {
            this._bulletTrigger = bulletFlag;
        };
        MonsterBoss.prototype.TriggerFire = function () {
            return this._bulletTrigger;
        };
        MonsterBoss.prototype.Set2ndMovement = function (changeMovement) {
            this._2ndMovement = changeMovement;
        };
        MonsterBoss.prototype.Get2ndMovement = function () {
            return this._2ndMovement;
        };
        return MonsterBoss;
    }(objects.GameObject));
    objects.MonsterBoss = MonsterBoss;
})(objects || (objects = {}));
//# sourceMappingURL=monsterboss.js.map