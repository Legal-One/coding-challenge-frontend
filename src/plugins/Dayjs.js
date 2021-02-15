import Vue from 'vue';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat)

Object.defineProperties(Vue.prototype, {
    $date: {
        get() {
            return dayjs
        }
    }
});
