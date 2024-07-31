import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // Import the custom hook

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Use the context

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

  const editPost = (id) => {
    navigate(`/edit/${id}`);
  };

  const deletePost = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/delete/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPost(null);
        toast.success("Post deleted");
        navigate("/");
      } else {
        toast.error("Failed to delete post");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the post");
      console.error("Error: ", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <>
      <Link to="/">    <p className='text-blue-600 mt-[-20px] mb-4 text-2xl'>← <span className='text-lg'>back</span>  </p>    </Link>
      <div className="max-w-[900px] mx-auto p-5">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <img src={`data:image/jpeg;base64,${post.image}`} alt="" className="sm:h-[100vh] w-full mb-4 h-[70vh]" />
        <p className="text-lg text-wrap break-words  hyphens-auto">{stripHtml(post.content)}</p>
        <p className="text-sm text-gray-500 mt-4">
          <span className="font-bold">Author:</span> {post.author}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-bold">Posted on:</span> {new Date(post.createdAt).toLocaleString()}
        </p>
        {
          isLoggedIn && 
          <div className="flex justify-end items-center gap-4 mt-11 sm:mt-3">
            <button className="bg-[#7c3aed] px-2 py-1 text-white rounded-sm hover:bg-purple-400" onClick={() => editPost(post._id)}>Edit</button>
            <button className="bg-[#dc2626] px-2 py-1 text-white rounded-sm hover:bg-red-400" onClick={() => deletePost(post._id)}>Delete</button>
          </div>
        }
      </div>
    </>
  );
};

export default PostDetails;
