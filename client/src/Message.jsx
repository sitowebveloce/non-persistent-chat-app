import React from 'react'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3033');

const Message = () => {
    // LOCAL STATE
    const [message, setMessage] = React.useState('');
    const [room, setRoom] = React.useState(13);
    const [serverMessage, setServerMessage] = React.useState('');


    // 1 JOIN ROOM FUNCTION
    const joinRoom = room =>{
        socket.emit('join_room', room);
    };

    // 2 Use Effect room connection on start
    React.useEffect(()=>{
        joinRoom(room);

        // Catch server message
        socket.on('server_message', data=>{
            console.log(data);
            setServerMessage(data);
        })

    },[]);

    // 3 Send message
    const sendMessage = ()=>{
        if(message === '') return alert('Please enter a message.');
        // Send room message
        socket.emit('client_message', {message: '🐧 ' + message, room});
        // Reset input
        setMessage('');
    };

    // RETURN
  return (
    <div className='Message'>
        <div className="message_input">
            <input 
            type="text"
            value={message}
            onChange= {e=> setMessage(e.target.value)}
            placeholder='Chirp ...🐧'
            required
            />
            <button onClick={sendMessage}>Send</button>
        </div>
        <div className="server_message">
            <div className="room">Room: <span>{room}</span></div>
            <div className="tweet">{serverMessage && <span>{serverMessage}</span>}</div>
        </div>
    </div>
  )
}

export default Message