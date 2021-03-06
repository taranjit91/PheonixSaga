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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // PRIVATE INSTANCE VARIABLES
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Bullet(assetManager, name) {
            var _this = _super.call(this, assetManager, name) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Bullet.prototype._reset = function () {
            //this.y = -1000;
            this.x = 1000;
        };
        Bullet.prototype._checkBounds = function () {
            if (this.x <= 0 + this.width) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Bullet.prototype.Start = function () {
            this.horizontalSpeed = 10;
            this._reset();
        };
        Bullet.prototype.Reset = function () {
            this._reset();
        };
        Bullet.prototype._updatePosition = function () {
            this.x += this.horizontalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        Bullet.prototype.Update = function () {
            if (this.x > 0) {
                this._updatePosition();
                this._checkBounds();
            }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullets.js.map