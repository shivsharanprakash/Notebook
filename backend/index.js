const connectToMongo = require('./db');
const express=require('express');
var cors=require('cors')
connectToMongo();
const app=express();
app.use(cors());
app.use(express.json());
const port=3001;

//Available Routes 
app.use('/api/auth', require('./routes/auth'));

app.use('/api/notes',require('./routes/notes'));

// Keep this at the end to handle other routes or to serve a default response
app.use('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port,()=>{
    console.log(`MyNotebook Backend is listning at http://localhost:${port}`)
});
