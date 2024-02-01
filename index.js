import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {dirname, join} from "path";
import { fileURLToPath } from "url";
import fs from "fs";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const message = "Saved!";
let titlesLists = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));


app.get("/", (req, res)=>{
    res.render("index.ejs");
})
app.get("/contact", (req, res)=>{
    res.render("contact.ejs");
})
app.get("/about", (req, res)=>{
    res.render("about.ejs");
})
app.get("/fullArticle", (req, res)=>{
    res.render("fullArticle.ejs")
})
app.get("/post/:title", (req, res) => {
    const title = req.params.title;
    const filePath = path.join(__dirname, "views", title + ".ejs");
    res.render(filePath); // Render the corresponding EJS file
});

app.post("/submit", (req, res)=>{
    const enteredTitle = req.body["user-title"];
    titlesLists.push(enteredTitle);
    console.log(titlesLists);
    const enteredText = req.body['user-text'];
    const linkName = enteredTitle + ".ejs"
    const filePath = path.join(__dirname, "views", linkName);
    fs.writeFileSync(filePath, enteredText, (err)=>{
        if(err) {
            console.error(err);
        } else {
            console.log(`File ${linkName} created successfully.`)
            
        }
    })
    res.render("index.ejs", {titlesLists, message});

})
app.listen(port, (req, res)=> {
    console.log(`Server is listening on port ${port}`);
})