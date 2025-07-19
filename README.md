# EcoTrack AI - AI-Powered Carbon Footprint Tracker

## 🌍 Overview

**EcoTrack AI** is an intelligent AI-powered platform that analyzes your transaction history to calculate your personal carbon footprint and provides actionable insights to reduce your environmental impact. By examining your spending patterns on food, transport, and shopping habits, the platform delivers clear CO2 scores and personalized guidance for sustainable living.

## ✨ Features

### 🔍 **Smart Transaction Analysis**

- Automated analysis of transaction data
- Real-time carbon footprint calculation
- Pattern recognition for spending habits

### 📊 **Clear CO2 Scoring**

- Easy-to-understand carbon footprint metrics
- Historical tracking and trends
- Comparative analysis with sustainable benchmarks

### 🎯 **Personalized Guidance**

- Step-by-step emission reduction strategies
- Tailored recommendations based on your lifestyle
- Realistic and achievable carbon reduction targets

### 🌱 **Sustainable Alternatives**

- AI-powered suggestions for eco-friendly options
- Cost-effective green alternatives
- Impact assessment for recommended changes

### 🤖 **Interactive AI Assistant**

- Conversational interface powered by Google Gemini AI
- Real-time chat support for carbon footprint queries
- Contextual advice based on your transaction history

## 🏗️ Architecture

```
EcoTrack-AI/
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── index.ts      # Main server file
│   │   ├── llmUtils.ts   # Google Gemini AI integration
│   │   ├── prompt.ts     # AI prompt engineering
│   │   └── data.ts       # Transaction data processing
│   ├── Dockerfile        # Docker configuration
│   └── package.json
│
├── frontend/          # Next.js React application
│   ├── app/
│   │   ├── chat/         # Chat interface
│   │   └── page.tsx      # Main landing page
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── NeuralNetwork.tsx  # Animated background
│   │   ├── ChatMessage.tsx    # Chat components
│   │   └── ...
│   └── package.json
│
└── .github/
    └── workflows/        # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **Google Gemini AI API Key**
- **Docker** (optional, for containerized deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/Ayush272002/EcoTrack-AI
cd EcoTrack-AI
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
touch .env

# Add your Google Gemini API key to .env
echo "GEMNI_API_KEY=your_gemini_api_key_here" > .env

# Build TypeScript
npm run build

# Start the server
npm start
```

The backend will be running on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The frontend will be available at `http://localhost:3000`

### 4. Environment Variables

Create a `.env` file in the backend directory:

```env
GEMNI_API_KEY=your_google_gemini_api_key
PORT=8000
```

For the frontend, create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## 🐳 Docker Deployment

### Backend

```bash
cd backend
docker build -t ecotrack-ai-backend .
docker run -p 8000:8000 -e GEMNI_API_KEY=your_api_key ecotrack-ai-backend
```

### Using GitHub Container Registry

The project includes automated Docker builds via GitHub Actions:

```bash
docker pull ghcr.io/ayush272002/ecotrack-ai-backend:latest
docker run -p 8000:8000 -e GEMNI_API_KEY=your_api_key ghcr.io/ayush272002/ecotrack-ai-backend:latest
```

## 🔧 API Reference

### POST `/generate`

Generate AI-powered carbon footprint analysis and recommendations.

**Request Body:**

```json
{
  "prompt": "I spent £100 on petrol this month. How can I reduce my carbon footprint?"
}
```

**Response:**

```json
{
  "ans": "Based on your petrol spending of £100, your carbon footprint is approximately 0.4 tonnes of CO2. Consider carpooling, using public transport, or switching to a more fuel-efficient vehicle to reduce emissions by up to 30%."
}
```

## 🎨 UI Components

### Neural Network Background

- Animated neural network visualization
- Real-time particle system
- Responsive design with Framer Motion

### Chat Interface

- Real-time messaging with AI
- Typing indicators and animations
- Message categorization (analysis, suggestions, text)

### Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Dark/light mode support

## 🧠 AI Integration

The platform leverages **Google Gemini AI** for:

- **Transaction Analysis**: Smart categorization of spending patterns
- **Carbon Calculation**: Accurate CO2 footprint estimation
- **Personalized Recommendations**: Tailored advice based on user data
- **Natural Language Processing**: Conversational interface for user queries

### Prompt Engineering

The AI system uses sophisticated prompt engineering to:

- Maintain context awareness
- Provide accurate calculations
- Ensure relevant responses
- Follow corporate communication guidelines

## 🔒 Security & Privacy

- **Data Protection**: Transaction data is processed securely
- **API Security**: CORS enabled for secure cross-origin requests
- **Environment Variables**: Sensitive data stored in environment variables
- **No Data Storage**: Conversations are not permanently stored

## 🛠️ Development

### Tech Stack

**Backend:**

- Node.js + Express.js
- TypeScript
- Google Gemini AI
- Docker

**Frontend:**

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Automated CI/CD with GitHub Actions

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Usage Examples

### Analyze Transportation Costs

```
User: "I spent £150 on Uber rides this month"
AI: "Your ride-sharing expenses of £150 generated approximately 0.3 tonnes of CO2. Consider combining trips, using public transport for longer journeys, or switching to electric vehicle rides to reduce your footprint by 40%."
```

### Food & Dining Analysis

```
User: "My grocery bill was £300 and I ordered takeaway 10 times"
AI: "Based on your spending pattern, focus on local, seasonal produce to reduce food-related emissions. Consider meal planning to minimize takeaway orders, which could cut your food carbon footprint by 25%."
```

## 🚦 Status & Roadmap

### Current Features ✅

- AI-powered carbon footprint analysis
- Real-time chat interface
- Transaction-based recommendations
- Responsive web application

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/Ayush272002/EcoTrack-AI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Ayush272002/EcoTrack-AI/discussions)
- **Email**: support@carbonandsons.com

## 🌟 Acknowledgments

- **Google Gemini AI** for powering our intelligent analysis
- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

---
