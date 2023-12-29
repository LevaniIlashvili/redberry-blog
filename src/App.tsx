import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AddBlogPage from "./pages/AddBlogPage";
import PrivateRoute from "./components/PrivateRoute";
import { BlogPage } from "./pages/BlogPage";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import axios from "axios";
import { setBlogs } from "./app/redux/blogs/blogs";

const App = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogs.blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (blogs.length) return;
      try {
        const res = await axios.get(
          "https://api.blog.redberryinternship.ge/api/blogs",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );
        console.log(res);
        dispatch(setBlogs(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/add-blog"
          element={
            <PrivateRoute>
              <AddBlogPage />
            </PrivateRoute>
          }
        />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
