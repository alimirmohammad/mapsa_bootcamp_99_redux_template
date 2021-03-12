import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer
  },
});
