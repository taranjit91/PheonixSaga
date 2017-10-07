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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Play(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this._playLabel = new objects.Label("Game Playing", "40px", "Consolas", "#000000", 320, 240, true);
            this._backButton = new objects.Button(this._assetManager, "backButton", 100, 340, true);
            this._nextButton = new objects.Button(this._assetManager, "nextButton", 540, 340, true);
            this.Main();
        };
        Play.prototype.Update = function () {
            return this._currentScene;
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._playLabel);
            this.addChild(this._backButton);
            this.addChild(this._nextButton);
            this._backButton.on("click", function () {
                _this._currentScene = config.START;
                _this.removeAllChildren();
            });
            this._nextButton.on("click", function () {
                _this._currentScene = config.END;
                _this.removeAllChildren();
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map