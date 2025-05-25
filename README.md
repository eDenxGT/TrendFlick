<div align="center">
  <h1>TrendFlick 📰✨</h1>
  <p><em>Your personalized article discovery platform</em></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  
  <br/>
</div>

## 🚀 Description

TrendFlick is a cutting-edge article platform that delivers personalized content based on your preferences. Create an account, select your favorite categories, and enjoy a curated reading experience right in your inbox. Built with modern web technologies, TrendFlick offers a seamless and responsive interface for all your reading needs.

## ✨ Features

- 🔐 **Secure Authentication** - Register and login with JWT protection
- 🎯 **Personalized Content** - Articles tailored to your interests
- 📱 **Fully Responsive** - Perfect on any device
- ⚡ **Lightning Fast** - Optimized for performance
- 🌈 **Modern UI** - Clean and intuitive interface

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js with TypeScript
- 🎨 Tailwind CSS
- 🛣️ React Router
- 🔄 Axios
- ✨ React Icons

### Backend
- 🚀 Node.js & Express
- 🍃 MongoDB (Database)
- 🔑 JWT Authentication
- ✉️ Nodemailer (Email Notifications)
- ⚡ Vite (Build Tool)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eDenxGT/TrendFlick.git
   cd TrendFlick
   ```

2. **Install Dependencies**
   ```bash
   # Install server dependencies
   cd api
   npm install
   
   # Install client dependencies
   cd client
   npm install --legacy-peer-deps
   ```

3. **Environment Setup**

   - **Backend** (create `.env` in `/api`):
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     CORS_ALLOWED_ORIGIN=http://localhost:5173
     ACCESS_TOKEN_SECRET=your_access_token_secret
     REFRESH_TOKEN_SECRET=your_refresh_token_secret
     ```

   - **Frontend** (create `.env` in `/client`):
     ```env
     VITE_API_AUTH_URL=http://localhost:5000/api/auth
     VITE_API_PVT_URL=http://localhost:5000/api/pvt
     VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     VITE_CLOUDINARY_IMAGE_UPLOAD_PRESET=your_cloudinary_image_upload_preset
     ```

4. **Start Development Servers**
   ```bash
   # Start backend server (from /api directory)
   npm run dev
   
   # In a new terminal, start frontend (from /client directory)
   npm run dev
   ```

## 🌐 Deployment

### Backend Deployment
1. Deploy to Render, Heroku, or any Node.js hosting
2. Set required environment variables
3. Update environment variables in the frontend to point to your deployed backend

### Frontend Deployment
1. Deploy to Vercel, Netlify, or any static hosting
2. Configure environment variables during build

### Live URLs
- **Frontend**: [https://trendflick.edengt.in/](https://trendflick.edengt.in/)
- **Backend**: [https://trendflick-api.edengt.in/](https://trendflick-api.edengt.in/)

## 🧪 Testing

### Running Tests

If you've implemented tests, you can run them using the following command:

```bash
# Run unit tests
npm test
```

### Test Checklist
- [x] **Authentication**: Register/Login with JWT
- [x] **Protected Routes**: Unauthorized access prevention
- [x] **User Preferences**: Category selection and updates
- [x] **Content Filtering**: Articles filtered by preferences
- [x] **Responsive Design**: Cross-device compatibility

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Have questions or suggestions? We'd love to hear from you!

- 📧 Email: [edenxgt@gmail.com](mailto:edenxgt@gmail.com)
- 💬 Open an issue on [GitHub](https://github.com/eDenxGT/TrendFlick/issues)

---

<div align="center">
  Made with ❤️ by <strong>EDEN</strong>
</div>