import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { AppContext } from "../../../Context/AppProvider";
import {
    doc,
    updateDoc,
    db,
    where,
    query,
    collection,
    getDocs,
    setDoc,
    arrayUnion,
} from "../../../firebase/services";
import style from "./sidebar.module.css";

const cx = classNames.bind(style);
const AddFriend = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);
    const { uid, id } = user;

    const handleChangeInput = (e) => {
        setInput(e.target.value);
    };

    const handleAddFriend = async (event) => {
        event.preventDefault();
        if (input === "") {
            alert("please enter your friend's id");
            return;
        }

        setLoading(true);
        // check users in server
        const q = query(collection(db, "user"), where("id", "==", input));

        const querySnapshot = await getDocs(q);
        const data = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        if (data.length !== 1 || data[0].uid === uid) {
            alert("id incorrect!");
            setLoading(false);
            return false;
        }

        // if user friend correct add user firend in server
        const userFriend = data[0];

        const currentUserRef = doc(db, "user", uid);
        await updateDoc(currentUserRef, {
            friends: arrayUnion(input),
        });

        const friendRef = doc(db, "user", userFriend.uid);
        await updateDoc(friendRef, {
            friends: arrayUnion(id),
        });

        // create chat room for user and user friend correct
        const docData = {
            member: [id, userFriend.id],
            mess: [],
        };
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
        const idChatRoom = convertIdToNumber(id, userFriend.id) * 2222;

        await setDoc(doc(db, "chats", JSON.stringify(idChatRoom)), docData);

        // set input value === ""
        setInput("");
        setLoading(false);
    };

    return (
        <form className={cx("add-friend")} onSubmit={handleAddFriend}>
            <input
                className={cx("input-add-friend")}
                value={input}
                onChange={handleChangeInput}
                placeholder="Enter your friend's id # "
            />
            <button className={cx("btn-add")} type='submit'>
                {loading ? "o" : "Add+"}
            </button>
        </form>
    );
};

export default AddFriend;
