# 🛍️ ShopNest MERN

Deployed link (Render) - https://shopnest-mern-h3b1.onrender.com/

A full-stack E-commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). ShopNest provides a modern shopping experience with secure authentication, product management, shopping cart functionality, order processing, payment integration using Razorpay Test Mode, and an admin dashboard.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Browse Products
- Product Details Page
- Add to Cart
- Remove from Cart
- Checkout
- Razorpay Test Payment Integration
- Order History
- Responsive UI

### 🛠️ Admin Features
- Admin Login
- Add Products
- Upload Product Images (Cloudinary)
- Manage Products
- View All Orders
- Update Order Status
- View Registered Users

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Redux Toolkit
- React Redux
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- BcryptJS
- Multer
- Cloudinary
- Nodemailer

### Payment Gateway
- Razorpay (Test Mode)

---

## 📂 Project Structure

```
ShopNest/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── styles/
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/k4rtikV/SHOPNEST_MERN.git
cd SHOPNEST_MERN
```

### Install Dependencies

```bash
npm run install-all
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret
```

---

## ▶️ Running the Project

Start both frontend and backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

Frontend runs on:

```
http://localhost:3000
```

---

## 💳 Razorpay Test Mode

This project uses Razorpay Test Mode for development.

Use Razorpay's official test payment methods for successful transactions.

---

## 📸 Screenshots

You can add screenshots here.

Example:

```
Home Page
Admin Dashboard
Shopping Cart
Checkout
Orders
```

---

## 🔐 Authentication

- JWT Authentication
- Protected Routes
- Admin Authorization
- Password Hashing using Bcrypt

---

## 📦 API Highlights

### User

- Register
- Login
- Get Users (Admin)

### Products

- Get Products
- Get Product by ID
- Add Product (Admin)
- Update Product (Admin)
- Delete Product (Admin)

### Orders

- Create Order
- Get My Orders
- Get All Orders (Admin)
- Update Order Status

---

## 👨‍💻 Author

**Kartik Varma**

GitHub:
https://github.com/k4rtikV

---

## 📄 License

This project is licensed under the MIT License.
