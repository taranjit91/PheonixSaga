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
        // PRIVATE INSTANCE VARIABLES
        // PUBLIC PROPERTIES
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
            this.verticalSpeed = 5;
            this._reset();
        };
        MonsterBird.prototype._updatePosition = function () {
            this.y += this.verticalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        MonsterBird.prototype.Update = function () {
            this._updatePosition();
            this._checkBounds();
        };
        return MonsterBird;
    }(objects.GameObject));
    objects.MonsterBird = MonsterBird;
})(objects || (objects = {}));
//# sourceMappingURL=monsterbird.js.map