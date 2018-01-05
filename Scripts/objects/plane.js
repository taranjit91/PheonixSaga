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
        // CONSTRUCTORS
        function Plane(assetManager) {
            var _this = _super.call(this, assetManager, "plane") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Plane.prototype._checkBounds = function () {
            if (this.x >= (800 - this.halfHeight)) {
                this.x = 800 - this.halfWidth;
            }
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            if (this.y >= (600 - this.halfHeight)) {
                this.y = 600 - this.halfHeight;
            }
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
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
            // SEAN Begin ---------------------------- 
            this._speed = 5;
            // SEAN End ------------------------------
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
        };
        Plane.prototype.Update = function () {
            //this.x = this.stage.mouseX;
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 35;
            this._checkBounds();
        };
        // SEAN Begin ----------------------------
        Plane.prototype.UpdatePosition = function (_inputData) {
            if (_inputData.up == true)
                this.y -= this._speed;
            if (_inputData.down == true)
                this.y += this._speed;
            if (_inputData.left == true)
                this.x -= this._speed;
            if (_inputData.right == true)
                this.x += this._speed;
        };
        Plane.prototype.TriggerFire = function (_inputData) {
            if (_inputData.button1 == true) {
                _inputData.button1 = false;
                return true;
            }
            return false;
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map