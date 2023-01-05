import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

let users = [];
let tweets = [];

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.post("/sign-up", (req, res) => {
    console.log(req.body);
    users.push(req.body);
    console.log(users);
    res.send('OK');
});

app.post("/tweets", (req, res) => {
    if (users.find((item) => req.body.username !== item.username)) {
        return res.send('UNAUTHORIZED');
    } else {
        tweets.push(req.body);
        console.log(tweets);
        res.send('OK');
    }
});

app.get("/tweets", (req, res) => {
    res.send(tweets);
});

app.listen(5000, () => {
    console.log("Servidor rodando")
});