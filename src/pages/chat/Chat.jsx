import React, { useState, useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import ChatList from './chatlist/ChatList';
import ChatMessages from './chatmessage/ChatMessage';
import {useUserContext} from '@/context/UserContext';
const API_PATH = import.meta.env.VITE_API_PATH;

const Chat = () => {
    const [chatListData, setChatListData] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const {userInfo} = useUserContext();

    const [socket, setSocket] = useState(null);

    const getAllChats = async () =>{
      const apipath = `${API_PATH}/chat/${userInfo.id}`;
      try {
        const response= await axios.get(apipath,
          {
            timeout: 10000, // Timeout set to 30 seconds (30000 milliseconds)
          },
        );
        console.log(response.data);
        if(response.data.message == "Chats found"){
          // setChatListData(response.data.chatList);
          setChatListData(response.data.chatList);
        }
      }
      catch (error) {
        console.error(error.message);
      };
    }

    //first time get chat list
    useEffect(()=>{
      if(userInfo?.id)getAllChats();
    }, [userInfo]);


    // when chat is selected
    const handleChatItemClick = (chatItem) => {
        setSelectedChat(chatItem);
    };
  
    //update list after message
    const handleUpdateChatList = () => {
      console.log("kisu hoi");
      getAllChats();
    };

    //socket connection
    useEffect(() => {
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
    }, []);

    useEffect(() => {
      if (socket) {
        // Listen for incoming messages
        socket.on('message send', (data) => {
          getAllChats();
        });
      }
    }, [socket, userInfo.id]);

    return (
      <div className="chats">
        <div className='chats_mainBox'>
            <ChatList chatListData={chatListData} onChatItemClick={handleChatItemClick} />
            <ChatMessages selectedChat={selectedChat} updateChatList={handleUpdateChatList}/>
        </div>
        
      </div>
    );
}

export default Chat