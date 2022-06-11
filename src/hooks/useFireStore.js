import { useEffect, useState } from "react";
import { collection, db, where, query, onSnapshot } from "../firebase/services";

const useFireStore = (collect, condition) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        if (
            !condition.compareValue ||
            condition.compareValue.length == 0 ||
            !collect
        )
            return;

        const userRef = collection(db, collect);

        //condition =  {fieldName, operator, compareValue }

        const q = query(
            userRef,
            where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            )
        );

        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setDocuments(data);
        });

        return unsub;
    }, [collect, condition]);
    return documents;
};

export default useFireStore;
