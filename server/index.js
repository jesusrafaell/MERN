const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//create server
const app = express();
//connect database
connectDB();

//act cors
app.use(cors());

//On express.json read date from user
app.use( express.json({ extended: true }) );

//port app
const port= process.env.port|| 5000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

//run app
app.listen(port, '0.0.0.0', () => {
  console.log(`Run Server in port: ${port}`);
})
