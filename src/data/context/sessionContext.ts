import { createContext } from "react";
import { Session } from "../model/Session.ts";

const SessionContext = createContext<Session>({
    id: "",
    email: "",
    name: "",
    role: "",
    options: [],
    logged: false,
    logout: function (): void {
        throw new Error("Function not implemented.");
    }
});

export default SessionContext;