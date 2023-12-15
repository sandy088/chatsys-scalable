'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

interface ISocketContext {
    sendMessage: (msg: string) => any;
}
interface SocketProviderProps {
    children?: React.ReactNode;
}
const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () =>{
    const state = useContext(SocketContext)
    if(!state){
        throw new Error('State is undefined')
    }
    return state
}


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket>()

    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log('Sending messages: ', msg)
        console.log("value of socket: ", socket)
        if(socket){
            console.log("Sending message")
            socket.emit('event:message', {message:msg})
        }
        
    },[socket])

    useEffect(() => {
        const _socket = io('http://localhost:8000');
        setSocket(_socket);
        console.log(socket)
        return ()=>{
            _socket.disconnect();
            console.log("Disconnecting socket")
            setSocket(undefined);
        }
    }, [])
    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    )
}


