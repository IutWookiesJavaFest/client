import React, { useState, useEffect } from 'react'
import './ChatList.css'
import {useUserContext} from '../../../context/UserContext';
const ChatList = ({ chatListData, onChatItemClick }) => {
    const [pageLoading, setPageLoading] = useState(true);
    const {userInfo, setUserInfo} = useUserContext();
    
      // if(pageLoading){
      //   return (<ButtonLoading />)
      // }
      return (
        <>
          <div className="chatlist">
            <div className="chatlist_mainBox">
              <h2>Chats</h2>
              {chatListData.map((chatItem) => (
                <div
                  key={chatItem.id}
                  className="chatlist-item"
                  onClick={() => onChatItemClick(chatItem)}
                >
                  <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt={chatItem.name} />
                  <p>
                    {chatItem.firstUserId == userInfo.id?
                      chatItem.secondUserName :
                      chatItem.firstUserName
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )
}

export default ChatList