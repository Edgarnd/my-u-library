import React, { useState, useEffect } from "react";
import useAPI from "./useAPI.ts";
import { UserInfoRes,
    fromJson as UserInfoResFromJson
 } from "../../data/model/response/UserInfoRes.ts";
import useSession from "./useSession.tsx";

const useLogin = () => {
    const session = useSession();
    const [userInfo, setUserInfo] = useState<UserInfoRes|null>(null);
    const { fetchData } = useAPI();

    const getUserInfo = async () => {
        const response = await fetchData("/api/user/info", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "email": session.email
            }
        });
        if (response !== null && response !== undefined) {
            const jsonResponse = response.data;
            setUserInfo(UserInfoResFromJson(jsonResponse));
            return UserInfoResFromJson(jsonResponse);
        }
        return null;
    };

    return {
        getUserInfo,
        userInfo,
        setUserInfo,
    };
}

export default useLogin;