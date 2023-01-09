import express from "express";
import cors from "cors";

let users = [];
let tweets = [];

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
    console.log("Servidor rodando")
});

app.post("/sign-up", (req, res) => {
    const newUser = req.body;

    if (!newUser.username || !newUser.avatar){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    users.push(newUser);
    res.status(201).send('OK');
});

app.post("/tweets", (req, res) => {
    const newTweet = req.body;
    const { user } = req.headers;

    if (!user || !newTweet.tweet){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    if (users.find((item) => user === item.username)) {
        let avatar, username = '';
        for (let i = 0; i < users.length; i++){
            if (users[i].username === user){
                avatar = users[i].avatar;
                username = users[i].username;
            }
        }
        newTweet.avatar = avatar;
        newTweet.username = username;
        tweets.push(newTweet);
        res.status(201).send('OK');
        
    } else {
        return res.status(401).send('UNAUTHORIZED');
    }
});

app.get("/tweets", (req, res) => {
    const { page } = req.query;
    console.log(tweets)
    const lastTweets = tweets.reverse();

    if (tweets.length > 10){
        const lastTen = tweets.slice(tweets.length-10);
        return res.send(lastTen);
    }
    res.send(lastTweets);
    console.log(tweets);
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