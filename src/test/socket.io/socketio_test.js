import io from 'socket.io-client'

const socket = io('ws://localhost:4000', {transports: ['websocket']})
socket.on('receiveMsg', function(chatMsg) {
	console.log('浏览器接收到信息', chatMsg)
})

// 直接向服务器发送消息
socket.emit('sendMsg', {name:'Tom'})
console.log('客户端发送消息',{name:'Tom'})