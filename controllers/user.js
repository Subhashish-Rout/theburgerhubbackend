import { asyncError } from "../middleware/errorMIddleware.js"
import { User } from "../models/User.js"
import { Order } from "../models/Order.js"
export const myProfile = (req,res,next) =>{
    res.status(200).json({
        success:true,
        user:req.user,
    })
}

export const logout = (req,res,next) =>{
    req.session.destroy((err)=>{
        if(err) return next(err);
        res.clearCookie("connect.sid")
        res.status(200).json({
            message:"Logged Out",
        })
    })
}

export const getAdminUsers = asyncError(async(req,res,next)=>{
    const user = await User.find({});
    res.status(200).json({
        success:true,
        user,
    })
})


export const getAdminStats =asyncError(async(req,res,next)=>{
    
    const usercount = await User.countDocuments();
    const order = await Order.find({})

    const preparingOrder = order.filter((i)=>i.orderStatus == "Preparing");
    const ShippedOrder = order.filter((i)=>i.orderStatus == "Shipped");
    const deliveredOrder = order.filter((i)=>i.orderStatus == "Delivered");

    let totalIncome = 0;
    order.forEach(i=>{
        totalIncome += i.totalAmount;
    })

    res.status(200).json({
        success:true,
        usercount,
        orderCount:{
            total:order.length,
            preparing:preparingOrder.length,
            shipped : ShippedOrder.length,
            delivered : deliveredOrder.length
        },
        totalIncome,
    })
})