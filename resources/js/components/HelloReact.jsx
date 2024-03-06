import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const HelloReact = () => {
  const [client, setClient] = useState(null);

  const CustomListContainer = (props) => {
    
  };

  let chatUserId, chatUserToken, chatUserName;
  chatUserId = 'cyril';
  chatUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY3lyaWwifQ.vGRZ_wrxRJpHhV1Ppymep5ztg78irTHT6h_ahDyx4cM';
  chatUserName= 'cyril';

  useEffect(() => {
    const newClient = new StreamChat("bbrrz8hzzqsz");

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    newClient.connectUser(
      {
        id: chatUserId,
        name: chatUserName,
      },
      chatUserToken
    );

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (
    <>
    <button onClick={() => alert('Button clicked!')}style={{display:'flex', justifyContent:'center', alignItems:'center', padding: '15px', background: '#fff', color: '#ff0066', border: '5x solid #fff', borderRadius: '5px', cursor: 'pointer' }}>Click Me</button>
    <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Messages</a>

  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">User</a>
  </li>
</ul>

    <Chat client={client}>
      <div className="inbox" style={{ display: 'flex', height: '74vh' }}>
        <div className="channel-list" style={{flex: '1', backgroundColor: '#fff',paddingBottom: '4px',paddingTop: '4px',paddingLeft: '4px', height:'477px',borderRadius:'9px'}}>
          <ChannelList filters={filters} sort={sort} options={options} />
        </div>
        <div className="main-chat" style={{ flex: '1', backgroundColor: '#fff',padding: '5px', height:'477px',borderRadius:'9px' }}>
          <Channel>
            <Window>
              <div className="channelHeader" style={{flex: '1', background: '#ff0066', paddingBottom: '4px'}}>
              <ChannelHeader /></div>
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>



    </>
  );
};

export default HelloReact;

if (document.getElementById('hello-react')) {
  ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));
}
