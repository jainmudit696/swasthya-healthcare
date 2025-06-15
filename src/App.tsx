import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import ErrorBoundary from "./components/ErrorBoundary"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SymptomChecker from "./pages/SymptomChecker"
import EmergencyPage from "./pages/EmergencyPage"
import ContactPage from "./pages/ContactPage"
import EducationPage from "./pages/EducationPage"
import MediCollabPage from "./pages/MediCollabPage"
import MediConnectPage from "./pages/MediConnectPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import MedicationsPage from "./pages/MedicationsPage"

// Configure future flags for React Router
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router {...router}>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/symptom-checker" element={<SymptomChecker />} />
                  <Route path="/emergency" element={<EmergencyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/education" element={<EducationPage />} />
                  <Route path="/medicollab" element={<MediCollabPage />} />
                  <Route path="/mediconnect" element={<MediConnectPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/medications" element={<MedicationsPage />} />
                </Routes>
              </main>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App
