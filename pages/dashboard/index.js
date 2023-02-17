import { useSession, signIn, signOut } from "next-auth/react";
import prisma from "../../lib/prisma";
import { getToken } from "next-auth/jwt";
import { useEffect } from "react";
import Setup from "../../components/dashboard/Setup";

export default function Dashboard({ user }) {
    const { data: session, status } = useSession();
    if (status == "loading") {
        return <h1>Loading</h1>;
    }

    // status must be authenticated
    console.log(user)
    return (
        <div>
            <h1>Dashboard</h1>
            {user.osis == null ? <Setup /> :
                <>
                    <h1>{user.name}</h1>
                    <img src={user.image} />
                </>
            }
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const jwt = await getToken({ req });
    console.log(jwt)
    if (!jwt) {
        return {
            redirect: {
                destination: "/api/auth/signin/google",
                permanent: false
            }
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            id: jwt.sub
        }
    });

    if (!user) {
        return {
            redirect: {
                destination: "/register",
                permanent: false
            }
        }
    }
    return {
        props: { user }
    }

}