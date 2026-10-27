import http from 'node:http'
import path from 'node:path'

import { publisher,subscriber } from './redis-connection.js' 
import config from './db/config.js'
import {Server} from 'socket.io'
import express from 'express'

async function main(){
    const PORT = config.PORT
    const app = express()
    const server = http.createServer(app)

    const io = new Server();
    io.attach(server)
    


    await subscriber.subscribe('interval-server:checkbox:change');
    subscriber.on('message',(channel,message)=>{
        if(channel =='interval-server:checkbox:change'){
            const {index,check} = JSON.parse(message)
             io.emit('server:checkbox:checked',data)
            state.checkboxes[index] = check
        }
    })










    const state = {
       checkboxes: new Array(100).fill(false)
    }

   io.on('connection', (socket) => {
  console.log('A user connected',{id:socket.id});



    socket.on('client:checkbox:click', async (data)=>{
    console.log(`[Socket:${socket.id}]:client:checkbox:change`,data)
    // io.emit('server:checkbox:checked',data)
    // state.checkboxes[data.index] = data.check

    await publisher.publish('interval-server:checkbox:change',)
    JSON.stringify(data)

   })




   })

   



    app.use(express.static(path.resolve('./public')))
    app.get("/",(_,res)=>{
        res.send({healthu:"OK"})
    })
    app.get("/checkboxes",(req,res)=>{
       return res.json({
            checkboxes:state.checkboxes
        })
    })

    
    server.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}
main()