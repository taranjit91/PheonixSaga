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
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Obstacle(assetManager) {
            var _this = _super.call(this, assetManager, "obstacle") || this;
            _this.Start();
            return _this;
        }
        Obstacle.prototype.Start = function () {
            this._reset();
        };
        Obstacle.prototype.Update = function () {
            this.update();
        };
        Obstacle.prototype.update = function () {
            this.x -= this._dx;
            if (this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            this._checkBounds();
        };
        Obstacle.prototype._reset = function () {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0;
            this.isColliding = false;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 3) + 1); // horizontal drift
            this.x = config.Screen.WIDTH;
            // get a random y location
            this.y = Math.floor((Math.random() * ((config.Screen.HEIGHT - (this.height * 0.5)) - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;
            this.alpha = 1;
        };
        Obstacle.prototype.destroy = function () {
            this._reset();
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Obstacle.prototype._checkBounds = function () {
            if ((this.y >= (config.Screen.HEIGHT - 50 - (this.height * 0.5)))
                || (this.x <= (0 - (this.width * 0.5)))) {
                this._reset();
            }
        };
        return Obstacle;
    }(objects.GameObject));
    objects.Obstacle = Obstacle;
})(objects || (objects = {}));
//     public Update():void {
//       this._updatePosition();
//       this._checkBounds();
//     }
//     public Reset(): void {
//       this._reset();
//     }
//   }
// } 
//# sourceMappingURL=obstacle.js.map