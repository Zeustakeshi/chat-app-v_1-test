import classNames from "classnames/bind";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../../Context/AppProvider";
import style from "./chatWindow.module.css";
import {
    doc,
    updateDoc,
    db,
    arrayUnion,
    onSnapshot,
} from "../../../firebase/services";
import { AuthContext } from "../../../Context/AuthProvider";

const cx = classNames.bind(style);
const ChatContent = () => {
    const inputRef = useRef();
    const [inputMess, setInputMess] = useState("");
    const [messList, setMessList] = useState([]);
    const { friendSelected } = useContext(AppContext);

    const { user } = useContext(AuthContext);
    const { uid, id, photoURL } = user;

    const convertIdToNumber = (id1, id2) => {
        const idLength = id1.length;
        let count1 = 0;
        let count2 = 0;
        for (let i = 0; i <= idLength - 1; i++) {
            count1 += id1[i].charCodeAt(0);
            count2 += id2[i].charCodeAt(0);
        }
        return count1 * count2;
    };

    const idChatRoom = useMemo(() => {
        let chatId = friendSelected.id;
        return JSON.stringify(convertIdToNumber(chatId, id) * 2222);
    }, [friendSelected.id, id]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", idChatRoom), (doc) => {
            if (doc.data()) {
                setMessList(doc.data().mess);
            }
        });

        return unsub;
    }, [friendSelected.id, id, idChatRoom]);

    const handleSendMess = async (event) => {
        event.preventDefault();
        inputRef.current.focus();
        if (inputMess === "") return;

        const dataMess = { uid: uid, message: inputMess };

        const currentUserRef = doc(db, "chats", idChatRoom);
        await updateDoc(currentUserRef, {
            mess: arrayUnion(dataMess),
        });

        // set input mess == ""
        setInputMess("");
    };
    return (
        <div className={cx("chat-content")}>
            {!friendSelected ? (
                <h3>Please selecte your friend's</h3>
            ) : (
                <>
                    <div className={cx("header")}>
                        <img
                            alt={friendSelected.displayName}
                            src={friendSelected.photoURL}
                            className={cx("header-avatar")}
                        />
                        <span className={cx("header-name")}>
                            {friendSelected.displayName}
                        </span>
                    </div>
                    <ul className={cx("mess-list")}>
                        {messList.map((mess, index) => {
                            const isUser = mess.uid === uid;
                            return (
                                <li
                                    key={index}
                                    className={cx("mess-item", {
                                        isUser,
                                    })}
                                >
                                    {!isUser && (
                                        <img
                                            alt='user'
                                            src={
                                                isUser
                                                    ? photoURL
                                                    : friendSelected.photoURL
                                            }
                                            className={cx("mess-avatar")}
                                        />
                                    )}
                                    <div className={cx("messages", { isUser })}>
                                        {mess.message}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <form
                        className={cx("input-mess")}
                        onSubmit={handleSendMess}
                    >
                        <input
                            value={inputMess}
                            onChange={(e) => {
                                setInputMess(e.target.value);
                            }}
                            ref={inputRef}
                        />
                        <button className={cx("btn-send")}>send</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default ChatContent;
