const express = require("express");
const cors = require("cors")
require("./Database/Config")
const User = require("./Database/Users")
const Products = require("./Database/Product")
const Jwt = require('jsonwebtoken')
const jwtkey='e-com'
const app = express();


app.use(express.json());
app.use(cors());


function verifyToken(reqs,resp,next){
    console.log(reqs.headers['authorization']);
    let token = reqs.headers['authorization'];
    if(token){
         console.warn(token); 
         Jwt.verify(token,jwtkey,(err,valid)=>{
             if(err){
                resp.status(401).send({result:"please provide a valid token"})
            }else{
                next();
             }
         })
    }else{
        resp.status(403).send({result:"please provide a token"})
    }
    
 }


app.post('/register', async (reqs, resp) => {
    let user = new User(reqs.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
        resp.send({ result: "something went wrong,pleace try after some time" })
        }
        resp.send({result,auth :token})
    })
   
})

app.post("/login", async (reqs, resp) => {
    console.log(reqs.body, "req > body");
    if (reqs.body.password && reqs.body.email) {
        let userData = await User.findOne(reqs.body).select("-password");
        console.log(userData, "?????????????");
        if (userData) {
            Jwt.sign({userData},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                resp.send({ result: "something went wrong,pleace try after some time" })
                }
                resp.send({userData,auth :token})
            })
           
        } else {
            resp.send({ result: "no user" })
        }
    } else {
        resp.send({ result: "no user" })
        console.log("ivide vannu");
    }
})
app.post("/add-product",verifyToken, async (reqs, resp) => {
    console.log(reqs.body, '///lllklkk');
    let product = new Products(reqs.body);
    let result = await product.save();
    resp.send(result)

})
app.get("/products",verifyToken, async (reqs, resp) => {
    const products = await Products.find();
    console.log(products, '////////////////');
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No product found" })
    }
})
app.delete("/delete-product/:id",verifyToken, async (reqs, resp) => {
    console.log(reqs.params, '////////////adsasdsaasdad/////////dsaasd');
    let result = await Products.deleteOne({ _id: reqs.params.id });
    resp.send({ result })
})
app.get("/singleProduct/:id",verifyToken, async (reqs, resp) => {
    let result = await Products.findOne({ _id: reqs.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "no record found" })
    }
})

app.put("/updateProduct/:id",verifyToken, async (reqs, resp) => {
    let result = await Products.updateOne(
        { _id: reqs.params.id},
        { $set: reqs.body}
    )
    resp.send(result)
})


app.get("/searchproduct/:key",verifyToken, async (reqs, resp) => {
    let result = await Products.find({
        "$or": [
            {
                name: { $regex: reqs.params.key }
            },
            {
                company: { $regex: reqs.params.key }
            },
            {
                category: { $regex: reqs.params.key }
            },
            {
                price: { $regex: reqs.params.key }
            }
        ]
    });
    resp.send(result);
})




app.listen(4000);