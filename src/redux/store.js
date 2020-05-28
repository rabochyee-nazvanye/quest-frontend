import {combineReducers, createStore, applyMiddleware} from "redux";
import { createLogger } from 'redux-logger'
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from "./Reducers/AuthReducer";
import questsReducer from './Reducers/QuestsReducer'
import applicationReducer from './Reducers/ApplicationReducer'
import questsListReducer from './Reducers/QuestsListReducer'
import questRegistrationReducer from './Reducers/QuestRegistrationReducer'
import teamListReducer from "./Reducers/TeamListReducer";

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    authReducer,
    questsReducer,
    applicationReducer,
    questsListReducer,
    questRegistrationReducer,
    teamListReducer
});

export const store = createStore(
    rootReducer,
    composeWithDevTools
    (
        applyMiddleware
        (
            thunkMiddleware,
            loggerMiddleware
        )
    )
);
