import {useEffect, useState} from "react";

type GithubUsersResponce = {
    status: string,
    name: string,
    login: string,
    avatar_url: string,
    location: string,
    public_repos: number
}

type UserInfo = {
    name: string,
    login: string,
    avatarUrl: string,
    location: string,
    publicRepos: number
}

async function fetchUserInfo(userId: string): Promise<UserInfo | null> {
    return await fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            console.log("status code", response.status);
            // エラーレスポンスが返されたことを検知する
            if (!response.ok) {
                console.error("error response", response);
            } else {
                return response.json();
            }
        }).then((userInfo: GithubUsersResponce) => {
            return {
                name: userInfo.name,
                login: userInfo.login,
                avatarUrl: userInfo.avatar_url,
                location: userInfo.location,
                publicRepos: userInfo.public_repos
            };
        }).catch(error => {
            console.error("catch error", error);
            return null;
        });
}

export default function User() {
    const [user, setUser] = useState<UserInfo | null>(null);
    useEffect(() => {
        const userId = "shtwangy";
        fetchUserInfo(userId).then(userInfo => setUser(userInfo))
    }, [])
    return (
        <>
            <h2>GitHub User Info</h2>
            {user &&
                <>
                    <h4>${user.name} (@${user.login})</h4>
                    <img src={`${user.avatarUrl}`} alt={`${user.login}`} height="100" />
                    <dl>
                        <dt>Location</dt>
                        <dd>{user.location}</dd>
                        <dt>Repositories</dt>
                        <dd>{user.publicRepos}</dd>
                    </dl>
                </>
            }
        </>
    )
}
