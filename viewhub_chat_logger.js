const WebSocket = require("ws");
let user_id = "";

///WS
function vhConnect() {

const viewhub = new WebSocket(
    "wss://realtime.vh.live/connection/websocket"
  );

//Open WS-connection
viewhub.on("open", function open() {
    viewhub.send(
      JSON.stringify(
        {"connect":{"name":"js"},"id":1}
      )
    );
    viewhub.send(
      JSON.stringify(        
        {"subscribe":{"channel":`user_id:${user_id}`},"id":2}       
      )
    );
    console.log("Connected to ViewHub");
});

//Add Listener
viewhub.addEventListener('message', function (event) {
    
    try {

    let res = JSON.parse(event.data)

    /// PING PONG EXCHANGE
    if (event.data === JSON.stringify({})) {
    return viewhub.send(JSON.stringify({}));
    }    
        let username = res.push?.pub.data.data.username;
        let msg = res.push?.pub.data.data.msg;
        let sum = res.push?.pub.data.data.sum;
        let viewers = res.push?.pub.data.data.viewers;
        
    ///CHAT LOG
    if (res.push?.pub.data.data.type === 'msg'){
      console.log(`${username}: ${msg}`);
    }

    //VIEWERS
    if (res.push?.pub.data.cmd === 'stream.viewers'){
        console.log(`Current Viewers: ${viewers}`);
    }
        
    ///FOLLOW
    if (res.push?.pub.data.data.type === 'subscribe'){
      console.log(`${username} is now following!`);
    }
    
    ///UNFOLLOW
    if (res.push?.pub.data.data.type === 'unsubscribe'){
        console.log(`${username} unfollowed`);
    }
    
    ///DONATION
    if (res.push?.pub.data.data.type === 'donate'){
      console.log(`${username} donated ${sum} USD and said: ${msg}`);
    }
    
    } catch (error) {
        if (error.toString().includes("SyntaxError: Unexpected token")){
            return; 
        }
        return console.log(error);
    }
});

//On error
viewhub.on("error", console.error);

//On close
viewhub.on("close", (reason) => {
    console.log(`Disconnected from ViewHub with code ${reason}`);
    viewhub.close()
    console.log("Trying to reconnect..")
    vhConnect();
});
}
vhConnect();
