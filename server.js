// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });


let players = [];
let gameState = null;


wss.on('connection', ws => {
if (players.length >= 2) {
ws.send(JSON.stringify({ type: 'full' }));
ws.close();
return;
}


const color = players.length === 0 ? 'white' : 'black';
players.push(ws);


ws.send(JSON.stringify({ type: 'init', color }));


ws.on('message', msg => {
players.forEach(p => {
if (p !== ws && p.readyState === WebSocket.OPEN) {
p.send(msg.toString());
}
});
});


ws.on('close', () => {
players = players.filter(p => p !== ws);
});
});


console.log('♟️ Satranç sunucusu 8080 portunda çalışıyor');
