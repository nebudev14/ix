import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/solid";

import Setup from "../../components/dashboard/Setup";
import { getUser, redirect } from "../../lib/server";
import Link from "next/link";
import Layout from "../../components/dashboard/Layout";

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
    <>
      {!initialized && <Setup setInitialized={setInitialized} />}
      <div className="pt-4 pl-8">
        <div className="flex justify-between">
          <h1 className="text-6xl font-bold">Dashboard</h1>
          <button
            className="mr-4 text-xl w-32 h-14 bg-red-400 rounded-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <p className="p-2">Sign Out</p>
          </button>
        </div>
        <div className="mt-24">
          <h1 className="text-5xl font-bold font-montserrat">Submissions</h1>
          {user.submissionId ? (
            <Link href={`/dashboard/submissions/${user.submissionId}`} className="inline-block">
              <div className="mt-4 w-80 h-36 rounded-lg bg-neutral-800 p-4">
                <h2 className="text-2xl mb-2 font-bold text-teal-300">{user.submission.title}</h2>
                <p>{user.submission.description}</p>
              </div>
            </Link>
          ) : (
            <div className="mt-4 max-w-sm h-36 rounded-lg bg-neutral-800 flex items-center justify-center">
              <Link href="/dashboard/create-submission">
                <button className="group rounded-full bg-neutral-700 flex items-center justify-center w-16 h-16 hover:bg-sky-400 duration-200">
                  <PlusIcon className="w-8 h-8 fill-sky-400 group-hover:fill-white duration-200" />
                </button>
              </Link>
            </div>
          )}
          {/* <Image src={user.image} alt="Profile Picture" width={96} height={96} />
          <h1>
            {user.name} - {user.osis}
          </h1>
          <h1>Email: {user.email}</h1>
          <h1>Experience: {user.experience}</h1> */}
        </div>
      </div>
    </>
  );
}

// wishing i had app directory rn
Dashboard.Layout = Layout;

export async function getServerSideProps({ req }) {
  const user = await getUser(req);
  if (!user) return redirect("/api/auth/signin");

  return {
    props: { user },
  };
}
