import { io } from "socket.io-client";

const SOCKET_URL = 'http://192.168.0.137:3000';

class socketServices {
    initSocket = async () => {
        try {
            this.socket = io(SOCKET_URL,{
                transports: ['websocket']
            })
            // console.log("Tồn tại socket serivce",this.socket);
            this.socket.on('connect', (data) => {
                console.log('Đã kết nối socket');
            })
            this.socket.on('disconnect', (data) => {
                console.log('Đã mất kết nối socket');
            })
            this.socket.on('error', (data) => {
                console.log('Lỗi: ',data);
            })
        } catch (error) {
            console.log('Socket service chưa tồn tại');
        }
    }

    emit(e, data = {}){
        this.socket.emit(e, data);
    }

    on(e, cb){
        this.socket.on(e, cb);
    }
    
    removeListener(e){
        this.socket.emit(e);
    }

    off(e, cb){
        this.socket.off(e, cb);
    }
} 

const socketService = new socketServices();
export default socketService;
