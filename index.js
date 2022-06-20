const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
const { urlencoded } = require('express');
const onboardingRoutes = require('./v1/routes/onboard');
const authRoutes = require('./v1/routes/auth');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(morgan('dev'));


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTION'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})


//onboarding routes
app.use('/onboarding', onboardingRoutes);

//auth routes
app.use('/auth', authRoutes);


app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log(`server started on port ${PORT}`))