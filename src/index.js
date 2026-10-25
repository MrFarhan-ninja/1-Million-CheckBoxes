import http from 'node:http'
import path from 'node:path'


import config from './db/config.js'
import {Server} from 'socket.io'
import express from 'express'

async function main(){
    const PORT = config.PORT
    const app = express()
    const server = http.createServer(app)

    const io = new Server();
    io.attach(server)
    
   io.on('connection', (socket) => {
  console.log('A user connected');



    socket.on('client:checkbox:change',(data)=>{
    console.log(`[Socket:${socket.id}]:client:checkbox:change`,data)
    io.emit('server:checkbox:checked',data)
   })

   })





    app.use(express.static(path.resolve('./public')))
    app.get("/",(_,res)=>{
        res.send({healthu:"OK"})
    })

    
    server.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}
main()