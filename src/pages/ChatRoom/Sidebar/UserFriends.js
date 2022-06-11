import classNames from "classnames/bind";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppProvider";
import style from "./sidebar.module.css";
import {
    doc,
    updateDoc,
    db,
    arrayRemove,
    deleteDoc,
} from "../../../firebase/services";
import { AuthContext } from "../../../Context/AuthProvider";

const cx = classNames.bind(style);
const UserFriends = () => {
    const { friends, setFriendSelected } = useContext(AppContext);

    const { user } = useContext(AuthContext);
    const { uid, id } = user;
    // selected friend
    const handleSelect = (friend) => {
        setFriendSelected(friend);
    };

    // delete friend
    const handleDelFriend = async (friendUid, friendList, friendId) => {
        // update friend list friends
        const friendRef = doc(db, "user", friendUid);
        await updateDoc(friendRef, {
            friends: arrayRemove(id),
        });

        // update user list friend
        const currentUserRef = doc(db, "user", uid);
        await updateDoc(currentUserRef, {
            friends: arrayRemove(friendId),
        });

        // delete chats doc
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
        const idChatRoom = convertIdToNumber(friendId, id) * 2222;

        await deleteDoc(doc(db, "chats", JSON.stringify(idChatRoom)));
    };
    return (
        <ul className={cx("friend-list")}>
            <div className={cx("friend-title")}>
                {friends.length === 0 ? "No Friend" : "Your Friends: "}
            </div>

            {friends.map((friend) => {
                return (
                    <li
                        key={friend.uid}
                        className={cx("friend-item")}
                        onClick={() => {
                            handleSelect(friend);
                        }}
                    >
                        <img
                            src={friend.photoURL}
                            className={cx("friend-img")}
                        />
                        <div className={cx("friend-name")}>
                            {friend.displayName}
                        </div>
                        <button
                            className={cx("btn-remove")}
                            onClick={() => {
                                handleDelFriend(
                                    friend.uid,
                                    friend.friends,
                                    friend.id
                                );
                            }}
                        >
                            Del
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default UserFriends;
