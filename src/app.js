import express from "express";
import cors from "cors";

let users = [];
let tweets = [];

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
    console.log(req.body);
    users.push(req.body);
    console.log(users);
    res.send('OK');
});

app.post("/tweets", (req, res) => {
    if (users.find((item) => req.body.username === item.username)) {
        let avatar = '';
        for (let i = 0; i < users.length; i++){
            if (users[i].username === req.body.username){
                avatar = users[i].avatar;
            }
        }
        const newTweet = req.body;
        newTweet.avatar = avatar;
        console.log(avatar);
        tweets.push(newTweet);
        console.log(tweets);
        res.send('OK');
        
    } else {
        return res.send('UNAUTHORIZED');
    }
});

app.get("/tweets", (req, res) => {
    if (tweets.length > 10){
        const lastTen = tweets.slice(tweets.length-10);
        return res.send(lastTen);
    }
    res.send(tweets);
});

app.listen(5000, () => {
    console.log("Servidor rodando")
});