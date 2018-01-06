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
            _this._life = 20;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        MonsterBoss.prototype._reset = function () {
            // this.y = -this.height;
            this.y = Math.random() * this.halfHeight;
            this.x = (Math.random() * (760 - this.width)) + this.halfWidth;
        };
        MonsterBoss.prototype._checkBounds = function () {
            if (this.x <= -200 + this.width) {
                this._reset();
            }
        };
        MonsterBoss.prototype.Reset = function () {
            this._reset();
        };
        // PUBLIC METHODS
        MonsterBoss.prototype.Start = function () {
            this.horizontalSpeed = 2;
            this._reset();
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
            this.powerBulletSpawn = new createjs.Point(this.y - 35, this.x);
            this._bulletTrigger = false;
            this._bulletTriggerCount = 0;
            this._bulletTriggerPoint = 50;
        };
        MonsterBoss.prototype._updatePosition = function () {
            this.x -= this.horizontalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        MonsterBoss.prototype.Damaged = function () {
            this._life--;
            this._hitTime = createjs.Ticker.getTime();
            if (this._life <= 0) {
                this.Reset();
            }
        };
        MonsterBoss.prototype.Update = function () {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y + 20;
            this._updatePosition();
            this._checkBounds();
            this._bulletTriggerCount++;
            if (this._bulletTriggerCount > this._bulletTriggerPoint) {
                console.log(this._bulletTriggerCount);
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
        return MonsterBoss;
    }(objects.GameObject));
    objects.MonsterBoss = MonsterBoss;
})(objects || (objects = {}));
//# sourceMappingURL=monsterboss.js.map