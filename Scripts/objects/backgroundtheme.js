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
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Background(assetManager, name, offset, scrollSpeed) {
            if (scrollSpeed === void 0) { scrollSpeed = 3; }
            var _this = _super.call(this, assetManager.getResult(name)) || this;
            _this._dx = scrollSpeed;
            _this._offset = offset;
            _this.start();
            return _this;
        }
        Background.prototype.start = function () {
            this.x = this._offset;
        };
        Background.prototype.update = function () {
            this.x -= this._dx;
            this._reset();
        };
        // PRIVATE METHODS
        Background.prototype._reset = function () {
            if (this.x <= -800) {
                this.x = 800;
            }
        };
        return Background;
    }(createjs.Bitmap));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=backgroundtheme.js.map