import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/auth/RegisterPage";
import Login from "./pages/auth/LoginPage";
import { PublicRoute } from "./utils/protectors/PublicRoute";
import { ProtectedRoute } from "./utils/protectors/ProtectedRoute";
import Feed from "./pages/user/Feed";
import Settings from "./pages/user/Settings";
import MyArticlesFeed from "./pages/user/MyArticlesFeed";
import ScrollToTop from "./utils/ScrollToTop";
import CreateArticle from "./pages/user/CreateArticle";
import EditArticle from "./pages/user/EditArticle";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/register"
          element={<PublicRoute element={<Register />} />}
        />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />

        {/* Protected Routes */}
        <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<Settings />} />}
        />
        <Route
          path="/my-articles"
          element={<ProtectedRoute element={<MyArticlesFeed />} />}
        />
        <Route
          path="/create-article"
          element={<ProtectedRoute element={<CreateArticle />} />}
        />

        <Route
          path="/edit-article/:articleId"
          element={<ProtectedRoute element={<EditArticle />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
