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
        // PRIVATE INSTANCE VARIABLES
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Background(assetManager, name) {
            return _super.call(this, assetManager.getResult(name)) || this;
        }
        return Background;
    }(createjs.Bitmap));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=backgroundtheme.js.map