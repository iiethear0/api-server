const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const apiRoutes = require('./routes/api');

const cors = require('cors');


const app = express();
const port = 4000; // The port number for the API server

// Middleware
const corsOptions = {
    origin: ['http://localhost:4000', 'https://b7c6-51-252-154-75.ngrok-free.app', 'http://localhost:3000'], // Add allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

app.use(express.json());

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD API',
            version: '1.0.0',
            description: 'A CRUD API with Swagger documentation',
        },
        servers: [
            {
                url: 'http://localhost:4000', // Localhost
            },
            {
                url: 'https://b7c6-51-252-154-75.ngrok-free.app', // Updated Ngrok URL
            },
        ],
    },
    apis: ['./routes/*.js'], // API documentation path
};



app.get('/', (req, res) => {
    res.send('Welcome to the API server with Swagger!');
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(`Swagger docs available at http://localhost:${port}/api-docs`);

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});