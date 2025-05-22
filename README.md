# TrendFlick 📰✨

## Description

TrendFlick is a cutting-edge article platform that provides personalized articles based on user preferences. Users can create an account, select their preferred article categories, and receive tailored content to their inbox. Built with modern web technologies, TrendFlick offers a seamless reading experience with a clean, responsive interface.

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 🎯 Personalized article recommendations
- 📱 Responsive design for all devices

## Tech Stack

### Frontend

- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend

- Node.js with Express
- MongoDB for database
- JWT for authentication
- Nodemailer for email notifications

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eDenxGT/TrendFlick.git
   cd TrendFlick
   ```

2. Install dependencies for both client and server:

   ```bash
   # Install server dependencies
   cd api
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the api directory with the following variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. Start the development servers:

   ```bash
   # Start backend server (from server directory)
   npm run dev
   
   # Start frontend (from client directory)
   npm start
   ```

## Usage

1. Create a new account or log in
2. Select your preferred article categories
3. Browse personalized content on your dashboard
4. Save articles to read later
5. Receive email notifications for new content in your categories

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Have questions or suggestions? Feel free to open an issue or contact us at [edenxgt@gmail.com](mailto:edenxgt@gmail.com)

---

Made with ❤️ by EDEN
