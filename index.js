const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

var restaurants = [{id:0,name:"Fat Greek"},{id:1,name:"Fat Boys"}]

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.get("/restaurants", (req,res)=>{
    res.send(restaurants);
})
app.post("/restaurant",(req,res)=>{
    restaurants.push({id:req.body.id, name:req.body.name})
    res.send(`${JSON.stringify(restaurants)} created`)
})
app.delete("/restaurant/:id", (req,res)=>{
    console.log('delete:id:'+req.params.id)
    restaurants = restaurants.filter(item=> item.id != req.params.id)
    res.send("restaurants left:"+JSON.stringify(restaurants));
})

app.listen(process.env.PORT || 5000,()=>console.log('Listening on 5000'))