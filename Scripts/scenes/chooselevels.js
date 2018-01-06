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
    var ChooseLevel = /** @class */ (function (_super) {
        __extends(ChooseLevel, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function ChooseLevel(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        ChooseLevel.prototype.Start = function () {
            this._bg = new objects.Background(this._assetManager, "defaultbg", 0);
            this._welcomeLabel = new objects.Label("PHOENIX SAGA", "50px", "gameFont", "#b42e2e", 400, 40, true);
            this._level1Button = new objects.Button(this._assetManager, "levels", 400, 150, true);
            this._bossLevelButton = new objects.Button(this._assetManager, "bosslevelButton", 400, 230, true);
            this._backButton = new objects.Button(this._assetManager, "exitButton", 400, 310, true);
            this.Main();
        };
        ChooseLevel.prototype.Update = function () {
            return this._currentScene;
        };
        ChooseLevel.prototype.Main = function () {
            var _this = this;
            this.addChild(this._bg);
            this.addChild(this._welcomeLabel);
            this.addChild(this._level1Button);
            this.addChild(this._bossLevelButton);
            this.addChild(this._backButton);
            this._level1Button.on("click", function () {
                _this._currentScene = config.PLAY;
                _this.removeAllChildren();
            });
            this._bossLevelButton.on("click", function () {
                _this._currentScene = config.LEVEL3;
                _this.removeAllChildren();
            });
            this._backButton.on("click", function () {
                _this._currentScene = config.START;
                _this.removeAllChildren();
            });
        };
        return ChooseLevel;
    }(objects.Scene));
    scenes.ChooseLevel = ChooseLevel;
})(scenes || (scenes = {}));
//# sourceMappingURL=chooselevels.js.map