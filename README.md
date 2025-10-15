# Firebase Finance Codex NEO

A comprehensive financial reporting system built with React, TypeScript, Firebase, and modern web technologies.

## 🚀 Features

### 📊 Smart Financial Reporting
- **Smart Filters**: Two types of intelligent filtering
  - **Current Year Analysis**: Monthly, Quarterly, and Yearly views
  - **Multi-Year Comparison**: Compare same periods across multiple years
- **Hierarchical Account Structure**: Fold/Unfold functionality with account grouping
- **Multiple Report Types**: Income Statement, Balance Sheet, Cash Flow

### 👥 Analytical Reports
- **Income Statement by Sales Reps**: Analyze performance by individual sales representatives
- **Income Statement by Departments**: Analyze performance by organizational departments
- **Real-time Data**: Live data updates with Firebase Firestore integration

### 🌳 Chart of Accounts
- **Professional Account Hierarchy**: Complete chart of accounts with 5 main categories
- **Search Functionality**: Smart search across account names and codes
- **Account Details**: Detailed view with account types and normal balances
- **Fold/Unfold**: Multi-level expandable account structure

### 🎨 Modern UI/UX
- **Codex NEO Theme**: Professional dark theme with modern design
- **Responsive Design**: Works perfectly on all screen sizes
- **LTR Layout**: Left-to-right layout support
- **Interactive Tables**: Sticky headers, custom scrollbars, and smooth animations

## 🛠️ Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite 5.4.20** for fast development and building
- **Modern CSS** with CSS Variables
- **Responsive Design** with mobile-first approach

### Backend
- **Firebase Firestore** for real-time database
- **Firebase Cloud Functions** for data processing
- **Materialized Views** for optimized data retrieval

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Hot Module Replacement** for fast development

## 📁 Project Structure

```
firebase-finance-codex-neo/
├── web/                          # Frontend React application
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── MultiColumnTable.tsx      # Main table component
│   │   │   ├── FilterType1.tsx          # Current year analysis filter
│   │   │   ├── FilterType2.tsx          # Multi-year comparison filter
│   │   │   ├── FinancialReport.tsx      # Financial reports wrapper
│   │   │   ├── IncomeStatementBySalesReps.tsx  # Sales reps analysis
│   │   │   ├── IncomeStatementByDepartments.tsx # Departments analysis
│   │   │   ├── ChartOfAccounts.tsx      # Chart of accounts
│   │   │   ├── Sidebar.tsx              # Navigation sidebar
│   │   │   └── ...
│   │   ├── services/             # Firebase services
│   │   ├── utils/                # Utility functions
│   │   └── theme.css            # Global styles
│   ├── package.json
│   └── vite.config.ts
├── functions/                    # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts            # Cloud functions
│   └── package.json
├── firebase.json                # Firebase configuration
├── firestore.rules             # Firestore security rules
└── firestore.indexes.json      # Firestore indexes
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase CLI
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codexdevteam88/Codex_finance.git
   cd Codex_finance
   ```

2. **Install dependencies**
   ```bash
   # Install web dependencies
   cd web
   npm install
   
   # Install functions dependencies
   cd ../functions
   npm install
   ```

3. **Firebase Setup**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase (if not already done)
   firebase init
   ```

4. **Environment Configuration**
   - Update `web/src/firebaseConfig.ts` with your Firebase project credentials
   - Configure Firestore rules in `firestore.rules`
   - Set up Cloud Functions in `functions/src/index.ts`

5. **Run the application**
   ```bash
   # Start development server
   cd web
   npm run dev
   
   # Deploy to Firebase
   firebase deploy
   ```

## 📊 Data Structure

### Sales Representatives
- Ahmed Mohamed (SR001)
- Fatima Ali (SR002)
- Mohamed Hassan (SR003)
- Sara Ahmed (SR004)
- Omar Khalil (SR005)

### Departments
- Sales Department (DEPT001)
- Marketing Department (DEPT002)
- Production Department (DEPT003)
- Human Resources (DEPT004)
- Finance Department (DEPT005)
- IT Department (DEPT006)

### Account Categories
- **Assets** (1xxx): Current Assets, Fixed Assets, Other Assets
- **Liabilities** (2xxx): Current Liabilities, Long-term Liabilities
- **Equity** (3xxx): Owner's Equity
- **Revenue** (4xxx): Operating Revenue, Other Revenue
- **Expenses** (5xxx): COGS, Staff Costs, Marketing, Operations, Other

## 🎯 Key Features Explained

### Smart Filters
The system includes two types of intelligent filters:

1. **Filter Type 1 - Current Year Analysis**:
   - Monthly: View all 12 months in a single table
   - Quarterly: View all 4 quarters (Q1, Q2, Q3, Q4) in a single table
   - Yearly: View total for the entire year in a single column

2. **Filter Type 2 - Multi-Year Comparison**:
   - Compare full years (e.g., 2025 vs 2024 vs 2023)
   - Compare same quarters across years (e.g., Q2-2025 vs Q2-2024 vs Q2-2023)
   - Compare same months across years (e.g., January-2025 vs January-2024 vs January-2023)

### Hierarchical Account Structure
- **Fold/Unfold**: Click on account groups to expand/collapse
- **Multi-level**: Support for 3 levels of hierarchy
- **Visual Indicators**: Icons and colors for each account type
- **Summary Rows**: Special rows for totals (Gross Profit, Operating Profit, Net Profit)

### Demo Data System
- **Realistic Data**: Generated demo data for all accounts
- **Sales Rep Assignment**: Automatic assignment of accounts to sales representatives
- **Department Assignment**: Automatic assignment of accounts to departments
- **No Zero Values**: All accounts contain meaningful data

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Firebase
firebase serve       # Serve locally
firebase deploy      # Deploy to Firebase
firebase functions:shell  # Test functions locally
```

### Code Structure

- **Components**: Modular React components with TypeScript
- **Services**: Firebase integration layer
- **Utils**: Helper functions and data generators
- **Theme**: CSS variables for consistent styling

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Touch-friendly interface with mobile navigation

## 🎨 Theme System

### Codex NEO Theme
- **Dark Mode**: Professional dark theme
- **CSS Variables**: Easy customization
- **Consistent Colors**: Harmonious color palette
- **Modern Typography**: Clean, readable fonts

### Color Palette
- Primary: `#875A7B`
- Success: `#28a745`
- Danger: `#dc3545`
- Warning: `#ffc107`
- Info: `#17a2b8`

## 🔒 Security

- **Firestore Rules**: Secure data access rules
- **Authentication**: Firebase Authentication ready
- **Data Validation**: TypeScript for type safety
- **Input Sanitization**: Safe data handling

## 📈 Performance

- **Materialized Views**: Pre-calculated aggregations for fast queries
- **Lazy Loading**: Components loaded on demand
- **Optimized Queries**: Efficient Firestore queries
- **Caching**: Smart data caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Complete financial reporting system
- Smart filters implementation
- Hierarchical account structure
- Sales reps and departments analysis
- Chart of accounts
- Demo data system
- Responsive design
- Codex NEO theme

---

**Built with ❤️ by Codex Development Team**