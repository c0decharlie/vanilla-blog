import shortid from 'shortid';

const MONTH_DICT = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class Helpers {
    static getCurrentDate() {
        let d = new Date();
        let hours = this.correctDate(d.getHours());
        let minutes = this.correctDate(d.getMinutes());
        let seconds = this.correctDate(d.getSeconds());
        let day = this.correctDate(d.getDate());
        let month = MONTH_DICT[d.getMonth()];
        let year = d.getFullYear();

        return hours + ":" + minutes + ":" + seconds + ", " + day + " " + month + " " + year;
    }

    static correctDate(n) {
        return n <= 9 ? '0' + n : n;
    }

    static generateId() {
        return shortid.generate();
    }
}
