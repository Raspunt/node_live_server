
const express = require('express');
const path = require('path');
const {  spawn } = require("child_process");
const { log } = require('console');


const livereload = require("livereload");
const connectLivereload = require("connect-livereload");


const app = express();
const port = 3000;


let pwd = spawn('pwd')

pwd.stdout.on('data', (pwd) => {

    
    pwd = String(pwd).replace("\n","")
    let pathToHtml =`${pwd}/index.html`.replace("\n","")
    let pathToStatic = `${pwd}/static`.replace("\n","")

    console.log(pwd)
    console.log(pathToHtml);
    console.log(pathToStatic);
    

    const liveReloadServer = livereload.createServer();
   
    liveReloadServer.watch(pwd);

    app.use(express.static(pathToStatic))
    app.use(connectLivereload());




    
    

    app.get('/', function(req, res) {
        
        res.sendFile(pathToHtml)
    });
    
    app.listen(port, function() {
        console.log(`Example app listening on port ${port}!`)
    });
    
});



// node /home/maxim/justNode/node_live_server/main.js