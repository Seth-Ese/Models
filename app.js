const express = require("express");
let Products = require("./Products");
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/Products',(req,res)=>{
    res.json(Products)
})
    //get products/id
app.get('/Products/:productID', (req,res)=>{
    const {productID} = req.params;
    const getID = Products.find((eachID)=> eachID.id === Number(productID))

    
    if(!getID){
        res.status(404).send("can not get your id")
    }
    return res.json(getID)
   
})

    //post

    app.post('/Products',(req,res)=>{
        let incomingProducts = req.body
        let product = {
            id:Products.length + 1,
            name: incomingProducts.name,
            description: incomingProducts.description,
            image: incomingProducts.image,
            price: incomingProducts.price
        }
        Products.push(product);
        res.json(Products);

    })


// Put(Updating the file)
    app.put('/Products/:id', (req,res)=>{

        const { id } = req.params
        const body = req.body

        const updateproducts = Products.find((prod)=>prod.id === Number(id))
        const index = Products.indexOf(updateproducts)
        
        if(!updateproducts){
            res.status(404).send('cannot get products')
        }
         const newproducts = {...updateproducts, ...body}
             
         Products[index] = newproducts
         res.status(200).send(newproducts)
    })
    //Deleting a product
    app.delete('/Products/:id',(req,res)=>{
        const {id} = req.params
        
        const newproduct = Products.filter((prod)=> prod.id != Number(id))

        if(!newproduct){
            res.status(404).send("product not found")
        }
        Products = newproduct
        res.send(Products)
    })

app.listen(9000,()=>{
    console.log("the server is running at this port...");
})

