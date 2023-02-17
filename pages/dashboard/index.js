import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";

function Dashboard() {
    const { data: session, status } = useSession();
    if (status == "loading") {
        return <h1>Loading</h1>;
    }
    if (status == "unauthenticated") {
        return (
            <div>
                <h1>You must sign in to view this page</h1>
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        );
    }

    if (status == "authenticated") {
        console.log(session);
        
    }
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export async function getServerSideProps({ req, res}) {
    const { data: session, status } = await getServerSession(req, res);
    if (status == "unauthenticated") {
        return {
            redirect: {
                destination: "/api/auth/signin/google",
                permanent: false
            }
        }
    }
    
    const user = await prisma.user.findUnique({
        
    })

}