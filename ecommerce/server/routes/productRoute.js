const express = require("express");
const productModel = require("../models/productModel");
const router = express.Router();

// route to add a product
router.post('/addproduct',async (req,res)=>{
    const {name,price,discount,stock,image}= req.body
    try {
        const product= await productModel.findOne({name})
        if(product){
            return res.status(500).json({message:'this product already exist'})
        }
        const newproduct= new productModel({name,price,discount,stock,image})
        newproduct.save()
        return res.status(200).json({message:'product added successfully',product:newproduct})
    } catch (error) {
        res.status(500).json({message:'something went wrong while adding product',error})
    }
})

// route to get all products
router.get('/products',async (req,res)=>{
    try {
        const products= await productModel.find()
        return res.status(200).json({message:'all products',products})
    } catch (error) {
        res.status(500).json({message:'something went wrong while getting products',error})
    }
})

// route to get single product
router.get('/product/:id',async (req,res)=>{
    const id = req.params.id
    try {
        const product= await productModel.findById(id).populate('reviews.userInfo')
        if(!product){
            return res.status(404).json({message:'product not found'})
        }
        return res.status(200).json({message:'product found',product})
    } catch (error) {
        res.status(500).json({message:'something went wrong while getting product',error})
    }
})

// route to delete a product
router.delete('/product/delete/:prodid',async(req,res)=>{
    const id= req.params.prodid
    try {
        const deletedProduct= await productModel.findByIdAndDelete(id)
        if(!deletedProduct){
            res.status(404).json({message:'product not found'})
        }
        res.status(200).json({message:'product deleted',deletedProduct})
    } catch (error) {
        res.status(500).json({message:'something went wrong while deletting product',error})
    }
})

// route to update product
router.patch('/product/update/:prodid',async(req,res)=>{
    const id= req.params.prodid
    const {name,image,price,stock,discount} = req.body
    try {
        const product= await productModel.findByIdAndUpdate(id,{name,image,price,stock,discount},{new:true})
        if(!product){
            res.status(404).json({message:'product not found'})
        }
        res.status(200).json({message:'product updated',product})
    } catch (error) {
        res.status(500).json({message:'something went wrong while updating product',error})
    }
})

// route to add a review 
router.patch('/product/review/:prodid',async(req,res)=>{
    const id= req.params.prodid
    const {rating,description,images,userInfo} = req.body
    try {
        const product= await productModel.findById(id)
        if(!product){
            res.status(404).json({message:'product not found'})
        }
        product.reviews.push({rating,description,images,userInfo})
        product.save()
        res.status(200).json({message:'review added',product})
    } catch (error) {
        res.status(500).json({message:'something went wrong while adding review',error})
    }
})

module.exports = router;
