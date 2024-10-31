
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

const addOrderitems = asyncHandler(async (req, res) => {
    res.send('create order')
    // const products = await Product.find({})
    // res.json(products);
});

const getOrderByID = asyncHandler(async (req, res) => {
    res.send('get order By Id')
    // const products = await Product.find({})
    // res.json(products);
});

const updateOrdertoPaid = asyncHandler(async (req, res) => {
    res.send('updated to paid')
    // const products = await Product.find({})
    // res.json(products);
});

const updateOrdertoDelivered = asyncHandler(async (req, res) => {
    res.send('updated to delivered')
    // const products = await Product.find({})
    // res.json(products);
});

const getMyOrder = asyncHandler(async (req, res) => {
    res.send('get my order')
    // const products = await Product.find({})
    // res.json(products);
});

const getOrders = asyncHandler(async (req, res) => {
    res.send('get all order')
    // const products = await Product.find({})
    // res.json(products);
});

export{ addOrderitems, getOrderByID, getMyOrder, updateOrdertoDelivered, updateOrdertoPaid, getOrders };