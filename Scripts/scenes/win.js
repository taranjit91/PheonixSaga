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
    var Win = /** @class */ (function (_super) {
        __extends(Win, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Win(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Win.prototype.Start = function () {
            this._bg = new objects.Background(this._assetManager, "defaultbg");
            this._gameOverLabel = new objects.Label("YOU WON", "50px", "gameFont", "#b42e2e", 400, 200, true);
            this._backButton = new objects.Button(this._assetManager, "restartButton", 400, 340, true);
            this.Main();
        };
        Win.prototype.Update = function () {
            return this._currentScene;
        };
        Win.prototype.Main = function () {
            var _this = this;
            this.addChild(this._bg);
            this.addChild(this._gameOverLabel);
            this.addChild(this._backButton);
            this._backButton.on("click", function () {
                _this._currentScene = config.PLAY;
                _this.removeAllChildren();
            });
        };
        return Win;
    }(objects.Scene));
    scenes.Win = Win;
})(scenes || (scenes = {}));
//# sourceMappingURL=win.js.map