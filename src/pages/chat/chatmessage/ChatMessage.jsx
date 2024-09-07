import React, { useState, useEffect} from 'react';
import './ChatMessage.css'; // Import your custom CSS file
import axios from 'axios'
import { IoMdSend } from "react-icons/io";
import io from 'socket.io-client';

import {useUserContext} from '../../../context/UserContext';
import { Skeleton } from "@/components/ui/skeleton"
const API_PATH = import.meta.env.VITE_API_PATH;

const ChatMessage = ({ selectedChat, updateChatList }) =>{
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pageLoading, setPageLoading] = useState(true);

  const [socket, setSocket] = useState(null);

  const {userInfo} = useUserContext();
  selectedChat = selectedChat || { id: -1 };
  
  useEffect(() => {
    if (selectedChat.id != -1) {
      setPageLoading(true);
      const newSocket = io(`${API_PATH}`, { query: { userId: userInfo.id } });
      //const newSocket = io(`${apiPath}`);
      console.log(newSocket);
      setSocket(newSocket);

      // Cleanup function to disconnect the socket when the component unmounts
      return () => {
        if (socket) {
            socket.disconnect();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (selectedChat.id != -1) {
      setPageLoading(true);
      const newSocket = io(`${API_PATH}`, { query: { userId: userInfo.id } });
      setSocket(newSocket);

      // Cleanup function to disconnect the socket when the component unmounts
      return () => {
        if (socket) {
            socket.disconnect();
        }
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on('message send', (data) => {
        //console.log('sent message:', data);
        // Add the received message to the state
        if(data.chat.chatId  == selectedChat.id){
            const receivedMsg = {
                _id: data.chat.chatId,
                text:data.chat.message,
                createdAt: new Date(data.chat.createdAt),
                user: {
                    _id: data.chat.senderId,
                    name: data.chat.senderName,
                }
            }
            setMessages(prevMessages => [...prevMessages, receivedMsg]);
        }
        updateChatList();
      });

      // Send request to get all messages when receiverUser changes
      //console.log(socket);
      getAllMessages();
    }
  }, [socket, userInfo.id]);
 
  //get all message post request
  const getAllMessages =  async () => {
    setPageLoading(true);
    const apipath = `${API_PATH}/chat/message/${selectedChat.id}`;
    try {
      const response= await axios.get(apipath,
        {
          timeout: 10000, // Timeout set to 30 seconds (30000 milliseconds)
        },
      );

      const Chats=response.data.chats;

      const formattedMessages = Chats.map(chat => {
      return {
        _id: chat._id,
        text: chat.message,
        createdAt: new Date(chat.createdAt),
        user: {
          _id: chat.userId,
          name: (chat.userId === userInfo.id) ? 'me' : 'Other User',
        },
      };
    });

    // Sort the messages based on createdAt
    const sortedMessages = formattedMessages.sort((a, b) => a.createdAt - b.createdAt);

    // Set the sorted messages in the state
    setMessages(sortedMessages);
    setPageLoading(false);

    } catch (error) {
      setPageLoading(false);
      console.error(error.message);
    };
  }

  //send message
  const sendMessage = () => {
    // Emit a 'private message' event to the server
    socket.emit('message send', {
      firstUserId: userInfo.id,
      firstUserName: userInfo.name,
      secondUserId: selectedChat.firstUserId === userInfo.id ? selectedChat.secondUserId : selectedChat.firstUserId,
      secondUserName: selectedChat.firstUserId === userInfo.id ? selectedChat.secondUserName: selectedChat.firstUserName,
      chatId: selectedChat.id,
      message: inputValue,
    }, (acknowledgment) => {
        //console.log(acknowledgment.status);
        if(acknowledgment.status == "Message received successfully"){
            const sentMsg = {
                _id: selectedChat.id,
                text: inputValue,
                createdAt: new Date(acknowledgment.createdAt),
                user: {
                    _id: userInfo.id,
                    name: userInfo.name,
                }
            }
            setMessages(prevMessages => [...prevMessages, sentMsg]);
        }

        if(acknowledgment.error)console.log(acknowledgment.error);
    });
    // Clear the input field after sending message
    setInputValue('');
  };

  useEffect(() => {
    // console.log(userInfo);
    if(selectedChat.id !=-1){
      getAllMessages();
    }
  }, []);
  
  useEffect(() => {
    // console.log(userInfo);
    if(selectedChat.id !=-1){
      getAllMessages();
    }
  }, [selectedChat.id.id]);


  const randomWidth = () => {
    var min = 0;
    var max = 30;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if(selectedChat.id ==-1){
    return (
      <div className="chat">
        <div className="chat_mainBox">
        </div>
      </div>
    )
  }
  
  if(pageLoading){
    return (
      <div className="chat">
        <div className="chat_mainBox">
          <div className='chat-header '>
            <Skeleton className='chat-headerImage' />
          </div>
          <div className="chat-messageBox">
              <Skeleton className={`chat-messages chat-myMessage h-[2.5vw] rounded-xl`}
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>
              <Skeleton className={`chat-messages chat-myMessage h-[2.5vw] rounded-xl random-width`} 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>

              
              <Skeleton className={`chat-messages chat-othersMessage h-[2.5vw] rounded-xl`} 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>
              <Skeleton className={`chat-messages chat-othersMessage h-[2.5vw] rounded-xl`}
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>

              <Skeleton className='chat-messages chat-myMessage h-[2.5vw] rounded-xl' 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>

              <Skeleton className='chat-messages chat-othersMessage h-[2.5vw] rounded-xl' 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>
              <Skeleton className='chat-messages chat-othersMessage h-[2.5vw] rounded-xl' 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>
          </div>
          
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="chat">
        <div className="chat_mainBox">
          <div className='chat-header '>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className='chat-headerImage'/>
            <h2>{selectedChat.secondUserName}</h2>
          </div>
          <div className="chat-messageBox">
            {messages.map((message,index) => (
              message.user._id === userInfo.id ?
                <div className={`chat-messages chat-myMessage`} >
                  <p key={index}>
                    {message.text}
                  </p>
                </div>
                :
                <div className={`chat-messages chat-othersMessage`}>
                  <p key={index}
                  >
                    {message.text}
                  </p>
                </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="chat-inputField"
              onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                }}
            />
            {inputValue.length>0 ?
              (<div className='chat-inputSendButtonBox'> 
                <IoMdSend className='chat-inputSendButton mx-auto my-auto'
                onClick={()=>sendMessage()}/>
              </div>): null
            }
            
          </div>
        </div>
      </div>
    </>

  );
}

export default ChatMessage;