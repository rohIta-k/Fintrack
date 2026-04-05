# 💰 FinTrack – Smart Personal Finance Dashboard

## 🚀 Overview
**FinTrack** is a modern personal finance dashboard that helps users track, analyze, and optimize their financial activity. It provides a unified view of income, expenses, savings, and spending patterns through interactive charts and insights.

---

## 📸 Screenshots

### 📊 Dashboard
![Dashboard Screenshot](./screenshots/dashboard.png)

### 📈 Reports & Insights
![Reports Screenshot](./screenshots/reports.png)

### 💳 Transactions
![Transactions Screenshot](./screenshots/transactions.png)

---

## ✨ Features

### 📊 Dashboard
- Total balance, income, and expense overview  
- Monthly balance trend visualization  
- Category-wise spending breakdown 

---

### 📈 Reports & Insights
- Top spending category  
- Highest spending month  
- Longest expense streak  
- Average monthly savings  
- Category trends chart  
- Income vs Expense comparison  

---

### 💳 Transactions
- Paginated transaction table  
- Advanced filters (search, category, type, date, amount)  
- Admin features:
  - Add transaction  
  - Edit transaction  

---

## 🎨 UI/UX Highlights
- Clean fintech-inspired design  
- Fully responsive  
- Dark mode support  
- Skeleton loading states  
- Interactive charts  

---

## 🧠 Core Concepts
- Data analytics & transformation  
- React hooks & state management  
- Mock API simulation  
- Component-based architecture  
- Data visualization (Recharts)  

---

## 📁 Project Structure
```
fintrack/
├── 📁 src/                      
│   ├── 📁 app/                  
│   │   ├── 📄 App.jsx           
│   │   ├── 📄 main.jsx           
│   │   └── 📄 routes.jsx         
│   ├── 📁 assets/                
│   ├── 📁 components/            
│   │   └── 📁 layout/            # Layout components (Navbar)
│   ├── 📁 constants/             # Global constants (colors, categories)
│   ├── 📁 context/               # React Context Providers (Theme, Role)
│   ├── 📁 data/                  # Mock/Sample data (transactions.json)
│   ├── 📁 features/              
│   │   ├── 📁 dashboard/         # Dashboard logic and charts
│   │   ├── 📁 reports/           # Analytics and insight cards
│   │   └── 📁 transactions/      # Documentation history and tables
│   ├── 📁 hooks/                 
│   ├── 📁 services/              # API interaction layer
│   ├── 📁 styles/                # Global CSS and Tailwind directives
│   └── 📁 utils/                 # Formatting and analytical utilities
├── 📄 eslint.config.js           
├── 📄 index.html                 
├── 📄 package.json               
├── 📄 postcss.config.js          
├── 📄 tailwind.config.js        
└── 📄 vite.config.js             
```
---

## ⚙️ Tech Stack
- Frontend: React + Tailwind CSS
- Charts: Recharts
- State Management: React Hooks
- Data Layer: Mock APIs (simulated backend)

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js**: Version 18.0 or higher
-   **Package Manager**: `npm` (v9+)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/rohIta-k/Fintrack.git
    cd Fintrack
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:5173` to view the application.

---
