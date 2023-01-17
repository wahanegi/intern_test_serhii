import { configureStore } from '@reduxjs/toolkit';
import { apiTwits} from './api/apiTwits';

const store = configureStore({
  reducer: {
    [apiTwits.reducerPath]: apiTwits.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiTwits.middleware)
});

export default store;