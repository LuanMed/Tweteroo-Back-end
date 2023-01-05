import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

let users = [];
let tweets = {a:{b:"b"},c:"c",d:"d"}

const app = express();
app.use( bodyParser.json() );

app.use(cors());

app.post("/sign-up", (req, res) => {
    console.log(req.body);
    users.push(req.body);
    console.log(users);
    res.send('OK');
});

app.post("/tweets", (req, res) => {
    res.send('Hello Cold World');
});

app.get("/tweets", (req, res) => {
    res.send(tweets);
});

app.listen(5000, () => {
    console.log("Servidor rodando")
});