import express, { Request, Response } from 'express'
import router from './src/router'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import { Server as ioServer, Socket } from 'socket.io'
import { Server as httpServer } from 'http'

const app = express()
const port = process.env.PORT || 3000
const server = new httpServer(app)
const io = new ioServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use((req: Request, res: Response) => {
  res.status(500).json({
    message: res.locals.errorMessage
  })
})

interface Message {
  message: string
  username: string
  userId: number
  //   receiverId: number
  roomId: string
}

const idAdmin = '2'
const chatUsers: string[] = []
let socketAdmin: Socket
const chatMessages: Record<string, Message[]> = {}

io.on('connection', (socket: Socket) => {
  const userId = socket.handshake.query.userId as string
  console.log('user Id ' + userId + ' connected')

  if (userId.toString() !== idAdmin) {
    chatUsers.push(userId as string)
    socket.join(`${userId}${idAdmin}`)
    socket.emit('connected', { rooms: [`${userId}${idAdmin}`] })
    if (socketAdmin) {
      socketAdmin.join(`${userId}${idAdmin}`)
    }
  } else {
    socketAdmin = socket
    const listRooms = chatUsers.map((user) => `${user}${idAdmin}`)
    socketAdmin.join(listRooms)
    socketAdmin.emit('connected', { rooms: [...new Set(listRooms)] })
  }

  //    when user connected send room details

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected')
  })

  socket.on('getChats', (data) => {
    const { roomId } = data

    io.to(roomId).emit('fullChats', chatMessages[roomId])
  })

  socket.on('sendChat', (data: Message) => {
    const { roomId } = data

    if (!chatMessages[roomId]) {
      chatMessages[roomId] = []
    }

    chatMessages[roomId].push(data)

    io.to(roomId).emit('receiveChats', data)
  })
})

server.listen(port, () => console.log('Server is running on port 3000'))

// ENTRY POINT
// -- Router
// --- Middleware
// ---- Controller
// ----- Service
// ------ Repository
// -------- Entity
// --------- Database
// ----------- ORM
