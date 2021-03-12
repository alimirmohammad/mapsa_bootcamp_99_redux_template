import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { increment } from '../counter/counterSlice';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  return posts;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.unshift(action.payload);
      },
      prepare(author, title) {
        return {
          payload: {
            id: nanoid(),
            author,
            title,
            description: 'You can mutate!',
            url:
              'https://gizmodo.com/5-reasons-to-ditch-gmail-for-protonmail-1846415409',
            urlToImage:
              'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/mbi3uuqd20uudegkvvyq.jpg',
            publishedAt: new Date().toISOString()
          }
        };
      }
    }
  },

  extraReducers: {
    [increment]: (state, action) => {
      state.posts.shift();
    },
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    }
  }
});

export const selectAllPosts = state => state.posts.posts;

export const {
  addPost,
  fetchStart,
  fetchFail,
  fetchSuccess
} = postsSlice.actions;



export default postsSlice.reducer;
