import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {FadeLoader} from "react-spinners"


const EditPost = () => {
  const { id } = useParams(); // Use the correct variable
  const [post, setPost] = useState({ title: '', author: '', content: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8000/posts/${id}`);
        if (!res.ok) {
          throw new Error('Post not found');
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('author', post.author);
    formData.append('content', post.content);

    try {
      const res = await fetch(`http://localhost:8000/edit/${id}`, { // Use the correct variable
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to update post');
      }

      const data = await res.json();
      toast.success('Post updated successfully');
      navigate(`/posts/${id}`); // Use the correct variable
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the post');
    }
  };

  if (loading) return <div> <FadeLoader /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-[900px] mx-auto p-5">
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <label>
        Content:
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          rows="10"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <button type="submit" className="bg-[#7c3aed] px-4 py-2 text-white rounded hover:bg-purple-400">
        Update Post
      </button>
      
    </form>
  );
};

export default EditPost;
