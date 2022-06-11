import className from "classnames/bind";
import style from "./sidebar.module.css";
import { auth } from "../../../firebase/config";
import { useContext, memo } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
const cx = className.bind(style);
const Header = () => {
    const { user } = useContext(AuthContext);
    const dataUser = user;
    return (
        <div className={cx("header-sidebar")}>
            <img
                src={dataUser.photoURL}
                className={cx("avatar")}
                alt={dataUser.displayName}
            ></img>
            <div className={cx("user-info")}>
                <h3 className={cx("user-name")}>{dataUser.displayName}</h3>
                <h5 className={cx("user-id")}># {dataUser.id}</h5>
            </div>
            <button
                className={cx("btn-logout")}
                onClick={() => {
                    auth.signOut();
                }}
            >
                log out
            </button>
        </div>
    );
};

export default memo(Header);
