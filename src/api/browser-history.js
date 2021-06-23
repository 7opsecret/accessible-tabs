// Service(s):
import { PubSubServices } from '../services/pub-sub';

// Util(s):
import { isFunction } from '~/src/utils/assert';

// Local Config(s):
const POPSTATE_EVENT_NAME = 'popstate';

export const BrowserHistoryApi = (() => {
    const getState = () => history.state;

    const pushState = (...args) => history.pushState(...args);

    const addEventListener = (callback) => {
        if(!isFunction(callback)) {
            return;
        }

        PubSubServices.subscribe(POPSTATE_EVENT_NAME, callback);
    };

    const _popStateCallback = (event) => {
        PubSubServices.publish(POPSTATE_EVENT_NAME, event);
    }

    const _init = () => {
        window.addEventListener(
            POPSTATE_EVENT_NAME,
            _popStateCallback
        );
    }

    _init();

    return {
        pushState,
        getState,
        addEventListener
    };
})();