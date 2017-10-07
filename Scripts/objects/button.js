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
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // PRIVATE INSTANCE VARIABlES +++++++++++
        // PUBLIC PROPERTIES ++++++++++++++++++++
        // CONSTRUCTORS +++++++++++++++++++++++++
        /**
         * Creates an instance of Button.
         *
         * @param {createjs.LoadQueue} assetManager
         * @param {string} imageName
         * @param {number} x
         * @param {number} y
         * @param {boolean} isCentered
         */
        function Button(assetManager, imageName, x, y, isCentered) {
            var _this = _super.call(this, assetManager.getResult(imageName)) || this;
            if (isCentered) {
                _this.regX = _this.getBounds().width * 0.5;
                _this.regY = _this.getBounds().height * 0.5;
            }
            _this.x = x;
            _this.y = y;
            // event listeners
            _this.on("mouseover", _this._mouseOver);
            _this.on("mouseout", _this._mouseOut);
            return _this;
        }
        // PRIVATE METHODS ++++++++++++++++++++++
        Button.prototype._mouseOver = function (event) {
            this.alpha = 0.7; // change opacity to 70%
        };
        Button.prototype._mouseOut = function (event) {
            this.alpha = 1.0; // change the opacity to 100%
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map