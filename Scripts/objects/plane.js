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
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Plane(textureAtlas) {
            var _this = _super.call(this, textureAtlas, "plane") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Plane.prototype._checkBounds = function () {
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        };
        // PUBLIC METHODS
        Plane.prototype.Start = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.x = 320;
            this.y = 430;
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
        };
        Plane.prototype.Update = function () {
            this.x = this.stage.mouseX;
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 35;
            this._checkBounds();
        };
        return Plane;
    }(createjs.Sprite));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map