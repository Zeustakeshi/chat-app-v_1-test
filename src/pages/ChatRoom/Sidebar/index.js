import classNames from "classnames/bind";
import style from "./sidebar.module.css";
import Header from "./Header";
import UserFriends from "./UserFriends";
import AddFriend from "./AddFriend";

const cx = classNames.bind(style);
const SideBar = () => {
    return (
        <div className={cx("sidebar")}>
            <Header />
            <UserFriends />
            <AddFriend />
        </div>
    );
};

export default SideBar;
