# TVM Executive Dashboard

A comprehensive analytics dashboard for monitoring TVM (Ticket Vending Machine) operations, performance metrics, and revenue analytics.

## 🚀 Live Demo

[View Dashboard](https://tvm-dashboard.vercel.app)

## 📊 Features

### Operational Performance
- Real-time system availability tracking (94.83% fleet-wide)
- Component health monitoring with MTBF metrics
- Temperature vs performance correlation analysis
- Hopper utilization tracking
- Predictive maintenance alerts for 24 at-risk devices

### Error Analytics
- Error distribution by severity (Critical/Major/Minor)
- Temporal error pattern analysis
- Component failure tracking
- Error spike detection and trending
- Daily error rate monitoring (39 errors/day average)

### Transaction Analytics
- Revenue tracking (£2.84M over 16 months)
- Payment method distribution and trends
- Cash to card migration analysis (1.43:1 ratio)
- Peak hour transaction patterns
- Product mix and revenue analysis

### Executive Summary
- Key Performance Indicators (KPIs) at a glance
- Critical risk areas identification
- Business intelligence insights
- Strategic recommendations with actionable items

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Charts**: Chart.js 4.4.0 (CDN)
- **Design**: Responsive, mobile-first approach
- **Deployment**: Vercel
- **Version Control**: GitHub

## 📈 Key Metrics

- **Fleet Size**: 297 devices
- **Availability**: 94.83% average
- **Revenue**: £2.84M total
- **Transactions**: 398,520 total
- **Success Rate**: 96.8%
- **Daily Revenue**: £5,875 average

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/pkumv1/tvm-executive-dashboard.git
cd tvm-executive-dashboard
```

2. Open directly in browser:
```bash
open index.html
```

Or use a local server:
```bash
npx serve .
# Navigate to http://localhost:3000
```

### Deployment

The dashboard is automatically deployed to Vercel on every push to the main branch.

## 📝 Project Structure

```
tvm-executive-dashboard/
├── index.html          # Main dashboard file
├── dashboard.js        # Chart logic and interactions
├── package.json        # Project metadata
├── README.md          # Documentation
└── vercel.json        # Vercel configuration
```

## 🔧 Configuration

### Customization

To customize the dashboard for your organization:

1. Update the data in `dashboard.js`
2. Modify chart configurations in the JavaScript section
3. Adjust colors and styling in the CSS section
4. Update KPI thresholds based on your targets

### Adding New Metrics

1. Add new KPI cards in the relevant tab section
2. Create new chart configurations in the initialization functions
3. Update the executive summary with new insights

## 📊 Data Sources

Currently using static data for demonstration. To connect live data:

1. Replace static data arrays with API calls
2. Implement real-time WebSocket connections
3. Add authentication for secure data access
4. Configure CORS for API endpoints

## 🎯 Performance Optimization

- Lazy loading of charts per tab
- Efficient chart lifecycle management
- CDN-hosted dependencies
- Optimized animations and transitions
- Responsive grid layouts

## 🔒 Security Considerations

For production deployment:

1. Implement authentication
2. Use HTTPS only
3. Add Content Security Policy headers
4. Sanitize any user inputs
5. Implement rate limiting for API calls

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team

## 🔄 Updates

### Version 1.0.0 (Current)
- Initial release with full dashboard functionality
- Three main tabs: Operational, Errors, Transactions
- Executive summary section
- Responsive design
- Chart.js integration

### Roadmap
- [ ] Live data integration
- [ ] User authentication
- [ ] Export functionality
- [ ] Email alerts
- [ ] Mobile app version
- [ ] Dark mode support
- [ ] Multi-language support

---

**Built with ❤️ for better TVM operations management**