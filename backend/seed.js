const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to database
        await connectDB();
        console.log('Connected to database');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
        console.log('Cleared existing data');

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword1 = await bcrypt.hash('password123', salt);
        const hashedPassword2 = await bcrypt.hash('password456', salt);
        const hashedAdminPassword = await bcrypt.hash('admin123', salt);
        const hashedPassword3 = await bcrypt.hash('password101', salt);

        // Create dummy users
        const users = await User.insertMany([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword1,
                role: 'user',
                verified: true
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword2,
                role: 'user',
                verified: true
            },
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedAdminPassword,
                role: 'admin',
                verified: true
            },
            {
                name: 'Michael Johnson',
                email: 'michael@example.com',
                password: hashedPassword3,
                role: 'user',
                verified: false
            }
        ]);
        console.log(`${users.length} users created`);

        // Create dummy products
        const products = await Product.insertMany([
            {
                name: 'Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
                price: 199.99,
                category: 'Electronics',
                stock: 45,
                imageUrl: 'https://via.placeholder.com/300?text=Headphones',
                rating: 4.5,
                numReviews: 128
            },
            {
                name: 'USB-C Cable',
                description: 'Durable USB-C cable with fast charging support up to 100W',
                price: 12.99,
                category: 'Accessories',
                stock: 200,
                imageUrl: 'https://via.placeholder.com/300?text=USB-C+Cable',
                rating: 4.2,
                numReviews: 342
            },
            {
                name: 'Laptop Stand',
                description: 'Adjustable aluminum laptop stand for improved ergonomics',
                price: 49.99,
                category: 'Office',
                stock: 67,
                imageUrl: 'https://via.placeholder.com/300?text=Laptop+Stand',
                rating: 4.7,
                numReviews: 89
            },
            {
                name: 'Mechanical Keyboard',
                description: 'RGB mechanical keyboard with Cherry MX switches and aluminum frame',
                price: 129.99,
                category: 'Electronics',
                stock: 34,
                imageUrl: 'https://via.placeholder.com/300?text=Keyboard',
                rating: 4.8,
                numReviews: 256
            },
            {
                name: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse with precision tracking and 18-month battery life',
                price: 39.99,
                category: 'Electronics',
                stock: 112,
                imageUrl: 'https://via.placeholder.com/300?text=Wireless+Mouse',
                rating: 4.4,
                numReviews: 198
            },
            {
                name: '4K Webcam',
                description: '4K resolution webcam with auto-focus and built-in microphone for crystal clear video calls',
                price: 89.99,
                category: 'Electronics',
                stock: 28,
                imageUrl: 'https://via.placeholder.com/300?text=Webcam',
                rating: 4.6,
                numReviews: 76
            },
            {
                name: 'Phone Screen Protector',
                description: 'Tempered glass screen protector with 9H hardness rating',
                price: 9.99,
                category: 'Accessories',
                stock: 500,
                imageUrl: 'https://via.placeholder.com/300?text=Screen+Protector',
                rating: 4.3,
                numReviews: 512
            },
            {
                name: 'Portable Power Bank',
                description: '20000mAh portable power bank with dual USB ports and fast charging',
                price: 34.99,
                category: 'Accessories',
                stock: 89,
                imageUrl: 'https://via.placeholder.com/300?text=Power+Bank',
                rating: 4.5,
                numReviews: 401
            }
        ]);
        console.log(`${products.length} products created`);

        // Create dummy orders
        const orders = await Order.insertMany([
            {
                user: users[0]._id,
                items: [
                    {
                        productId: products[0]._id,
                        qty: 1,
                        price: products[0].price
                    },
                    {
                        productId: products[1]._id,
                        qty: 2,
                        price: products[1].price
                    }
                ],
                totalAmount: products[0].price + (products[1].price * 2),
                address: {
                    fullName: 'John Doe',
                    street: '123 Main St',
                    city: 'New York',
                    postalCode: '10001',
                    country: 'USA'
                },
                paymentId: 'pay_12345abc',
                status: 'delivered'
            },
            {
                user: users[1]._id,
                items: [
                    {
                        productId: products[3]._id,
                        qty: 1,
                        price: products[3].price
                    }
                ],
                totalAmount: products[3].price,
                address: {
                    fullName: 'Jane Smith',
                    street: '456 Oak Ave',
                    city: 'Los Angeles',
                    postalCode: '90001',
                    country: 'USA'
                },
                paymentId: 'pay_67890def',
                status: 'shipped'
            },
            {
                user: users[0]._id,
                items: [
                    {
                        productId: products[4]._id,
                        qty: 1,
                        price: products[4].price
                    },
                    {
                        productId: products[5]._id,
                        qty: 1,
                        price: products[5].price
                    }
                ],
                totalAmount: products[4].price + products[5].price,
                address: {
                    fullName: 'John Doe',
                    street: '123 Main St',
                    city: 'New York',
                    postalCode: '10001',
                    country: 'USA'
                },
                paymentId: 'pay_11223ghi',
                status: 'pending'
            },
            {
                user: users[3]._id,
                items: [
                    {
                        productId: products[7]._id,
                        qty: 1,
                        price: products[7].price
                    }
                ],
                totalAmount: products[7].price,
                address: {
                    fullName: 'Michael Johnson',
                    street: '789 Pine Rd',
                    city: 'Chicago',
                    postalCode: '60601',
                    country: 'USA'
                },
                paymentId: 'pay_44556jkl',
                status: 'delivered'
            }
        ]);
        console.log(`${orders.length} orders created`);

        console.log('\n✅ Database seeded successfully!');
        console.log(`\nSummary:`);
        console.log(`- Users: ${users.length}`);
        console.log(`- Products: ${products.length}`);
        console.log(`- Orders: ${orders.length}`);
        
        console.log('\n📝 Test Credentials:');
        console.log('Admin User:');
        console.log('  Email: admin@example.com');
        console.log('  Password: admin123');
        console.log('\nRegular User:');
        console.log('  Email: john@example.com');
        console.log('  Password: password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
