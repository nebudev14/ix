import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

import Setup from "../../components/dashboard/Setup";
import { getUser, redirect } from "../../lib/server";
import Image from "next/image";

export default function Dashboard({ user }) {
  const router = useRouter();
  // conditional hooks are not allowed :(
  const [initialized, _setInitialized] = useState(user.initialized);
  // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  const setInitialized = (val) => {
    _setInitialized(val);
    router.replace(router.asPath);
  };

  console.log(user);
  return (
    <div>
      <h1>Dashboard</h1>
      {!initialized ? (
        <Setup setInitialized={setInitialized} />
      ) : (
        <>
          <Image src={user.image} alt="Profile Picture" width={96} height={96} />
          <h1>
            {user.name} - {user.osis}
          </h1>
          <h1>Email: {user.email}</h1>
          <h1>Experience: {user.experience}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const user = await getUser(req);
  if (!user) return redirect();

  return {
    props: { user },
  };
}
