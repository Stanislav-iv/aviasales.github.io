import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducerFilter } from './ReducerFilter'
const rootReducer = combineReducers({
  filter: reducerFilter,
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
