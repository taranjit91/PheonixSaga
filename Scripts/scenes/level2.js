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
var scenes;
(function (scenes) {
    var Level2 = /** @class */ (function (_super) {
        __extends(Level2, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Level2(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Level2.prototype.Start = function () {
            this._level2Label = new objects.Label("LEVEL 2", "40px", "Consolas", "#ffffff", 400, 240, true);
            this._backButton = new objects.Button(this._assetManager, "backButton", 400, 340, true);
            this.Main();
        };
        Level2.prototype.Update = function () {
            return this._currentScene;
        };
        Level2.prototype.Main = function () {
            var _this = this;
            this.addChild(this._level2Label);
            this.addChild(this._backButton);
            this._backButton.on("click", function () {
                _this._currentScene = config.PLAY;
                _this.removeAllChildren();
            });
        };
        return Level2;
    }(objects.Scene));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));
//# sourceMappingURL=level2.js.map