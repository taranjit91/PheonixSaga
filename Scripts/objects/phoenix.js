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
    var Phoenix = /** @class */ (function (_super) {
        __extends(Phoenix, _super);
        // CONSTRUCTORS
        function Phoenix(assetManager) {
            var _this = _super.call(this, assetManager, "phoenix_play") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Phoenix.prototype._checkBounds = function () {
            //   if(this.x >= (736 - this.halfHeight)) {
            //       this.x = 736 - this.halfWidth;
            //   }
            //   if(this.x <= this.halfWidth) {
            //       this.x = this.halfWidth;
            //   }
            //   if(this.y >= (300 - this.halfHeight)) {
            //       this.y = 300 - this.halfHeight;
            //   }
            //   if(this.y <= this.halfHeight) {
            //       this.y = this.halfHeight
            //   }
            if (this.x >= (config.Screen.WIDTH - (this.width * 0.3))) {
                this.x = config.Screen.WIDTH - (this.width * 0.3);
            }
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            if (this.y >= (config.Screen.HEIGHT - (this.height * 1.2))) {
                this.y = config.Screen.HEIGHT - (this.height * 1.2);
            }
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        // PUBLIC METHODS
        Phoenix.prototype.Start = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.x = 150;
            this.y = 200;
            // SEAN Begin ---------------------------- 
            this._speed = 5;
            // SEAN End ------------------------------
            this.bulletSpawn = new createjs.Point(this.y - 10, this.x);
            this.powerBulletSpawn = new createjs.Point(this.y - 20, this.x);
        };
        Phoenix.prototype.Update = function () {
            //this.x = this.stage.mouseX;
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 10;
            this.powerBulletSpawn.x = this.x;
            this.powerBulletSpawn.y = this.y - 20;
            this._checkBounds();
            if (createjs.Ticker.getTime() - this._hitTime < 400) {
                if (createjs.Ticker.getTime() % 20 >= 10) {
                    this.alpha = 0.5;
                }
                else {
                    this.alpha = 1;
                }
            }
            else {
                this.alpha = 1;
            }
        };
        Phoenix.prototype.Damaged = function () {
            this._hitTime = createjs.Ticker.getTime();
        };
        Phoenix.prototype.UpdatePosition = function (_inputData) {
            if (_inputData.up == true)
                this.y -= this._speed;
            if (_inputData.down == true)
                this.y += this._speed;
            if (_inputData.left == true)
                this.x -= this._speed;
            if (_inputData.right == true)
                this.x += this._speed;
        };
        Phoenix.prototype.TriggerFire = function (_inputData) {
            if (_inputData.button1 == true) {
                _inputData.button1 = false;
                return true;
            }
            return false;
        };
        Phoenix.prototype.TriggerPowerBullet = function (_inputData) {
            if (_inputData.button2 == true) {
                _inputData.button2 = false;
                return true;
            }
            return false;
        };
        return Phoenix;
    }(objects.GameObject));
    objects.Phoenix = Phoenix;
})(objects || (objects = {}));
//# sourceMappingURL=phoenix.js.map