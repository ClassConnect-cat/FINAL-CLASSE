require('dotenv').config();

const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

(async () => {

require('express-shortcuts')._inject();
const app = require('./src/app');
const db = await require('./src/services/db')();

const port = parseInt(process.env.PORT || 3000);

const dbExists = await checkIfDbExists(db);
    if (!dbExists) {
        await require('./dbcreate')(db);
}

app.listen(port, () => console.log(`Listening on port`, port));

})();

async function checkIfDbExists(db) {
    const collections = await db.listCollections().toArray();
    return collections.length > 0;
}

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      console.log("parsedMessage.message: ", parsedMessage.message);
      if (parsedMessage.message) {
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(parsedMessage));
        });
      }
    });
  
    ws.on('close', () => {
      
    });
  
  });   


app.use(express.static('public'));

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});