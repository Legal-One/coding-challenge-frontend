import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'

const persistConfig = {
  key: 'root',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const endpoint = 'http://localhost:8000'
let store = createStore(
  persistedReducer,
  applyMiddleware(thunk.withExtraArgument(endpoint))
)

store.subscribe(() => {
  console.log("console from store >>>",store.getState())
})

let persistor = persistStore(store)

const getStore = () => {
  return { store, persistor }
}

export default getStore
