import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import CT_User from './models/userModel.js';
import CT_Product from './models/productModel.js';
import CT_Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await CT_Order.deleteMany();
    await CT_Product.deleteMany();
    await CT_User.deleteMany();

    const createdUsers = await CT_User.insertMany(users);
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    });

    await CT_Product.insertMany(sampleProducts);
    
    console.log('Data imported!');
    process.exit()

  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await CT_Order.deleteMany();
    await CT_Product.deleteMany();
    await CT_User.deleteMany();
    
    console.log('Data destroyed!');
    process.exit()

  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}