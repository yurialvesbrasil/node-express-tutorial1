const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

const PORT = 5000;

var channels = [];
var lessons = [];

server.get("/", (req, res) => {
    res.json({ hello: "world"});
});

server.post("/api/channels", (req, res) => {
    const channelsInfo = req.body;
    //Gera id
    channelsInfo.id = shortid.generate();
    //Grava objeto no array
    channels.push(channelsInfo);
    //Retorna array
    res.status(201).json(channelsInfo);
});

server.get("/api/channels", (req, res) => {
    res.status(200).json(channels);
});

server.delete("/api/channels/:id", (req, res) => {
    const { id } = req.params;
    const deleted = channels.find(channel => channel.id === id);
    if(deleted){
        channels = channels.filter(function(el) { 
            return el.id !== id; 
          });
        
        res.status(201).json({ message : "Channel removido com sucesso"});
    }else{
        res.status(404).json({ message : "Channel you are looking for does not exist"});
    }
});

server.post("/api/lessons", (req, res) => {
    const lessonsInfo = req.body;
    //Gera id
    lessonsInfo.id = shortid.generate();
    //Grava objeto no array
    channels.push(lessons);
    //Retorna array
    res.status(201).json(lessonsInfo);
});

server.get("/api/lessons", (req, res) => {
    res.status(200).json(lessons);
});


server.listen(PORT, () => {
    console.log(`\n Server Running on http://localhost:${PORT}`);
});