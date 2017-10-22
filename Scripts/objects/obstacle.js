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
    var Obstacle = /** @class */ (function (_super) {
        __extends(Obstacle, _super);
        // PRIVATE INSTANCE VARIABLES
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Obstacle(assetManager) {
            var _this = _super.call(this, assetManager, "obstacle") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Obstacle.prototype._reset = function () {
            this.y = -this.height;
            this.x = (Math.random() * (640 - this.width)) + this.halfWidth;
            this.verticalSpeed = (Math.random() * 5) + 5;
            this.horizontalSpeed = (Math.random() * 4) - 2;
        };
        Obstacle.prototype._checkBounds = function () {
            if (this.y >= 600 + this.height) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Obstacle.prototype.Start = function () {
            this._reset();
        };
        Obstacle.prototype._updatePosition = function () {
            this.y += this.verticalSpeed;
            this.x += this.horizontalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        Obstacle.prototype.Update = function () {
            this._updatePosition();
            this._checkBounds();
        };
        return Obstacle;
    }(objects.GameObject));
    objects.Obstacle = Obstacle;
})(objects || (objects = {}));
//# sourceMappingURL=obstacle.js.map