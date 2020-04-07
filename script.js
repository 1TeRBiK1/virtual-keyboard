class KeyBoard {
    Element = {
        AreaKeyBoard: null,
        KeysBoard: null,
        Keys : [],
        About: null
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
    strAbout = "Shift+Alt switch lang, OS Win";
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
                        KeysEventCode = [
                            'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
                            'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
                            'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
                            'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 
                            'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
     constructor() {
                            //создаем клавиутуру
                            this.Element.areaKeyBoard = document.createElement("div");
                            this.Element.KeysBoard = document.createElement("div");
                            this.Element.textarea = document.createElement("textarea");
                            this.Element.About = document.createElement("div");
                            //добавление css 
                            this.Element.areaKeyBoard.classList.add("areaKeyBoard");
                            this.Element.KeysBoard.classList.add("keysBoard");
                            this.Element.textarea.classList.add("textarea");
                            this.Element.KeysBoard.appendChild(this._createKeys());
                            this.Element.About.classList.add("About");
                    
                            //добавить Dom
                            this.Element.areaKeyBoard.appendChild(this.Element.KeysBoard);
                            document.body.appendChild(this.Element.areaKeyBoard);
                            document.body.appendChild(this.Element.textarea);
                            document.body.appendChild(this.Element.About);
                    
                            this._mouseClick();
                            this._keyDown();
                            this._keyUp();
                            //this._mouseShiftDown();
                            //this._mouseShiftUp();
                            //this._keyShiftDown(
                           // this._keyShiftUp();
                            //this._languageValue();
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
                        _mouseClick() {
                            document.querySelector('.keysBoard').addEventListener('click',(event)=>{
                                if (event.target.classList.contains('button')){
                                    let cursorPositionStart = this.Element.textarea.selectionEnd+1;
                                    let cursorPositionEnd = this.Element.textarea.selectionEnd+1;
                                    this.Element.textarea.value = this.Element.textarea.value.slice(0,cursorPositionStart-1)+event.target.innerText+this.Element.textarea.value.slice(cursorPositionStart-1,this.Element.textarea.length)
                                    this.Element.textarea.selectionStart = cursorPositionEnd;
                                    this.Element.textarea.selectionEnd = cursorPositionEnd;
                                                
                                }
                                    this.Element.textarea.focus();
                            })
                        }
                        _keyDown() {
                            let buttons = document.querySelectorAll('.button');
                            for (let i = 0; i < buttons.length; i++) {
                                buttons[i].setAttribute('id', `${this.KeysEventCode[i]}`)
                            }
                            window.addEventListener('keydown', (event) => {
                                let test1 = document.querySelector(`#${event.code}`);
                                test1.classList.add('active');
                                test1.click();
                                        event.preventDefault();
                                        this.Element.textarea.focus();
                                    }
                                )
                        }
                        _keyUp() {
                            window.addEventListener('keyup', (event) => {
                               let test = document.querySelector(`#${event.code}`);
                               test.classList.remove('active');
                                })
                            }
                        
}
let arr = new KeyBoard();
