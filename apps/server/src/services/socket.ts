import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor() {
    console.log("Socker Service is initializing");
    this._io = new Server({
        cors:{
            allowedHeaders: ["*"],
            origin: "*" ,
        }
    });
  }

  public initListners() {
    const io = this.io;
    console.log("init Socket listners...")
    
    io.on("connect", (socket) => {
      console.log("New Socket Connected✅: ", socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("Message Received: ", message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
