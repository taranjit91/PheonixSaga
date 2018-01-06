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
    var Instructions = /** @class */ (function (_super) {
        __extends(Instructions, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Instructions(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Instructions.prototype.Start = function () {
            this._bg = new objects.Background(this._assetManager, "defaultbg", 0);
            this._titleLabel = new objects.Label("HOW TO PLAY", "40px", "gameFont", "#b42e2e", 400, 40, true);
            this._descriptionLabel = new objects.Label("\n\nThe goal is to play for Phoenix, \ncollect ashes and submit it to sun", "20px", "gameFont", "#333333", 600, 110, true);
            this._gameControlsTitleLabel = new objects.Label("GAME CONTROLS", "35px", "gameFont", "#b42e2e", 400, 200, true);
            this._gameControlsDescLabel = new objects.Label("\n\n\u2022    Use arrow keys for navigation. \n\u2022    Use space bar to shoot enemy.\n\u2022    Use Z to use power bullets.", "20px", "gameFont", "#333333", 760, 280, true);
            this._back = new objects.Button(this._assetManager, "backButton", 400, 450, true);
            this.Main();
        };
        Instructions.prototype.Update = function () {
            return this._currentScene;
        };
        Instructions.prototype.Main = function () {
            var _this = this;
            this.addChild(this._bg);
            this.addChild(this._titleLabel);
            this.addChild(this._descriptionLabel);
            this.addChild(this._gameControlsTitleLabel);
            this.addChild(this._gameControlsDescLabel);
            this.addChild(this._back);
            this._back.on("click", function () {
                _this._currentScene = config.START;
                _this.removeAllChildren();
            });
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map