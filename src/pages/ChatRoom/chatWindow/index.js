import classNames from "classnames/bind";
import ChatContent from "./ChatContent";

import style from "./chatWindow.module.css";

const cx = classNames.bind(style);
const ChatWindow = () => {
    return (
        <div className={cx("chat-window")}>
            <ChatContent />
        </div>
    );
};

export default ChatWindow;
