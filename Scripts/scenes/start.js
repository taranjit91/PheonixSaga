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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Start(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this._bg = new objects.Background(this._assetManager, "defaultbg", 0);
            this._welcomeLabel = new objects.Label("PHOENIX SAGA", "50px", "gameFont", "#b42e2e", 400, 40, true);
            this._startButton = new objects.Button(this._assetManager, "startButton", 400, 150, true);
            this._level3Button = new objects.Button(this._assetManager, "level3", 400, 230, true);
            this._tutorialButton = new objects.Button(this._assetManager, "tutorialButton", 400, 310, true);
            this._exitButton = new objects.Button(this._assetManager, "exitButton", 400, 390, true);
            this.Main();
        };
        Start.prototype.Update = function () {
            return this._currentScene;
        };
        Start.prototype.Main = function () {
            var _this = this;
            this.addChild(this._bg);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startButton);
            this.addChild(this._level3Button);
            this.addChild(this._tutorialButton);
            this.addChild(this._exitButton);
            this._startButton.on("click", function () {
                _this._currentScene = config.PLAY;
                _this.removeAllChildren();
            });
            this._level3Button.on("click", function () {
                _this._currentScene = config.LEVEL3;
                _this.removeAllChildren();
            });
            this._tutorialButton.on("click", function () {
                _this._currentScene = config.HOWTOPLAY;
                _this.removeAllChildren();
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map