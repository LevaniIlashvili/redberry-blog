import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AddBlogPage from "./pages/AddBlogPage";
import PrivateRoute from "./components/PrivateRoute";
import { BlogPage } from "./pages/BlogPage";

const App = () => {
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
