import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AddBlogPage from "./pages/AddBlogPage";
import PrivateRoute from "./components/PrivateRoute";

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
      </Routes>
    </Router>
  );
};

export default App;
