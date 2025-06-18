# Social Media Data Scraper

A powerful web application for extracting and analyzing social media data, particularly focused on customer inquiries in the health and cosmetic surgery industries.

## Features

- **Multi-Platform Data Scraping**
  - Instagram, X (Twitter), Facebook, and LinkedIn integration
  - Location-based search capabilities
  - Real-time data collection

- **Advanced Analytics**
  - AI-powered sentiment analysis
  - Lead scoring system
  - Competitor tracking
  - Engagement metrics

- **Data Visualization**
  - Interactive charts and graphs
  - Customizable dashboards
  - Trend analysis

- **Smart Alerts**
  - Real-time notifications
  - Customizable alert conditions
  - Multi-channel delivery (email, in-app)

- **Export & Sharing**
  - Multiple format support (Excel, PDF)
  - One-click sharing
  - CRM integration

## Technology Stack

- **Frontend**: Next.js 13, React, Material-UI
- **Backend**: Node.js, Prisma
- **Database**: PostgreSQL
- **Analytics**: Natural Language Processing (natural.js)
- **Charts**: Chart.js

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Social Media API keys
- CRM API keys (optional)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-media-scraper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your API keys and database configuration in the `.env` file

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## API Documentation

### Scraping Endpoints

- `POST /api/scrape`
  - Scrapes social media data based on provided parameters
  - Parameters: keywords, platforms, dateRange, location

### Alerts Endpoints

- `POST /api/alerts`
  - Creates a new alert
  - Parameters: keywords, platforms, frequency, active

### Reports Endpoints

- `POST /api/reports`
  - Generates customized reports
  - Parameters: reportType, dateRange, format

## Security Considerations

- API keys are stored securely in environment variables
- Data is anonymized where necessary
- User authentication required for all operations
- Regular security audits recommended

## Best Practices

- Keep API keys secure and never commit them to version control
- Regularly update dependencies for security patches
- Monitor API rate limits
- Implement proper error handling
- Regular data backups

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.