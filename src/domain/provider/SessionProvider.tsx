import * as React from 'react';
import SessionContext from '../../data/context/sessionContext.ts';
import { useCallback, useEffect, useState } from 'react';
import { Session } from '../../data/model/Session.ts';

type SessionProviderProps = {
    children: React.ReactNode
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children })  => {
    const [session, setSession] = useState<Session>(new Session());

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionProvider