import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import Header from "./components/Header";
import Layout from "./components/Layout";
import Post from "./components/Post";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CreatePost from "./Pages/CreatePost";
import PostDetails from "./Pages/PostDetails";
import EditPost from "./Pages/EditPost";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/posts" element={<Post />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
