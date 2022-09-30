const express = require("express");
const authRoutes = require('./routes/auth-routes');

const app = express();

const port = 3000;

app.set("view engine", "ejs");

// Set up 
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  
    res.render("home");
    
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})