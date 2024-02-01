import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs");
})
app.get("/contact", (req, res)=>{
    res.render("contact.ejs");
})
app.get("/about", (req, res)=>{
    res.render("about.ejs");
})

app.listen(port, (req, res)=> {
    console.log(`Server is listening on port ${port}`);
})