import { useSession, signIn, signOut } from "next-auth/react";

function Register() {
  const { data: session, status } = useSession();

  if (status == "unauthenticated") {
    return (
      <div>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
  if (status == "loading") {
    return <h1>Loading</h1>;
  }
  if (status == "authenticated") {
    console.log(session);
    return (
      <div>
        {session.user.email.endsWith("@bxscience.edu") ? (
          <>
            <h1>`Authenticated {session.user.email}`</h1>
            <img src={session.user.image} />
          </>
        ) : (
          <h1>Please use your bxsci email</h1>
        )}
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
}

export default Register;
