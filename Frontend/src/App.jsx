import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import UserRegistration from "./components/user/UserRegistration";
import Registration from "./components/user/Registration";
import Options from "./components/pages/Options";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDetail from "./components/user/UserDetail";
import ViewRecords from "./components/admin/ViewRecords";
import AllApplications from "./components/admin/AllApplications";
import SchoolFeesForm from "./components/user/SchoolFeesForm";
import TravelExpensesForm from "./components/user/TravelExpensesForm";
import StudyBooksForm from "./components/user/StudyBooksForm";
import UserHistory from "./components/user/UserHistory";
import Home from "./components/pages/Home";
import Layout from "./components/pages/Layout";
import Navbar from "./components/pages/Navbar";
import SessionManager from "./components/user/SessionManager";

// New Pages
import AboutUs from "./components/pages/AboutUs";
import Contact from "./components/pages/Contact";
import HowToApply from "./components/pages/HowToApply";
import FAQ from "./components/pages/FAQ";
import Partners from "./components/pages/Partners";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import ProfilePage from "./components/user/ProfilePage";

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
              path="/admin/add-beneficiary"
              element={
                <AdminRoute>
                  <Registration/>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/view-records"
              element={
                <AdminRoute>
                  <ViewRecords />
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
            <Route
              path="/admin/all-applications"
              element={
                <AdminRoute>
                  <AllApplications />
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
