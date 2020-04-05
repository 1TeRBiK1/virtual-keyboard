class KeyBoard {
    Element = {
        AreaKeyBoard: null,
        KeysBoard: null,
        Keys : []
    }
    Properties = {
        control :false,
        alt: false,
        caps : false,
        shift: false
    }
    initial () {
        // создание клавиатуры
        this.Element.AreaKeyBoard = document.createElement('div');
        this.Element.KeysBoard = document.createElement('div');
        //добавление style
        this.Element.AreaKeyBoard.classList.add('klava');
        this.Element.KeysBoard.classList.add('klava');

    }
    KeysValuesEng = ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
                     'Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del',
                     'CapsLock','a','s','d','f','g','h','j','k','l',';','\'','Enter',
                     'Shift','z','x','c','v','b','n','m',',','.','/','↑','Shift',
                     'Ctrl','Win','Alt','Space','Alt','←', '↓', '→','Ctrl']; 9
    KeysValuesRu = ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
                        'Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','Del',
                        'CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter',
                        'Shift','я','ч','с','м','и','т','ь','б','ю','.','↑','Shift',
                        'Ctrl','Win','Alt','Space','Alt','←', '↓', '→','Ctrl'];
     constructor() {
                            //создаем клавиутуру
                            this.Element.areaKeyBoard = document.createElement("div");
                            this.Element.KeysBoard = document.createElement("div");
                            this.Element.textarea = document.createElement("textarea");
                    
                            //добавление css 
                            this.Element.areaKeyBoard.classList.add("areaKeyBoard");
                            this.Element.KeysBoard.classList.add("keysBoard");
                            this.Element.textarea.classList.add("textarea");
                            this.Element.KeysBoard.appendChild(this._createKeys());
                    
                            //добавить Dom
                            this.Element.areaKeyBoard.appendChild(this.Element.KeysBoard);
                            document.body.appendChild(this.Element.areaKeyBoard);
                            document.body.appendChild(this.Element.textarea);
                    
                            this._mouseClick();
                            this._keyDown();
                            this._keyUp();
                            this._mouseShiftDown();
                            this._mouseShiftUp();
                            this._keyShiftDown();
                            this._keyShiftUp();
                            this._languageValue();
                            //this._keyShiftRightDown();
                           // this._keyShiftRightUp();
                    
                        }
                        _createKeys() {
                            const fragment = document.createDocumentFragment();
                            const buttonToBr = [14, 15, 13, 13 ];
                            let numStr = 0;
                            let count = 0;
                            this.KeysValuesEng.forEach(element => {
                                count++;
                                let element1 = document.createElement('button');
                                element1.classList.add('button');
                                element1.setAttribute('type', 'button');
                                element1.innerText = element;
                                fragment.appendChild(element1);
                                if (buttonToBr[numStr] == count) {
                                    fragment.appendChild(document.createElement("br"));
                                    numStr++;
                                    count=0;
                                }
                    
                            })
                    
                            return fragment;
                    
                        }
}
let arr = new KeyBoard();
arr.initial();
arr.createKeys();
console.log(arr.Element.AreaKeyBoard);