/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",     
        secondary: "#1e293b",    
        accent: "#10b981",      
        danger: "#ef4444",      
        neutral: "#3b82f6"       
      }
    },
  },
  plugins: [],
}