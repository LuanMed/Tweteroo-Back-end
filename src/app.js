import express from "express";
import cors from "cors";

let users = [];
let tweets = [];

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000);

app.post("/sign-up", (req, res) => {
    const newUser = req.body;

    if (!newUser.username || !newUser.avatar || typeof (newUser.avatar) !== 'string' || typeof (newUser.username) !== 'string'){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    users.push(newUser);
    res.status(201).send('OK');
});

app.post("/tweets", (req, res) => {
    const newTweet = req.body;
    const { user } = req.headers;

    if (!user || !newTweet.tweet || typeof (newTweet.tweet) !== 'string') {
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    if (users.find((item) => user === item.username)) {
        let avatar, username = '';
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === user) {
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
    const tweetsReverse = [...tweets];

    if (!page) {
        const lastTweets = tweetsReverse.reverse().slice(0, 10);

        return res.send(lastTweets);
    } else {
        if (page && page >= 1){
            const lastTweets = tweetsReverse.reverse().slice(page*10-10, page*10);
            return res.send(lastTweets);
        } else {
            return res.status(400).send('Informe uma página válida!');
        }
    }
});

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    let tweetsUser = [];

    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].username === username) {
            tweetsUser.push(tweets[i]);
        }
    }
    res.send(tweetsUser);
});