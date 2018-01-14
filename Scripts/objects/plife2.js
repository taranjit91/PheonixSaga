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
    var PLife2 = /** @class */ (function (_super) {
        __extends(PLife2, _super);
        // PRIVATE INSTANCE VARIABLES
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function PLife2(assetManager) {
            var _this = _super.call(this, assetManager, "plife2") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS        
        // PUBLIC METHODS
        PLife2.prototype.Start = function () {
        };
        PLife2.prototype.Reset = function () {
            this.x = 1000;
            this.y = 1000;
        };
        PLife2.prototype.Update = function () {
        };
        PLife2.prototype.SetPosition = function (_x, _y) {
            this.x = _x;
            this.y = _y;
        };
        return PLife2;
    }(objects.GameObject));
    objects.PLife2 = PLife2;
})(objects || (objects = {}));
//# sourceMappingURL=plife2.js.map