import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from "./data/user.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from './models/orderModel.js';
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try{
        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();

        const  createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((products) => {
            return {...products,user: adminUser }
        })

        await Product.insertMany(sampleProducts);

        console.log("Data Imported");
        process.exit();
        
    }catch(error){
        console.error(`Error: ${error}`)
        process.exit(1);
    }
}


const destroyData = async () => {
    try{
        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();

        console.log("Data Deleted");
        process.exit();
        
    }catch(error){
        console.error(`Error: ${error}`)
        process.exit(1);
    }
}

if(process.argv[2] === "-d"){
    destroyData();
}else{
    importData();
}