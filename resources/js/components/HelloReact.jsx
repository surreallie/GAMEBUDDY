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


  let chatUserId, chatUserToken, chatUserName;
  chatUserId = 'cyril'
  chatUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY3lyaWwifQ.vGRZ_wrxRJpHhV1Ppymep5ztg78irTHT6h_ahDyx4cM'
  chatUserName= 'cyril'

  useEffect(() => {
    const newClient = new StreamChat("bbrrz8hzzqsz");

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    newClient.connectUser(
      {
        id: chatUserId, // change id name, look at comment below
        name: chatUserName, // change name, look at comment below
      },
      chatUserToken
      // change token, look at comment below
    );

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (

    <Chat client={client}>
      <div className="inbox">
      <div className="channel-list">
        <ChannelList filters={filters} sort={sort} options={options} />
      </div>
      <div className="main-chat">
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </div>
    </div>
    </Chat>
  );
};
export default HelloReact;

if (document.getElementById('hello-react')) {
    ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));
}