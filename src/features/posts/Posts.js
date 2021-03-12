import { useDispatch, useSelector } from 'react-redux';
import { addPost, fetchPosts, selectAllPosts } from './postsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';

const Posts = () => {
  const allPosts = useSelector(selectAllPosts);
  const status = useSelector(state => state.posts.status);
  const dispatch = useDispatch();
  const addNewPost = () => {
    dispatch(addPost('Ali', 'James Bond'));
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <ul>
      <button onClick={addNewPost}>Add</button>
      {status === 'loading' ? (
        <h2>Loading...</h2>
      ) : (
        allPosts.map(post => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.author}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default Posts;
