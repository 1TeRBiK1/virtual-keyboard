class KeyBoard {
    Element = {
      AreaKeyBoard: null,
      KeysBoard: null,
      Keys: [],
      About: null,
    }

    Properties = {
      lang: null,
      control: false,
      alt: false,
      caps: false,
      shift: false,
    }

    initial() {
      // создание клавиатуры
      this.Element.AreaKeyBoard = document.createElement('div');
      this.Element.KeysBoard = document.createElement('div');
      // добавление style
      this.Element.AreaKeyBoard.classList.add('klava');
      this.Element.KeysBoard.classList.add('klava');
    }

    KeysValuesEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl'];

    KeysValuesRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
      'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl'];

    KeysValuesEngUp = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
      'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Del',
      'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
      'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl']

    KeysValuesRuUp = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
      'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del',
      'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
      'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl']

    KeysEventCode = [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
      'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

    KeysSystem = ['MetaLeft', 'Backspace', 'Tab', 'CapsLock', 'Shift', 'AltRight', 'AltLeft', 'Space', 'ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight'];

    KeysCaps = ['Tab', 'Backspace', 'CapsLock', 'Shift', 'Space', 'Ctrl', 'Alt', 'Enter', 'Del', 'Win'];

    constructor() {
      // создаем клавиутуру
      if (window.localStorage.getItem('lang') === 'en') {
        this.Properties.lang = 'en';
      } else {
        this.Properties.lang = 'ru';
      }
    }

    init() {
      this.Element.areaKeyBoard = document.createElement('div');
      this.Element.KeysBoard = document.createElement('div');
      this.Element.textarea = document.createElement('textarea');
      this.Element.About = document.createElement('div');
      // добавление css
      this.Element.areaKeyBoard.classList.add('areaKeyBoard');
      this.Element.KeysBoard.classList.add('keysBoard');
      this.Element.textarea.classList.add('textarea');
      this.Element.KeysBoard.appendChild(this.createKeys());
      this.Element.About.classList.add('About');

      // добавить Dom
      this.Element.areaKeyBoard.appendChild(this.Element.KeysBoard);
      document.body.appendChild(this.Element.areaKeyBoard);
      document.body.appendChild(this.Element.textarea);
      document.body.appendChild(this.Element.About);
      document.querySelector('.About').innerText = 'Shift+Alt switch lang, OS Win';
      this.mouseClick();
      this.keyDown();
      KeyBoard.keyUp();
      this.propertiesValue();
      this.switchLang();
      // this.mouseShiftDown();
      // this.mouseShiftUp();
      this.keyShiftDown();
      this.keyShiftUp();
      this.keyCapsDown();
      this.keyCapsUp();
    }

    createKeys() {
      const fragment = document.createDocumentFragment();
      const buttonToBr = [14, 15, 13, 13];
      let numStr = 0;
      let count = 0;
      let langs;
      if (this.Properties.lang === 'en') langs = this.KeysValuesEng;
      else langs = this.KeysValuesRu;
      langs.forEach((element) => {
        count += 1;
        const element1 = document.createElement('button');
        element1.classList.add('button');
        element1.setAttribute('type', 'button');
        element1.innerText = element;
        fragment.appendChild(element1);
        if (buttonToBr[numStr] === count) {
          fragment.appendChild(document.createElement('br'));
          numStr += 1;
          count = 0;
        }
      });

      return fragment;
    }

    mouseClick() {
      document.querySelector('.keysBoard').addEventListener('click', (event) => {
        if (event.target.classList.contains('button')) {
          const elText = this.Element.textarea;
          const curPosStart = elText.selectionEnd + 1;
          const curPosEnd = elText.selectionEnd + 1;
          switch (event.target.getAttribute('id')) {
            case 'Backspace':
              if (elText.selectionStart !== 0) {
                elText.value = elText.value.slice(0, curPosStart - 2)
                 + elText.value.slice(curPosStart - 1, elText.length);
                elText.selectionStart = curPosEnd - 2;
                elText.selectionEnd = curPosEnd - 2;
              }
              break;

            case 'ArrowRight':
              elText.selectionStart = curPosEnd;
              elText.selectionEnd = curPosEnd;
              break;

            case 'ArrowLeft':
              elText.selectionStart = curPosEnd - 2;
              elText.selectionEnd = curPosEnd - 2;
              break;

            case 'Delete':
              elText.value = elText.value.slice(0, curPosStart - 1)
               + elText.value.slice(curPosStart, elText.length);
              elText.selectionStart = curPosEnd - 1;
              elText.selectionEnd = curPosEnd - 1;
              break;

            case 'Enter':
              elText.value = `${elText.value.slice(0, curPosStart - 1)}\r\n${elText.value.slice(curPosStart - 1, elText.length)}`;
              elText.selectionStart = curPosStart;
              elText.selectionEnd = curPosEnd;
              break;

            case 'Tab':
              elText.value = `${elText.value.slice(0, curPosStart - 1)}\t${elText.value.slice(curPosStart - 1, elText.length)}`;
              elText.selectionStart = curPosStart;
              elText.selectionEnd = curPosEnd;
              break;

            case 'Space':
              elText.value = `${elText.value.slice(0, curPosStart - 1)} ${elText.value.slice(curPosStart - 1, elText.length)}`;
              elText.selectionStart = curPosEnd;
              elText.selectionEnd = curPosEnd;
              break;

            default:
              if (!this.KeysSystem.includes(event.target.getAttribute('id'))) { elText.value = elText.value.slice(0, curPosStart - 1) + event.target.innerText + elText.value.slice(curPosStart - 1, elText.length); }
              elText.selectionStart = curPosEnd;
              elText.selectionEnd = curPosEnd;
              break;
          }
        }

        this.Element.textarea.focus();
      });
    }

    keyDown() {
      const buttons = document.querySelectorAll('.button');
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].setAttribute('id', `${this.KeysEventCode[i]}`);
      }
      window.addEventListener('keydown', (event) => {
        const test1 = document.querySelector(`#${event.code}`);
        test1.classList.add('active');
        test1.click();
        event.preventDefault();
        this.Element.textarea.focus();
      });
    }

    static keyUp() {
      window.addEventListener('keyup', (event) => {
        const test = document.querySelector(`#${event.code}`);
        test.classList.remove('active');
      });
    }

    propertiesValue() {
      window.addEventListener('keydown', (event) => {
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
          this.Properties.control = true;
        }
      });
      window.addEventListener('keydown', (event) => {
        if (event.code === 'AltLeft' || event.code === 'AltRight') {
          this.Properties.alt = true;
          this.keyShiftDown();
          this.switchLang();
        }
      });
      window.addEventListener('keydown', (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.Properties.shift = true;
          this.switchLang();
          this.keyShiftDown();
        }
      });
      window.addEventListener('keydown', (event) => {
        if (event.code === 'CapsLock') {
          this.Properties.caps = !this.Properties.caps;
          if (this.Properties.caps) {
            this.keyCapsDown();
          }
        }
      });
      window.addEventListener('keyup', (event) => {
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
          this.Properties.control = false;
        }
      });

      window.addEventListener('keyup', (event) => {
        if (event.code === 'AltLeft' || event.code === 'AltRight') {
          this.Properties.alt = false;
        }
      });
      window.addEventListener('keyup', (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.Properties.shift = false;
          this.switchLang();
          this.keyShiftUp();
        }
      });
    }

    switchLang() {
      let i = 0;
      if (this.Properties.shift) {
        if (this.Properties.alt) {
          if (this.Properties.lang === 'en') {
            this.Properties.lang = 'ru';
            window.localStorage.setItem('lang', this.Properties.lang);
            document.querySelectorAll('.button').forEach((elem) => {
              const temp = elem;
              temp.innerText = this.KeysValuesRu[i];
              i += 1;
            });
          } else {
            this.Properties.lang = 'en';
            window.localStorage.setItem('lang', this.Properties.lang);
            document.querySelectorAll('.button').forEach((elem) => {
              const temp = elem;
              temp.innerText = this.KeysValuesEng[i];
              i += 1;
            });
          }
        }
      }
      if (this.Properties.caps) {
        this.keyCapsDown();
      } else this.keyCapsUp();
    }

    keyShiftDown() {
      let i = 0;
      if (!this.Properties.alt) {
        if (this.Properties.shift) {
          if (this.Properties.lang === 'en') {
            document.querySelectorAll('.button').forEach((elem) => {
              const temp = elem;
              temp.innerText = this.KeysValuesEngUp[i];
              i += 1;
            });
          } else {
            document.querySelectorAll('.button').forEach((elem) => {
              const temp = elem;
              temp.innerText = this.KeysValuesRuUp[i];
              i += 1;
            });
          }
        }
      }
    }

    keyShiftUp() {
      let i = 0;
      if (this.Properties.lang === 'en') {
        document.querySelectorAll('.button').forEach((elem) => {
          const temp = elem;
          temp.innerText = this.KeysValuesEng[i];
          i += 1;
        });
      } else {
        document.querySelectorAll('.button').forEach((elem) => {
          const temp = elem;
          temp.innerText = this.KeysValuesRu[i];
          i += 1;
        });
      }
    }

    keyCapsDown() {
      document.querySelectorAll('.button').forEach((elem) => {
        if (!this.KeysCaps.includes(elem.textContent)) {
          const temp = elem;
          temp.innerText = elem.innerText.toUpperCase();
        }
      });
    }

    keyCapsUp() {
      document.querySelectorAll('.button').forEach((elem) => {
        if (!this.KeysCaps.includes(elem.textContent)) {
          const temp = elem;
          temp.innerText = elem.innerText.toLowerCase();
        }
      });
    }
}

const virBoard = new KeyBoard();
virBoard.init();
