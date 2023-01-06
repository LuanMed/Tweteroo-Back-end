import express from "express";
import cors from "cors";

let users = [];
let tweets = [];

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
    users.push(req.body);
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
        tweets.push(newTweet);
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

app.get("/tweets/:username", (req, res) => {
    const {username} = req.params;
    console.log(username);
    let tweetsUser = [];

    for (let i = 0; i < tweets.length; i++){
        if (tweets[i].username === username){
            tweetsUser.push(tweets[i]);
        }
    }
    console.log(tweetsUser);
    res.send(tweetsUser);
});

app.listen(5000, () => {
    console.log("Servidor rodando")
});