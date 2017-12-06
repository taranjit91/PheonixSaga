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
    var MonsterBird = /** @class */ (function (_super) {
        __extends(MonsterBird, _super);
        // CONSTRUCTORS
        function MonsterBird(assetManager) {
            var _this = _super.call(this, assetManager, "monsterbird") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        MonsterBird.prototype._reset = function () {
            this.y = -this.height;
            this.x = (Math.random() * (800 - this.width)) + this.halfWidth;
        };
        MonsterBird.prototype._checkBounds = function () {
            if (this.y >= 600 + this.height) {
                this._reset();
            }
        };
        MonsterBird.prototype.Reset = function () {
            this._reset();
        };
        // PUBLIC METHODS
        MonsterBird.prototype.Start = function () {
            this.verticalSpeed = 2;
            this._reset();
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
            this._bulletTrigger = false;
            this._bulletTriggerCount = 0;
            this._bulletTriggerPoint = 50;
        };
        MonsterBird.prototype._updatePosition = function () {
            this.y += this.verticalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        MonsterBird.prototype.Update = function () {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y + 20;
            this._updatePosition();
            this._checkBounds();
            this._bulletTriggerCount++;
            if (this._bulletTriggerCount > 100) {
                console.log(this._bulletTriggerCount);
                this._bulletTrigger = true;
                this._bulletTriggerCount = 0;
            }
        };
        MonsterBird.prototype.SetBulletTrigger = function (bulletFlag) {
            this._bulletTrigger = bulletFlag;
        };
        MonsterBird.prototype.TriggerFire = function () {
            return this._bulletTrigger;
        };
        return MonsterBird;
    }(objects.GameObject));
    objects.MonsterBird = MonsterBird;
})(objects || (objects = {}));
//# sourceMappingURL=monsterbird.js.map