import { configureStore } from '@reduxjs/toolkit';
import { apiTweets} from './api/apiTweets';

const store = configureStore({
  reducer: {
    [apiTweets.reducerPath]: apiTweets.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiTweets.middleware)
});

export default store;