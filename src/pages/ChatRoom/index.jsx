import SideBar from "./Sidebar";
import ChatWindow from "./chatWindow";
import "./chatroom.css";
const Chat = () => {
    return (
        <div className='chat-room'>
            <SideBar />
            <ChatWindow />
        </div>
    );
};

export default Chat;
