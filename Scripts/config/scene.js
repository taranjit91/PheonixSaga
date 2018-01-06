var config;
(function (config) {
    config.START = 0;
    config.HOWTOPLAY = 5;
    config.PLAY = 1;
    config.LEVEL2 = 3;
    config.LEVEL3 = 4;
    config.END = 2;
    var Screen = /** @class */ (function () {
        function Screen() {
        }
        Screen.WIDTH = 800;
        Screen.HEIGHT = 554;
        Screen.CENTER_X = 400;
        Screen.CENTER_Y = 277;
        return Screen;
    }());
    config.Screen = Screen;
})(config || (config = {}));
//# sourceMappingURL=scene.js.map