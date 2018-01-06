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
    var EnemyBullet = /** @class */ (function (_super) {
        __extends(EnemyBullet, _super);
        // PRIVATE INSTANCE VARIABLES
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function EnemyBullet(assetManager) {
            var _this = _super.call(this, assetManager, "bullet") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        EnemyBullet.prototype._reset = function () {
            // this.y = -1000;
            this.x = -500;
        };
        EnemyBullet.prototype._checkBounds = function () {
            if (this.x <= 0 + this.width) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        EnemyBullet.prototype.Start = function () {
            this.horizontalSpeed = -5;
            this._reset();
        };
        EnemyBullet.prototype.Reset = function () {
            this._reset();
        };
        EnemyBullet.prototype._updatePosition = function () {
            this.x += this.horizontalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        EnemyBullet.prototype.Update = function () {
            if (this.y > 0) {
                this._updatePosition();
                this._checkBounds();
            }
        };
        return EnemyBullet;
    }(objects.GameObject));
    objects.EnemyBullet = EnemyBullet;
})(objects || (objects = {}));
//# sourceMappingURL=enemybullets.js.map