import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.post("/sign-up", (req, res) => {
    res.send('Hello Cold World');
});

app.post("/tweets", (req, res) => {
    res.send('Hello Cold World');
});

app.get("/tweets", (req, res) => {
    res.send('Hello Cold World');
});

app.listen(5000);