class LocalStorageHelper {
    static getLang() {
        return window.localStorage.getItem('lang') || 'en';
    }
    static setLang(val) {
        window.localStorage.setItem('lang', val);
    }
}
export default LocalStorageHelper;