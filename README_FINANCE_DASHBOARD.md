# 💰 Finance Dashboard - Complete Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Your dashboard will be available at `http://localhost:5173` (or the port shown in terminal)

### 3. Build for Production
```bash
npm run build
```

---

## ✨ Features Implemented

### Core Dashboard
- ✅ **Summary Cards** - Total Balance, Income, Expenses with icons and color coding
- ✅ **Monthly Trend Chart** - Line chart showing income vs expenses over time
- ✅ **Spending by Category** - Pie chart visualization
- ✅ **Transaction List** - Responsive table/card view with sorting and filtering

### Advanced Filtering & Sorting
- ✅ Search transactions by category
- ✅ Filter by: Category, Type (Income/Expense)
- ✅ Sort by: Date, Amount (Ascending/Descending)
- ✅ Export transactions to CSV
- ✅ Responsive design (Mobile + Desktop)

### Role-Based Features
- ✅ **Viewer Mode** - Read-only access to all data
- ✅ **Admin Mode** - Can add and delete transactions
- ✅ Add Transaction Modal with form validation
- ✅ Delete transaction with confirmation

### Analytics & Insights
- ✅ Top spending category
- ✅ Savings rate calculation
- ✅ Monthly income growth
- ✅ Summary statistics (average expense/income, total transactions)

### UI/UX Features
- ✅ Dark mode toggle
- ✅ LocalStorage persistence (transactions, role, dark mode)
- ✅ Smooth transitions and hover effects
- ✅ Icons from Lucide React
- ✅ Mobile-responsive grid layouts
- ✅ Color-coded category badges
- ✅ Gradient backgrounds and borders

### Modern Stack
- ✅ **React 19** - Latest with functional components
- ✅ **Vite** - Lightning-fast build tool
- ✅ **Tailwind CSS v3** - Utility-first styling
- ✅ **Zustand** - Lightweight state management with localStorage persistence
- ✅ **Recharts** - Beautiful chart library
- ✅ **Lucide React** - Professional icons

---

## 📁 Project Structure

```
src/
├── components/
│   ├── SummaryCards.jsx      # Balance, Income, Expenses cards
│   ├── Charts.jsx            # Line & Pie charts
│   ├── Transactions.jsx      # Transaction table/cards
│   ├── FilterBar.jsx         # Search, filters, export
│   ├── RoleSwitcher.jsx      # Role toggle, dark mode, add btn
│   ├── Insights.jsx          # Analytics & smart insights
│   └── Modal.jsx             # Add transaction form
├── store/
│   └── useStore.js           # Zustand store with localStorage
├── data.js                   # Mock data & category colors
├── utils.js                  # Helper functions
├── App.jsx                   # Main app layout
├── main.jsx                  # React entry point
├── index.css                 # Tailwind directives
└── ...
```

---

## 🎯 How to Use

### As a Viewer
1. Browse all transactions
2. Search by category
3. Filter by type (Income/Expense)
4. Sort by date or amount
5. Export data to CSV

### As an Admin
1. Do everything a Viewer can do
2. Click "Add Transaction" button to open form
3. Fill in details: Date, Category, Amount, Type
4. Click "Add Transaction" to save
5. Delete transactions by clicking the trash icon

### Dark Mode
- Toggle between light/dark modes
- Preference is saved automatically

---

## 📊 Mock Data

The project comes with pre-loaded sample transactions from March-April 2026:
- Multiple income sources: Salary, Freelance, Bonus
- Various expense categories: Rent, Food & Dining, Shopping, Entertainment, etc.
- Real-world scenarios with different amounts and dates

You can delete mock data by deleting transactions in Admin mode, or modify by editing `src/data.js`

---

## 🔧 Configuration

### Customize Categories
Edit `src/data.js`:
```javascript
export const CATEGORIES = [
  "Salary",
  "Freelance",
  "Rent",
  // Add more categories...
];

export const CATEGORY_COLORS = {
  "Salary": "#10b981",
  // Add color codes...
};
```

### Customize Currency
Edit `src/utils.js` - `formatCurrency()` function:
```javascript
// Change "INR" to your currency
style: "currency",
currency: "INR",
```

### Change Date Format
Edit `src/utils.js` - `formatDate()` function

---

## 💾 Data Persistence

- **Transactions** - Automatically saved to localStorage
- **Role (Viewer/Admin)** - Persisted across sessions
- **Dark Mode** - Preference saved
- **Filters** - Temporary (reset on refresh)

Clear localStorage to reset:
```javascript
// In browser console
localStorage.clear()
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "recharts": "^2.12.7",    // Charts
    "zustand": "^4.5.5",       // State management
    "lucide-react": "^0.463.0" // Icons
  }
}
```

---

## 🎨 Design System

### Colors
- **Income**: Green (`#10b981`)
- **Expenses**: Red (`#ef4444`)
- **Balance**: Blue (`#3b82f6`)
- **Background**: Dark Gray (`#111827`)
- **Cards**: Lighter Gray (`#1f2937`)

### Typography
- Headings: Bold, size 1.5rem - 2.25rem
- Body: Regular, size 0.875rem - 1rem
- Accent: Semibold for important data

### Spacing
- Cards: 1.5rem (6*4px)
- Padding: Consistent 1rem-2rem
- Gaps: 1.5rem between sections

### Shadows
- Light: `shadow-lg`
- Hover: `shadow-xl`
- Modal: `shadow-2xl`

---

## 🐛 Troubleshooting

### Styles not showing?
1. Ensure Tailwind v3 is installed: `npm ls tailwindcss`
2. Check `postcss.config.js` uses `tailwindcss` plugin
3. Ensure `index.css` has Tailwind directives
4. Restart dev server

### Zustand store not persisting?
1. Check browser localStorage is enabled
2. Clear localStorage and refresh
3. Verify localStorage key: `finance-dashboard`

### Charts not displaying?
1. Ensure Recharts is installed: `npm ls recharts`
2. Check browser console for errors
3. Verify chart data is not empty

### Modal not opening?
1. Switch to Admin role
2. Click "Add Transaction" button
3. Check console for JavaScript errors

---

## 🚀 Production Tips

### Build Optimization
```bash
npm run build
# Check size: du -sh dist/
```

### Performance
- Charts lazy-load on viewport
- LocalStorage capped at ~100 transactions
- Consider backend for enterprise use

### Deployment
```bash
# Build static files
npm run build

# Deploy 'dist' folder to:
# - Vercel (npm i -g vercel && vercel deploy dist)
# - Netlify (drag & drop dist folder)
# - GitHub Pages (configure in package.json)
```

---

## 📝 Next Steps (Optional Enhancements)

- [ ] Backend API integration for real data
- [ ] User authentication
- [ ] Multi-currency support
- [ ] Budget alerts
- [ ] Recurring transactions
- [ ] Income/expense goals
- [ ] Receipt uploads
- [ ] Monthly reports
- [ ] Mobile app version
- [ ] Email notifications

---

## 🎓 Learning Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org/
- **Zustand**: https://github.com/pmndrs/zustand
- **Lucide Icons**: https://lucide.dev/
- **React Docs**: https://react.dev

---

## ✅ Verification Checklist

After setup, verify these work:

- [ ] Dashboard loads without errors
- [ ] Summary cards show correct totals
- [ ] Charts render with data
- [ ] Can search/filter transactions
- [ ] Can toggle between roles
- [ ] Admin can add transactions
- [ ] Admin can delete transactions
- [ ] Dark mode toggle works
- [ ] Data persists after refresh
- [ ] CSV export downloads file
- [ ] Responsive on mobile (max-width: 768px)

---

## 🤝 Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Verify all dependencies installed (`npm ls`)
3. Clear cache: `npm run build && rm -rf dist`
4. Restart dev server: Stop with `Ctrl+C`, then `npm run dev`

---

## 🎉 You're All Set!

Your Finance Dashboard is ready to use. Start adding transactions, exploring insights, and managing your finances like a pro! 🎊

For questions or improvements, refer to the code comments and component documentation.

Happy tracking! 💸
