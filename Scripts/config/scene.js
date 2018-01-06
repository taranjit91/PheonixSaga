var config;
(function (config) {
    config.START = 0;
    config.PLAY = 1;
    config.LEVEL2 = 3;
    config.LEVEL3 = 4;
    config.END = 2;
    var Screen = /** @class */ (function () {
        function Screen() {
        }
        Screen.WIDTH = 736;
        Screen.HEIGHT = 348;
        Screen.CENTER_X = 378;
        Screen.CENTER_Y = 174;
        return Screen;
    }());
    config.Screen = Screen;
})(config || (config = {}));
//# sourceMappingURL=scene.js.map