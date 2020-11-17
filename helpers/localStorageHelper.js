import * as constants from '../constants/constants.js';

class LocalStorageHelper {
  static getLang() {
    return window.localStorage.getItem(constants.SELECTED_LANG) || constants.SELECTED_LANG_EN;
  }

  static setLang(val) {
    window.localStorage.setItem(constants.SELECTED_LANG, val);
  }
}
export default LocalStorageHelper;
