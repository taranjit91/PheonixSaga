module objects {
  export class Label extends createjs.Text {
    // PRIVATE INSTANCE VARIABLES +++++++++
    // PUBLIC PROPERTIES ++++++++++++++++++
    get TextString():string {
      return this.text;
    }

    set TextString(text:string) {
      this.text = text;
      this.regX = this.getMeasuredWidth() * 0.5;
      this.regY = this.getMeasuredHeight() * 0.5;
    }

    // CONSTRUCTORS +++++++++++++++++++++++

    /**
     * Creates an instance of Label.
     *
     * @param {string} labelstring
     * @param {string} fontSize
     * @param {string} fontFamily
     * @param {string} colour
     * @param {number} x
     * @param {number} y
     * @param {boolean} isCentered
     */
    constructor(labelstring:string,
                fontSize:string,
                fontFamily:string,
                colour:string,
                x:number,
                y:number,
                isCentered:boolean) {
      super(labelstring, fontSize + " " + fontFamily, colour);

      if(isCentered) {
        this.regX = this.getMeasuredWidth() * 0.5;
        this.regY = this.getMeasuredHeight() * 0.5;
      }
      this.x = x;
      this.y = y;
    }
    // PRIVATE METHODS ++++++++++++++++++++
    // PUBLIC METHODS +++++++++++++++++++++
  }
}
