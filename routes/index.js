const express = require('express');
const router=express.Router();
const isLoggedin=require('../middlewares/isLoggedin');
const productModel=require("../models/product-model");
const userModel=require("../models/user-model");

router.get("/", function (req, res) {
  let error =req.flash("error");  
   res.render("index",{error});
 });

 router.get("/shop", isLoggedin, async (req, res) => {
  let products = await productModel.find()
  let success= req.flash("success")
  res.render("shop", { products, success });
});

router.get("/addtocart/:id", isLoggedin, async (req, res) => {
  try {
      let user = await userModel.findOne({ email: req.user.email });
      let product = await productModel.findById(req.params.id);

      if (user && product) {
          // Check if product is already in the cart
          const cartItemIndex = user.cart.findIndex(item => item.itemId.equals(product._id));
          if (cartItemIndex > -1) {
              // Increment quantity if item already exists in the cart
              user.cart[cartItemIndex].quantity += 1;
          } else {
              // Add new item to cart
              user.cart.push({ itemId: product._id, quantity: 1 });
          }

          await user.save();
          req.flash("success", "Product added to cart");
      } else {
          req.flash("error", "Product not found");
      }

      res.redirect("/shop");
  } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong");
      res.redirect("/shop");
  }
});

router.get("/cart", isLoggedin, async (req, res) => {
  try {
      let user = await userModel.findOne({ email: req.user.email }).populate('cart.itemId');
      res.render("cart", { cart: user.cart });
  } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong");
      res.redirect("/shop");
  }
});

router.post("/cart/update/:id", isLoggedin, async (req, res) => {
  try {
    const action = req.body.action; // 'increase' or 'decrease'
    const productId = req.params.id;

    let user = await userModel.findOne({ email: req.user.email });

    const cartItem = user.cart.find(item => item.itemId.toString() === productId);

    if (cartItem) {
      if (action === 'increase') {
        cartItem.quantity += 1;
      } else if (action === 'decrease') {
        cartItem.quantity = Math.max(cartItem.quantity - 1, 1); // Ensure quantity doesn't go below 1
      }

      await user.save();
    }

    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    res.redirect("/cart");
  }
});

router.post("/cart/remove/:id", isLoggedin, async (req, res) => {
  try {
    const productId = req.params.id;

    let user = await userModel.findOne({ email: req.user.email });

    // Remove the item from the cart
    user.cart = user.cart.filter(item => item.itemId.toString() !== productId);

    await user.save();
    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    res.redirect("/cart");
  }
});


module.exports=router;