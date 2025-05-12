const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const Cart = require('./models/cart');
const Register = require('./models/register');

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/books').then(() => {
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const port = 8080;
const Listing = require('./models/bookslisting');
//ejs

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',require('ejs').__express);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
app.post('/register', async (req, res) => {
    try {
        const registerEmployee = new Register({
            regNo: req.body.regNo,
            email: req.body.email,
            password: req.body.password
        });

        await registerEmployee.save();
        // Don't send email/password in response; instead redirect
        res.redirect('/home');
    } catch (err) {
        res.status(500).send("Error registering user");
    }
});

        
    // }catch(err){
    //     res.send(err);
    // }
    
// });
app.get('/',(req,res)=>{
    res.render('page1');

})
app.get('/register',(req,res)=>{
    res.render('page2');
});
app.get('/home',async(req,res)=>{

    let alllisting = await Listing.find({});
    res.render('page3',{alllisting:alllisting});
    });

app.get('/home/:id', async (req, res) => {
    
        const { id } = req.params;
        const qlisting = await Listing.findById(id);
        res.render('atmoic', { qlisting });
    });
    app.post('/home/:id', async (req, res) => {

        const { id } = req.params;
        const qlisting = await Listing.findById(id);
        const cart = new Cart({
            name: qlisting.name,
            imagelink: qlisting.imagelink,
            price: qlisting.price,
            author: qlisting.author
            
            
        });
        await cart.save();
        res.redirect('/cart');
    
    }
    );  
    
    app.post('/login', async (req, res) => {
        try {
            const user = await Register.findOne({ email: req.body.email, password: req.body.password });
            if (user) {
                res.render('page3.ejs');
                res.json({message:"login successful"});

            } else {
                res.status(401).send("Invalid login details");
                
                
            }
        } catch (err) {
            res.send('error');
        }
    });
    app.get('/cart', async (req, res) => {
        let cartItems = await Cart.find({});
        res.render('cart.ejs', { cartItems });
        
    });
    app.get('/login', (req, res) => {
        res.render('page1.ejs');
    });
    app.delete('/cart/:id', async (req, res) => {
        const { id } = req.params;

        await Cart.findByIdAndDelete(id);
        res.redirect('/cart');
    });