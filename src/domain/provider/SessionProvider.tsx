import * as React from 'react';
import SessionContext from '../../data/context/sessionContext.ts';
import { useCallback, useEffect, useState } from 'react';
import propTypes from "prop-types";
import { Session } from '../../data/model/Session.ts';

export default function SessionProvider({ children }) {
    const [session, setSession] = useState<Session>(new Session());

    const value = {
        session,
        setSession,
    };

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}
SessionProvider.propTypes = {
    children: propTypes.any
};
