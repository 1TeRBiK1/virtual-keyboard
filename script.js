class KeyBoard {
    Element = {
        AreaKeyBoard: null,
        KeysBoard: null,
        Keys : [],
        About: null
    }
    Properties = {
        lang : null,
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
                     'Ctrl','Win','Alt','Space','Alt','←', '↓', '→','Ctrl']; 
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
    KeysSystem = ['MetaLeft','Backspace', 'Tab', 'CapsLock', 'Shift', 'AltRight','AltLeft', 'Space', 'ControlLeft','ControlRight','ShiftLeft','ShiftRight'];
     constructor() {
                    //создаем клавиутуру
                    if (window.localStorage.getItem('lang') == 'en'){
                        this.Properties.lang = 'en';
                        } else {
                        this.Properties.lang = 'ru';
                        }
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
                    document.querySelector('.About').innerText = "Shift+Alt switch lang, OS Win";
                    this._mouseClick();
                    this._keyDown();
                    this._keyUp();
                    this._PropertiesValue();
                    this._switchLang();
                    //this._mouseShiftDown();
                    //this._mouseShiftUp();
                    //this._keyShiftDown(
                    // this._keyShiftUp();
                    //this._keyShiftRightDown();
                    // this._keyShiftRightUp();
            
                    }
                       
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const buttonToBr = [14, 15, 13, 13 ];
        let numStr = 0;
        let count = 0;
        let langs;
        if(this.Properties.lang == 'en') langs = this.KeysValuesEng;
        else langs = this.KeysValuesRu;
        langs.forEach(element => {
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
                switch (event.target.getAttribute('id')) {
                    case "Backspace":
                        if (this.Element.textarea.selectionStart !=0){
                        this.Element.textarea.value = this.Element.textarea.value.slice(0,cursorPositionStart-2)+this.Element.textarea.value.slice(cursorPositionStart-1,this.Element.textarea.length);
                        this.Element.textarea.selectionStart = cursorPositionEnd-2;
                        this.Element.textarea.selectionEnd = cursorPositionEnd-2;
                        break;
                        }

                    case "ArrowRight":
                        this.Element.textarea.selectionStart = cursorPositionEnd;
                        this.Element.textarea.selectionEnd = cursorPositionEnd;
                        break;

                    case "ArrowLeft":
                        this.Element.textarea.selectionStart = cursorPositionEnd-2;
                        this.Element.textarea.selectionEnd = cursorPositionEnd-2;
                        break;

                    case "Delete":
                        this.Element.textarea.value = this.Element.textarea.value.slice(0,cursorPositionStart-1)+this.Element.textarea.value.slice(cursorPositionStart,this.Element.textarea.length);
                        this.Element.textarea.selectionStart = cursorPositionEnd-1;
                        this.Element.textarea.selectionEnd = cursorPositionEnd-1;
                        break;

                    case "Enter":
                        this.Element.textarea.value = this.Element.textarea.value.slice(0,cursorPositionStart-1)+"\r\n"+this.Element.textarea.value.slice(cursorPositionStart-1,this.Element.textarea.length)
                        this.Element.textarea.selectionStart = cursorPositionStart;
                        this.Element.textarea.selectionEnd = cursorPositionEnd;
                        break;

                    case "Tab":
                        this.Element.textarea.value = this.Element.textarea.value.slice(0,cursorPositionStart-1)+"\t"+this.Element.textarea.value.slice(cursorPositionStart-1,this.Element.textarea.length)
                        this.Element.textarea.selectionStart = cursorPositionStart;
                        this.Element.textarea.selectionEnd = cursorPositionEnd;
                        break;

                    case "Space":
                        this.Element.textarea.value = this.Element.textarea.value.slice(0,cursorPositionStart-1)+" "+this.Element.textarea.value.slice(cursorPositionStart-1,this.Element.textarea.length)
                        this.Element.textarea.selectionStart = cursorPositionEnd;
                        this.Element.textarea.selectionEnd = cursorPositionEnd;
                        break;
    
                    default:
                        if(!this.KeysSystem.includes(event.target.getAttribute('id')))
                            this.Element.textarea.value = this.Element.textarea.value.slice(0,cursorPositionStart-1)+event.target.innerText+this.Element.textarea.value.slice(cursorPositionStart-1,this.Element.textarea.length)
                            this.Element.textarea.selectionStart = cursorPositionEnd;
                            this.Element.textarea.selectionEnd = cursorPositionEnd;
                            break;
                } 
                
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
    _PropertiesValue() {
        window.addEventListener('keydown', (event) => {
            if(event.code == "ControlLeft" || event.code == "ControlRight") {
                this.Properties.control = true;
            }
        })
        window.addEventListener('keydown', (event) => {
            if(event.code == "AltLeft" || event.code == "AltRight") {
                this.Properties.alt = true;
                this._switchLang();
            }
        })
        window.addEventListener('keydown', (event) => {
            if(event.code == "ShiftLeft" || event.code == "ShiftRight") {
                this.Properties.shift = true;
                this._switchLang();
            }
        })
        window.addEventListener('keydown', (event) => {
            if(event.code == "CapsLock") {
                this.Properties.caps = true;
            }
        })
        window.addEventListener('keyup', (event) => {
            if (event.code == "ControlLeft" || event.code == "ControlRight"){
                this.Properties.control = false;
            }
        })

        window.addEventListener('keyup', (event) => {
            if (event.code == "AltLeft" || event.code == "AltRight"){
                this.Properties.alt = false;
                this._switchLang();
            } 
        })
        window.addEventListener('keyup', (event) => {
            if (event.code == "ShiftLeft" || event.code == "ShiftRight"){
                this.Properties.shift = false;
                this._switchLang();
            }
        })

        window.addEventListener('keyup', (event) => {
            if (event.code == "CapsLock"){
                this.Properties.caps = false;
            } 
        })
        
    }
    _switchLang() {
        let i = 0;
        if(this.Properties.shift)
            if(this.Properties.alt) 
                if(this.Properties.lang == 'en') 
                {   this.Properties.lang = 'ru';
                    window.localStorage.setItem('lang',this.Properties.lang);
                    document.querySelectorAll(".button").forEach(elem => {
                    elem.innerText = this.KeysValuesRu[i];
                    i++;
                })}
                else    { this.Properties.lang = 'en';
                window.localStorage.setItem('lang',this.Properties.lang);
                    document.querySelectorAll(".button").forEach(elem => {
                    elem.innerText = this.KeysValuesEng[i];
                    i++;})
                }
               // this.Properties.shift = false;
                //this.Properties.alt = false;
    }
    
        
    
}
let arr = new KeyBoard();
