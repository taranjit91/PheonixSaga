/**
 * Input Controller/Manager
 * Based on Xbox One Controller
 * Date : 10/18/2017
 * Author: Sean Yi
 */
module core{
    // Input Data Structure
    export class InputData {
        // For Gamepad.displayId
        public inputID: string;
        public inputIdx: number;

        public start: boolean;
        public select: boolean;
        public up: boolean;
        public down: boolean;
        public left: boolean;
        public right: boolean;
        public button1: boolean;
        public button2: boolean;
        public button3: boolean;
        public button4: boolean;
        public axisX: number;
        public axisY: number;
        
        public Init(): void {
            this.start = false;
            this.select = false;
            this.up = false;
            this.down = false;
            this.left = false;
            this.right = false;
            this.button1 = false;
            this.button2 = false;
            this.button3 = false;
            this.button4 = false;
            this.axisX = 0;     // (up) -1 < axis < 1 (down)
            this.axisY = 0;     // (left) -1 < axis < 1 (right)
        }
    }

    export class InputManager {
        inputdata: InputData;
        gamepad: Gamepad;
        axis:number[] = [];

        constructor() {
            this.inputdata = new InputData();
            //this.GetKeyboardInput = this.GetKeyboardInput.bind(this);
            //window.addEventListener('keydown', (event)=>this.GetKeyboardInput(event));
            document.addEventListener('keydown', this.keyboardDown);
            document.addEventListener('keyup', this.keyboardUp);
        }

        // [MEMO] Required refactoring codes
        public keyboardDown = (event: KeyboardEvent): void => {
            event.preventDefault();
            switch (event.keyCode){
                case config.KeyCode.KEYCODE_UP:
                this.inputdata.up = true;
                break;
                case config.KeyCode.KEYCODE_DOWN:
                this.inputdata.down = true;
                break;
                case config.KeyCode.KEYCODE_LEFT:
                this.inputdata.left = true;
                break;
                case config.KeyCode.KEYCODE_RIGHT:
                this.inputdata.right = true;
                break;
                case config.KeyCode.KEYCODE_ENTER:
                this.inputdata.start = true;
                break;
                case config.KeyCode.KEYCODE_SPACE:
                this.inputdata.button1 = true;
                break;
                case config.KeyCode.KEYCODE_Z:
                this.inputdata.button2 = true;
                break;
                case config.KeyCode.KEYCODE_X:
                this.inputdata.button3 = true;
                break;
                case config.KeyCode.KEYCODE_C:
                this.inputdata.button4 = true;
                break;
            }
            this.SetInputData(this.inputdata);
        }
        public keyboardUp = (event: KeyboardEvent): void => {
            switch (event.keyCode){
                case config.KeyCode.KEYCODE_UP:
                this.inputdata.up = false;
                break;
                case config.KeyCode.KEYCODE_DOWN:
                this.inputdata.down = false;
                break;
                case config.KeyCode.KEYCODE_LEFT:
                this.inputdata.left = false;
                break;
                case config.KeyCode.KEYCODE_RIGHT:
                this.inputdata.right = false;
                break;
                case config.KeyCode.KEYCODE_ENTER:
                this.inputdata.start = false;
                break;
                case config.KeyCode.KEYCODE_SPACE:
                this.inputdata.button1 = false;
                break;
                case config.KeyCode.KEYCODE_Z:
                this.inputdata.button2 = false;
                break;
                case config.KeyCode.KEYCODE_X:
                this.inputdata.button3 = false;
                break;
                case config.KeyCode.KEYCODE_C:
                this.inputdata.button4 = false;
                break;
            }
            this.SetInputData(this.inputdata);
        }

        public GetInput(): InputData {
            //this.inputdata.Init();
            // [TEST] Not recognized 1P is gamepad or keyboard
            this.GetGamepadInput();            

            // [DEBUG] Log
            //console.log(this.inputdata);
            //console.log(this.inputdata.up, this.inputdata.down);

            return this.inputdata;
        }

        public GetGamepadInput(): void {
            this.gamepad = window.navigator.getGamepads()[0];

            if (this.gamepad) {
                // check Buttons
                // for (let button = 0; button < this.gamepad.buttons.length; button++) {
                //   if (this.gamepad.buttons[button].pressed) {
                //     console.log("button " + button + " pressed");
                //   }
                // }
                // [NOTE] Xbox One Controller
                this.inputdata.button1 = this.gamepad.buttons[0].pressed;
                this.inputdata.button2 = this.gamepad.buttons[1].pressed;
                this.inputdata.button3 = this.gamepad.buttons[2].pressed;
                this.inputdata.button4 = this.gamepad.buttons[3].pressed;

                // [NOTE] Xbox One Controller
                this.inputdata.up = this.gamepad.buttons[12].pressed;
                this.inputdata.down = this.gamepad.buttons[13].pressed;
                this.inputdata.left = this.gamepad.buttons[14].pressed;
                this.inputdata.right = this.gamepad.buttons[15].pressed;                

                // check Axes
                for (let index = 0; index < this.gamepad.axes.length; index++) {
                  //console.log("axes idx: " + gamepad.axes);
                  
                  // [NOTE] Based on Xbox One Controller
                  // -1 < gamepad.axes < 1
                  // index 0 = Left Stick = left(-1), right(1)
                  // index 1 = Left Stick = Up(-1), Down(1)
                  // index 2 = Right Stick = left(-1), right(1)
                  // index 3 = Right Stick = Up(-1), Down(1)
                  this.inputdata.axisX = this.axis[0];
                  this.inputdata.axisY = this.axis[1];

                  if ((this.gamepad.axes[index] > 0.2) || (this.gamepad.axes[index] < -0.2)) {
                    //console.log("axis: " + axis + " value: " + gamepad.axes[axis]);
                    this.axis[index] = this.gamepad.axes[index];

                    // Axis X
                    if(index == 1 || index == 3) {
                        this.inputdata.up = true;
                    }

                    // Axis Y
                    if(index == 0 || index == 2) {
                        if(this.gamepad.axes[index] > 0.2 ) {
                            this.inputdata.left = false;
                            this.inputdata.right = true;
                        } else {
                            this.inputdata.left = true;
                            this.inputdata.right = false;
                        }
                    }                    

                    if((index == 1) && (this.axis[index] > 0)) {
                      //axis[index] = 0; // don't allow backward movement
                      this.inputdata.down = true;
                      this.inputdata.up = false;
                    }
                  }
                  else if((this.gamepad.axes[index] > -0.2 ) && (this.gamepad.axes[index] < 0.2)) {
                    this.axis[index] = 0;
                  }
                } // end check Axes
              } // end check gamepad
              this.SetInputData(this.inputdata);
            
        }
        
        public GetKeyboardInput = (event: KeyboardEvent):void => {
            switch (event.keyCode){
                case config.KeyCode.KEYCODE_UP:
                this.inputdata.up = true;
                break;
                case config.KeyCode.KEYCODE_DOWN:
                this.inputdata.down = true;
                break;
                case config.KeyCode.KEYCODE_LEFT:
                this.inputdata.left = true;
                break;
                case config.KeyCode.KEYCODE_RIGHT:
                this.inputdata.right = true;
                break;
            }
            this.SetInputData(this.inputdata);
        }

        public SetInputMovingData(_up: boolean, _down: boolean, _left: boolean, _right: boolean) {
            this.inputdata.up = _up;
            this.inputdata.down = _down;
            this.inputdata.left = _left;
            this.inputdata.right = _right;            
        }

        public SetInputData(_inputData:InputData): void {
            this.inputdata = _inputData;
        }
    }
}