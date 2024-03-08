import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import { createServer } from "http";
import cors from "cors";

const app = express();
app.use(cors())
const server = createServer(app);

const wss = new WebSocketServer({ server: server });

let merchantData = [
  {
    "id": "1",
    "name": "Merchant One",
    "location": "City A",
    "pricing": "\$99",
    "contactDetail": {
      "phone": "111-222-3333",
      "email": "merchant1@example.com"
    },
    "shortDes": "Quality products and services."
  },
  {
    "id": "2",
    "name": "Merchant Two",
    "location": "City B",
    "pricing": "\$56",
    "contactDetail": {
      "phone": "444-555-6666",
      "email": "merchant2@example.com"
    },
    "shortDes": "Luxury goods at competitive prices."
  },
  {
    "id": "3",
    "name": "Merchant Three",
    "location": "City C",
    "pricing": "\$23",
    "contactDetail": {
      "phone": "777-888-9999",
      "email": "merchant3@example.com"
    },
    "shortDes": "Wide range of products for every budget."
  },
  {
    "id": "4",
    "name": "Merchant Four",
    "location": "City D",
    "pricing": "\$120",
    "contactDetail": {
      "phone": "777-888-6666",
      "email": "merchant4@example.com"
    },
    "shortDes": "Wide range of products for every budget."
  }
]

let merchantDataResponce = {
  "id": 'someid_123',
  "pubKey": 'relay_publicKey',
  "created_at": "current_time",
  "kind": 11001,
  "tags": "",
  "content": merchantData,
  "sig": 'signature_of_merchant_data'
}

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log(`Received message => ${message}`);
    if(message.toString() == 'mData')
    ws.send(JSON.stringify(merchantDataResponce));
  });

  console.log(`New client connected`);
  ws.send('connection_establised');
});

server.listen(3000, '192.168.213.91',() => {
  console.log(`Listening on port 3000`);
});
