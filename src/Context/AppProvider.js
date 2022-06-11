import { createContext, useMemo, useContext, useState } from "react";
import useFireStore from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [friendSelected, setFriendSelected] = useState({ id: "1" });

    const { user } = useContext(AuthContext);
    const { id } = user;
    const friendsCondition = useMemo(() => {
        return {
            fieldName: "friends",
            operator: "array-contains",
            compareValue: id,
        };
    }, [id]);

    const friends = useFireStore("user", friendsCondition);

    return (
        <AppContext.Provider
            value={{
                friends,
                setFriendSelected,
                friendSelected,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
