"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Heart, Phone, Mail, AlertTriangle } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

const Footer: React.FC = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-2xl font-bold">{t("swasthyaai")}</h3>
                <p className="text-gray-400 text-sm">{t("tagline")}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              SwasthyaAI bridges the critical gap between symptom onset and appropriate medical care, empowering users
              with AI-powered health insights and connecting them to healthcare professionals.
            </p>

            {/* Emergency Button */}
            <Link
              to="/emergency"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>{t("emergency_support")}</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/symptom-checker" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t("symptom_checker")}
                </Link>
              </li>
              <li>
                <Link to="/mediconnect" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t("mediconnect")}
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t("mediaware")}
                </Link>
              </li>
              <li>
                <Link to="/medicollab" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t("medicollab")}
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t("emergency")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Quick Form */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("contact_us")}</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">support@swasthyaai.com</span>
              </div>
            </div>

            {/* Quick Query Form */}
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-blue-400 focus:outline-none"
              />
              <textarea
                placeholder="Quick query..."
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-blue-400 focus:outline-none resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Query
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SwasthyaAI. All rights reserved. Built for Tutedude's Buildathon 1.0
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
