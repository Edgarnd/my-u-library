import { useContext } from "react";
import SessionContext from "../../data/context/sessionContext.ts";

const useSession = () => {
    return useContext(SessionContext);
};

export default useSession;
