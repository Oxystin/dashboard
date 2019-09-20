import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import KeplerGlSchema from 'kepler.gl/schemas';
import { taskMiddleware } from 'react-palm/tasks';

let previousValue = null;

// Rates limit and only runs the latest call
function RateLimit(fn, delay, context) {
    let latestCall = null;
    let timer = null;

    function processLatestCall() {
    if (latestCall) {
        fn.apply(latestCall.context, latestCall.arguments);
        clearInterval(timer);
        timer = null;
    }
    }
    return function limited(...args) {
    latestCall = {
        context: context || this,
        arguments: [].slice.call(args),
    };
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(processLatestCall, delay);
    };
}

function updateConfigControl(store, setControlValue) {
    const keplerState = Object.values(store.getState().keplerGl)[0];
    const stateToSave = KeplerGlSchema.getConfigToSave(keplerState);
    const config = JSON.stringify(stateToSave, null, 2);
    if (previousValue !== config) {
    setControlValue('config', config);
    previousValue = config;
    }
}
const rateLimitedUpdateConfigControl = RateLimit(updateConfigControl, 1000);

export default function getKeplerStore(setControlValue) {
    // Using react-palm middleware to intercept changes and
    // save the state into the config control as text
    const stateChangeMiddleware = store => next => (action) => {
    const returnValue = next(action);
    rateLimitedUpdateConfigControl(store, setControlValue);
    return returnValue;
    };
    const reducers = combineReducers({
    keplerGl: keplerGlReducer,
    readonly: false,
    });
    const middlewares = [taskMiddleware, stateChangeMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const store = createStore(reducers, {}, compose(...enhancers));
    return store;
}