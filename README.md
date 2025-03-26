
# RK.Creation - Traditional Wedding Handkerchiefs

This is a full-stack e-commerce application for RK.Creation, specializing in traditional wedding handkerchiefs.

## Environment Setup

1. Create a `.env` file in the root directory
2. Copy the contents from `.env.example` to your `.env` file
3. Replace the placeholder values with your actual MongoDB and Cloudinary credentials

Example `.env` file:
```
# MongoDB Connection
VITE_MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
```

## Getting Started

1. Install dependencies:
```sh
npm install
```

2. Start the development server:
```sh
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

## Features

- Product catalog with categories
- Product detail pages
- Admin dashboard for product management
- User reviews and ratings
- Contact form for customer queries
- Integration with MongoDB for data storage
- Integration with Cloudinary for image hosting
- Responsive design for all devices

## Project Structure

- `/src/models` - MongoDB schemas
- `/src/services` - Backend services for database interactions
- `/src/components` - Reusable React components
- `/src/pages` - Page components
- `/src/context` - React context providers

## Admin Login

Visit `/admin/login` and use the default credentials:
- Username: rkcreation
- Password: Krishna@2232

You can change these credentials in the admin settings panel.
