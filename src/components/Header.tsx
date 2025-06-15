"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Heart, Menu, X, Globe, AlertTriangle, User, MessageCircle, ChevronDown, LogOut, Phone } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useLanguage } from "../contexts/LanguageContext"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const { language, toggleLanguage, t } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
    setIsProfileDropdownOpen(false)
  }

  // Different nav items for authenticated and non-authenticated users
  const navItems = isAuthenticated
    ? [
        { key: "symptom_checker", path: "/symptom-checker", icon: MessageCircle },
        { key: "emergency", path: "/emergency", icon: AlertTriangle, className: "text-red-600 hover:text-red-700" },
        { key: "dashboard", path: "/dashboard", icon: null },
        { key: "medications", path: "/medications", icon: null },
        { key: "mediaware", path: "/education", icon: null },
        { key: "medicollab", path: "/medicollab", icon: null },
        { key: "mediconnect", path: "/mediconnect", icon: null },
      ]
    : [
        { key: "home", path: "/", icon: null },
        { key: "symptom_checker", path: "/symptom-checker", icon: MessageCircle },
        { key: "emergency", path: "/emergency", icon: AlertTriangle, className: "text-red-600 hover:text-red-700" },
        { key: "mediaware", path: "/education", icon: null },
        { key: "medicollab", path: "/medicollab", icon: null },
        { key: "mediconnect", path: "/mediconnect", icon: null },
        { key: "contact", path: "/contact", icon: null },
      ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t("swasthyaai")}</h1>
              <p className="text-xs text-gray-600">{t("tagline")}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.className || "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{t(item.key)}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons & Language Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "हिं" : "EN"}</span>
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-bold"
                >
                  <User className="h-4 w-4" />
                  <span>{t("profile")}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>{t("view_profile")}</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Phone className="h-4 w-4" />
                      <span>{t("contact")}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("logout")}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t("register")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.className || "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{t(item.key)}</span>
                </Link>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === "en" ? "हिं" : "EN"}</span>
                </button>

                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>{t("profile")}</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center space-x-2 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="h-4 w-4" />
                      <span>{t("contact")}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("logout")}</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="text-blue-600 px-3 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("login")}
                    </Link>
                    <Link
                      to="/register"
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("register")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
