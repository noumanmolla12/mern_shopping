const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();


const createError = require('http-errors');

// Middleware
app.use(bodyParser.json());
app.use(cors());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// MongoDB setup
dbConfig = require('./db/database');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

//http://localhost:8080/user
//http://localhost:8080/orderlist
//http://localhost:8080/authuser
//http://localhost:8080/admin
//http://localhost:8080/customers
//http://localhost:8080/admin-category/all

// Routes



const orderlistRoutes = require('./routes/orderlist.routes');
const adminRoutes = require('./routes/admin.routes');
const authadminRoutes = require('./routes/authadmin.routes');
const userRoutes = require('./routes/user.routes');
const authuserRoutes = require('./routes/authuser.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes =  require('./routes/order.routes');
const customerRoutes = require('./routes/customer.routes');
const blogRoutes = require('./routes/blog.routes');





app.use('/orderlist',orderlistRoutes);
app.use('/admin',adminRoutes);
app.use('/authadmin',authadminRoutes);
app.use('/user',userRoutes);
app.use('/authuser',authuserRoutes);
app.use('/admin-category',categoryRoutes);
app.use('/admin-product',productRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);
app.use('/admin-blog', blogRoutes);


// Start server
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})