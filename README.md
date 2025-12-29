# 💷 FreelanceCalc

> A rate calculator and project estimator for freelance web developers. Know your worth.

![FreelanceCalc Screenshot](assets/screenshot.png)

## 🎯 About

FreelanceCalc helps freelance web developers calculate their ideal hourly rate and estimate project costs. Built as part of my Industry and Community Engagement module at Manchester Metropolitan University, this tool demonstrates practical application of web development skills to real-world freelancing challenges.

**Live Demo:** [View Live Site](https://yourusername.github.io/freelance-calc)

## ✨ Features

### Rate Calculator
- Calculate your minimum and target hourly rates
- Factor in desired annual income
- Adjust billable hours per week
- Account for holidays and sick days
- Include business expenses
- Experience level multiplier

### Project Estimator
- Choose from common project types (landing pages, e-commerce, web apps, etc.)
- Toggle additional features (responsive design, CMS, SEO, etc.)
- Adjust for design complexity
- Visual complexity indicator
- Real-time cost calculations

### Quote Generator
- Generate professional client quotes
- Copy to clipboard functionality
- Clean, presentable format

### Freelance Tips
- Value-based pricing advice
- Scope creep protection
- Communication time considerations

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Google Fonts** - Syne & JetBrains Mono

## 📁 Project Structure

```
freelance-calc/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── app.js          # Application logic
├── assets/
│   ├── favicon.svg     # Site favicon
│   └── screenshot.png  # README screenshot
├── README.md           # This file
└── LICENSE             # MIT License
```

## 🚀 Getting Started

### Option 1: View Online
Visit the [live demo](https://sxyfg27-mmu.github.io/freelance-calc)

### Option 2: Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/sxyfg27-mmu/freelance-calc.git
   ```
2. Open `index.html` in your browser

No build process or dependencies required!

## 💡 How It Works

### Rate Calculation Formula

```
Minimum Rate = (Annual Income + Annual Expenses + Tax Reserve) / Annual Billable Hours

Where:
- Tax Reserve = Annual Income × 25%
- Annual Billable Hours = (52 - Weeks Off) × Hours Per Week

Target Rate = Minimum Rate × Experience Multiplier
```

### Project Estimation

```
Total Hours = (Base Hours + Feature Hours) × Complexity Multiplier
Project Cost = Total Hours × Target Rate
```

## 📸 Screenshots

### Main Interface
![Main Interface](assets/screenshot.png)

### Quote Generator
![Quote Generator](assets/quote-screenshot.png)

## 🎓 Learning Outcomes

This project demonstrates:
- Understanding of freelance business fundamentals
- Clean, maintainable code structure
- Responsive web design
- Modern CSS techniques (Grid, Flexbox, Custom Properties)
- JavaScript DOM manipulation
- User experience considerations
- Professional project documentation

## 🔮 Future Improvements

- [ ] Save calculations to local storage
- [ ] Export quotes as PDF
- [ ] Multiple currency support
- [ ] Dark/light theme toggle
- [ ] Project timeline estimator
- [ ] Client management features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Seyfeddine Gharbi**
- GitHub: [@sxyfg27-mmu](https://github.com/sxyfg27-mmu)

---

Built with ☕ as part of the Industry and Community Engagement module (6G5Z0019) at Manchester Metropolitan University.
