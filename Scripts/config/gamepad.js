/**
 * Input Config
 * Date : 10/18/2017
 * Author: Sean Yi
 */
var config;
(function (config) {
    var GameInput;
    (function (GameInput) {
        GameInput[GameInput["NONE"] = 0] = "NONE";
        GameInput[GameInput["START"] = 1] = "START";
        GameInput[GameInput["SELECT"] = 2] = "SELECT";
        GameInput[GameInput["UP"] = 3] = "UP";
        GameInput[GameInput["DOWN"] = 4] = "DOWN";
        GameInput[GameInput["LEFT"] = 5] = "LEFT";
        GameInput[GameInput["RIGHT"] = 6] = "RIGHT";
        GameInput[GameInput["BUTTON1"] = 7] = "BUTTON1";
        GameInput[GameInput["BUTTON2"] = 8] = "BUTTON2";
        GameInput[GameInput["BUTTON3"] = 9] = "BUTTON3";
        GameInput[GameInput["BUTTON4"] = 10] = "BUTTON4";
    })(GameInput = config.GameInput || (config.GameInput = {}));
    var KeyCode;
    (function (KeyCode) {
        KeyCode[KeyCode["KEYCODE_ENTER"] = 13] = "KEYCODE_ENTER";
        KeyCode[KeyCode["KEYCODE_LEFT"] = 37] = "KEYCODE_LEFT";
        KeyCode[KeyCode["KEYCODE_RIGHT"] = 39] = "KEYCODE_RIGHT";
        KeyCode[KeyCode["KEYCODE_UP"] = 38] = "KEYCODE_UP";
        KeyCode[KeyCode["KEYCODE_DOWN"] = 40] = "KEYCODE_DOWN";
        KeyCode[KeyCode["KEYCODE_SPACE"] = 32] = "KEYCODE_SPACE";
        KeyCode[KeyCode["KEYCODE_Z"] = 90] = "KEYCODE_Z";
        KeyCode[KeyCode["KEYCODE_X"] = 88] = "KEYCODE_X";
        KeyCode[KeyCode["KEYCODE_C"] = 67] = "KEYCODE_C";
    })(KeyCode = config.KeyCode || (config.KeyCode = {}));
})(config || (config = {}));
//# sourceMappingURL=gamepad.js.map