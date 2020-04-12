import * as constants from './constants/constants.js';
import LocalStorageHelper from './helpers/localStorageHelper.js';

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

    constructor() {
      this.Properties.lang = LocalStorageHelper.getLang();
      this.initialHTMLcontainer();
      this.mouseClick();
      this.keyDown();
      this.propertiesValue();
      this.switchLang();
      this.keyShiftDown();
      this.keyShiftUp();
      KeyBoard.keyUp();
      this.keyCapsDown();
    }

    initialHTMLcontainer() {
      this.Element.areaKeyBoard = document.createElement('div');
      this.Element.KeysBoard = document.createElement('div');
      this.Element.textarea = document.createElement('textarea');
      this.Element.About = document.createElement('div');

      this.Element.areaKeyBoard.classList.add('areaKeyBoard');
      this.Element.KeysBoard.classList.add('keysBoard');
      this.Element.textarea.classList.add('textarea');
      this.Element.KeysBoard.appendChild(this.createKeys());
      this.Element.About.classList.add('About');

      this.Element.areaKeyBoard.appendChild(this.Element.KeysBoard);
      document.body.appendChild(this.Element.areaKeyBoard);
      document.body.appendChild(this.Element.textarea);
      document.body.appendChild(this.Element.About);

      document.querySelector('.About').innerText = 'Shift+Alt switch lang, OS Win';
    }

    createKeys() {
      const fragment = document.createDocumentFragment();
      const numButtonToBr = [constants.NUM_BUTTON_FIRST_LINE, constants.NUM_BUTTON_SECOND_LINE,
        constants.NUM_BUTTON_THIRD_LINE, constants.NUM_BUTTON_FOURTH_LINE];
      let numLineBoard = 0;
      let countElement = 0;
      let langBoard;
      if (this.Properties.lang === constants.SELECTED_LANG_EN) {
        langBoard = constants.KEYS_VALUES_EN;
      } else {
        langBoard = constants.KEYS_VALUES_RU;
      }
      langBoard.forEach((element) => {
        countElement += 1;
        const elementButton = document.createElement('button');
        elementButton.classList.add('button');
        elementButton.setAttribute('type', 'button');
        elementButton.innerText = element;
        fragment.appendChild(elementButton);
        if (numButtonToBr[numLineBoard] === countElement) {
          fragment.appendChild(document.createElement('br'));
          numLineBoard += 1;
          countElement = 0;
        }
      });

      return fragment;
    }

    mouseClick() {
      document.querySelector('.keysBoard').addEventListener('click', (event) => {
        if (event.target.classList.contains('button')) {
          const elemTextarea = this.Element.textarea;
          const textareaLength = elemTextarea.length;
          const cursorPositionStart = elemTextarea.selectionEnd + 1;
          const cursorPositionEnd = elemTextarea.selectionEnd + 1;
          const textCurLeft = elemTextarea.value.slice(0, cursorPositionStart - 1);
          const textCurRight = elemTextarea.value.slice(cursorPositionStart - 1, textareaLength);
          switch (event.target.getAttribute('id')) {
            case constants.BACKSPACE:
              if (elemTextarea.selectionStart !== 0) {
                elemTextarea.value = elemTextarea.value.slice(0, cursorPositionStart - 2)
                 + elemTextarea.value.slice(cursorPositionStart - 1, textareaLength);
                elemTextarea.selectionStart = cursorPositionEnd - 2;
                elemTextarea.selectionEnd = cursorPositionEnd - 2;
              }
              break;
            case constants.CAPSLOCK:
              this.Properties.caps = !this.Properties.caps;
              this.keyCapsDown();
              break;
            case constants.SHIFT_LEFT:
              this.Properties.shift = !this.Properties.shift;
              if (this.Properties.shift) { this.keyShiftDown(); } else { this.keyShiftUp(); }
              break;
            case constants.SHIFT_RIGHT:
              this.Properties.shift = !this.Properties.shift;
              if (this.Properties.shift) { this.keyShiftDown(); } else { this.keyShiftUp(); }
              break;
            case constants.ARROW_RIGTH:
              elemTextarea.selectionStart = cursorPositionEnd;
              elemTextarea.selectionEnd = cursorPositionEnd;
              break;

            case constants.ARROW_LEFT:
              elemTextarea.selectionStart = cursorPositionEnd - 2;
              elemTextarea.selectionEnd = cursorPositionEnd - 2;
              break;

            case constants.DELETE:
              elemTextarea.value = textCurLeft
               + elemTextarea.value.slice(cursorPositionStart, textareaLength);
              elemTextarea.selectionStart = cursorPositionEnd - 1;
              elemTextarea.selectionEnd = cursorPositionEnd - 1;
              break;

            case constants.ENTER:
              elemTextarea.value = `${textCurLeft}\r\n${textCurRight}`;
              elemTextarea.selectionStart = cursorPositionStart;
              elemTextarea.selectionEnd = cursorPositionEnd;
              break;

            case constants.TAB:
              elemTextarea.value = `${textCurLeft}\t${textCurRight}`;
              elemTextarea.selectionStart = cursorPositionStart;
              elemTextarea.selectionEnd = cursorPositionEnd;
              break;

            case constants.SPACE:
              elemTextarea.value = `${textCurLeft} ${textCurRight}`;
              elemTextarea.selectionStart = cursorPositionEnd;
              elemTextarea.selectionEnd = cursorPositionEnd;
              break;

            default:
              if (!(constants.KEYS_SYSTEM.includes(event.target.getAttribute('id')))) {
                elemTextarea.value = textCurLeft + event.target.innerText + textCurRight;
                elemTextarea.selectionStart = cursorPositionEnd;
                elemTextarea.selectionEnd = cursorPositionEnd;
              }
              break;
          }
        }

        this.Element.textarea.focus();
      });
    }

    keyDown() {
      const buttons = document.querySelectorAll('.button');
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].setAttribute('id', `${constants.KEYS_EVENT_CODE[i]}`);
      }
      window.addEventListener('keydown', (event) => {
        const elem = document.querySelector(`#${event.code}`);
        if (constants.KEYS_EVENT_CODE.includes(event.code)) {
          elem.classList.add('active');
          elem.click();
          event.preventDefault();
          this.Element.textarea.focus();
        }
      });
    }

    static keyUp() {
      window.addEventListener('keyup', (event) => {
        const test = document.querySelector(`#${event.code}`);
        if (constants.KEYS_EVENT_CODE.includes(event.code)) {
          test.classList.remove('active');
        }
      });
    }

    propertiesValue() {
      window.addEventListener('keydown', (event) => {
        if (event.code === constants.CONTROL_LEFT || event.code === constants.CONTROL_RIGHT) {
          this.Properties.control = true;
        }
      });
      window.addEventListener('keydown', (event) => {
        if (event.code === constants.ALT_LEFT || event.code === constants.ALT_RIGHT) {
          this.Properties.alt = true;
          this.switchLang();
          this.keyCapsDown();
          this.keyShiftDown();
        }
      });
      window.addEventListener('keydown', (event) => {
        if (event.code === constants.SHIFT_LEFT || event.code === constants.SHIFT_RIGHT) {
          this.Properties.shift = true;
          this.switchLang();
          this.keyCapsDown();
          this.keyShiftDown();
        }
      });

      window.addEventListener('keyup', (event) => {
        if (event.code === constants.CONTROL_LEFT || event.code === constants.CONTROL_RIGHT) {
          this.Properties.control = false;
        }
      });

      window.addEventListener('keyup', (event) => {
        if (event.code === constants.ALT_LEFT || event.code === constants.ALT_RIGHT) {
          this.Properties.alt = false;
        }
      });
      window.addEventListener('keyup', (event) => {
        if (event.code === constants.SHIFT_LEFT || event.code === constants.SHIFT_RIGHT) {
          this.Properties.shift = false;
          this.switchLang();
          this.keyShiftUp();
          this.keyCapsDown();
        }
      });
    }

    switchLang() {
      if (this.Properties.shift) {
        if (this.Properties.alt) {
          if (this.Properties.lang === constants.SELECTED_LANG_EN) {
            this.Properties.lang = constants.SELECTED_LANG_RU;
            LocalStorageHelper.setLang(this.Properties.lang);
            document.querySelectorAll('.button').forEach((elem, buttonIndex) => {
              const button = elem;
              button.innerText = constants.KEYS_VALUES_RU[buttonIndex];
            });
          } else {
            this.Properties.lang = constants.SELECTED_LANG_EN;
            LocalStorageHelper.setLang(this.Properties.lang);
            document.querySelectorAll('.button').forEach((elem, buttonIndex) => {
              const button = elem;
              button.innerText = constants.KEYS_VALUES_EN[buttonIndex];
            });
          }
        }
      }
    }

    keyShiftDown() {
      if (this.Properties.shift) {
        if (this.Properties.lang === constants.SELECTED_LANG_EN) {
          document.querySelectorAll('.button').forEach((elem, buttonIndex) => {
            const button = elem;
            button.innerText = constants.KEYS_VALUES_ENG_UP[buttonIndex];
          });
        } else {
          document.querySelectorAll('.button').forEach((elem, buttonIndex) => {
            const button = elem;
            button.innerText = constants.KEYS_VALUES_RU_UP[buttonIndex];
          });
        }
      }
    }


    keyShiftUp() {
      if (this.Properties.lang === constants.SELECTED_LANG_EN) {
        document.querySelectorAll('.button').forEach((elem, buttonIndex) => {
          const button = elem;
          button.innerText = constants.KEYS_VALUES_EN[buttonIndex];
        });
      } else {
        document.querySelectorAll('.button').forEach((elem, buttonIndex) => {
          const button = elem;
          button.innerText = constants.KEYS_VALUES_RU[buttonIndex];
        });
      }
    }


    keyCapsDown() {
      if (this.Properties.caps) {
        document.querySelectorAll('.button').forEach((elem) => {
          if (!constants.KEYS_CAPS.includes(elem.textContent)) {
            const button = elem;
            button.innerText = elem.innerText.toUpperCase();
          }
        });
      } else {
        document.querySelectorAll('.button').forEach((elem) => {
          if (!constants.KEYS_CAPS.includes(elem.textContent)) {
            const button = elem;
            button.innerText = elem.innerText.toLowerCase();
          }
        });
      }
    }
}


const virBoard = new KeyBoard();
virBoard.createKeys();
