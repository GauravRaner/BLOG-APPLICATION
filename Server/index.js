import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './Models/User.js';
import { Post } from './Models/Post.js';
import bcrypt from 'bcrypt';
import multer from 'multer';

const app = express();
app.use(cors());
app.use(express.json());


const PORT = 8000;




mongoose.connect("mongodb://127.0.0.1:27017/BLOG-APP")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userDoc = await User.create({ username, email, password: hashedPassword });
  res.json(userDoc);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    res.status(400).json({ error: "Invalid credentials" });
  } else {
    res.json({ msg: "Login Successful" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
});

app.post("/posts", upload.single('image'), async (req, res) => {
  const { title, author, content } = req.body;
  const image = req.file ? req.file.buffer.toString('base64') : null;
  try {
    const postDoc = await Post.create({ title, author, content, image });
    res.status(201).json(postDoc);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while creating the post" });
  }
});

app.get("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const postDetails = await Post.findById(postId);

    if (!postDetails) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(postDetails);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching the post" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const dltPost = await Post.findByIdAndDelete(postId);
    if (!dltPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while deleting the post" });
  }
});


app.put("/edit/:id", upload.single('image'), async (req, res) => {
  const postId = req.params.id;
  const { title, author, content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, { title, author, content }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while updating the post" });
  }
});


  

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
