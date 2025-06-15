"use client"

import type React from "react"

const TestApp: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>🎉 SwasthyaAI Test Page</h1>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#0066cc" }}>✅ React is Working!</h2>
        <p>If you can see this page, React is properly set up.</p>
        <ul>
          <li>✅ Vite development server is running</li>
          <li>✅ React components are rendering</li>
          <li>✅ TypeScript is compiling</li>
        </ul>
        <button
          onClick={() => alert("Button clicked! JavaScript is working.")}
          style={{
            backgroundColor: "#0066cc",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  )
}

export default TestApp
