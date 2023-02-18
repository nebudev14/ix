import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/router';

import Setup from "../../components/dashboard/Setup";
import { getUser, redirect } from "../../lib/server";

export default function Dashboard({ user }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    // conditional hooks are not allowed :(
    const [initialized, _setInitialized] = useState(user.initialized);
    // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
    const setInitialized = (val) => {
        _setInitialized(val);
        router.replace(router.asPath);
    }
    if (status == "loading") {
        return <h1>Loading</h1>;
    }

    console.log(user)
    return (
        <div>
            <h1>Dashboard</h1>
            {!initialized ? <Setup user={user} setInitialized={setInitialized}/> :
                <>
                    <img src={user.image} />
                    <h1>{user.name} - {user.osis}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>Experience: {user.experience}</h1>
                    <button onClick={() => signOut()}>Sign Out</button>
                </>
            }
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const user = await getUser(req);
    if (!user) return redirect();

    return {
        props: { user }
    }
}