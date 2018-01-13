import Vue from 'vue';
import ConfirmCom from './confirm.vue';

const Confirm = Vue.extend(ConfirmCom);

let instance;

export default {
    show(options) {
        var prop;
        if (!instance) {
            instance = new Confirm({
                el: document.createElement('div'),
            });
        }
        if (instance.isShow) return;
        instance.isShow = true;
        /* eslint-disable no-restricted-syntax */
        /* eslint-disable no-prototype-builtins */
        for (prop in options) {
            if (options.hasOwnProperty(prop)) {
                instance[prop] = options[prop];
            }
        }
        instance.hideCallback = function callback(isShow) {
            instance.isShow = isShow;
        };
        document.body.appendChild(instance.$el);

        Vue.nextTick(() => {
            instance.isShow = true;
        });
    },
    close() {
        if (instance) {
            instance.isShow = false;
        }
    },
};
