import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import UserRegistration from "./components/UserRegistration";
import Registration from "./components/Registration";
import Options from "./components/Options";
import AdminDashboard from "./components/AdminDashboard";
import UserDetail from "./components/UserDetail";
import SchoolFeesForm from "./components/SchoolFeesForm";
import TravelExpensesForm from "./components/TravelExpensesForm";
import StudyBooksForm from "./components/StudyBooksForm";
import UserHistory from "./components/UserHistory";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import SessionManager from "./components/SessionManager";

// New Pages
import AboutUs from "./components/pages/AboutUs";
import Contact from "./components/pages/Contact";
import HowToApply from "./components/pages/HowToApply";
import FAQ from "./components/pages/FAQ";
import Partners from "./components/pages/Partners";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import ProfilePage from "./components/ProfilePage";

// Utility to check token validity
const isTokenValid = () => {
  const token = localStorage.getItem("token");
  // If using JWT, decode and check expiry here
  return !!token;
};

// User-only route component
const UserRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  if (!isTokenValid()) return <Navigate to="/login" replace />;
  if (userRole === "admin") return <Navigate to="/admin" replace />;
  return children;
};

// Admin-only route component
const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  if (!isTokenValid()) return <Navigate to="/login" replace />;
  if (userRole !== "admin") return <Navigate to="/options" replace />;
  return children;
};

// App Component with Layout
function App() {
  return (
    <Router>
      <SessionManager />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Routes>
          {/* Auth routes without the navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegistration />} />

          {/* Routes with persistent navigation */}
          <Route element={<Layout />}>
            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* Public Information Pages */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-to-apply" element={<HowToApply />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* User registration flow */}
            <Route path="/registration" element={<Registration />} />

            {/* User-only routes */}
            <Route
              path="/options"
              element={
                <UserRoute>
                  <Options />
                </UserRoute>
              }
            />
            <Route
              path="/history"
              element={
                <UserRoute>
                  <UserHistory />
                </UserRoute>
              }
            />
            <Route
              path="/apply/school-fees"
              element={
                <UserRoute>
                  <SchoolFeesForm />
                </UserRoute>
              }
            />
            <Route
              path="/apply/travel-expenses"
              element={
                <UserRoute>
                  <TravelExpensesForm />
                </UserRoute>
              }
            />
            <Route
              path="/apply/study-books"
              element={
                <UserRoute>
                  <StudyBooksForm />
                </UserRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <UserRoute>
                  <ProfilePage />
                </UserRoute>
              }
            />

            {/* Admin-only routes */}
            <Route
              path="/admin/users/:id"
              element={
                <AdminRoute>
                  <UserDetail />
                </AdminRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
