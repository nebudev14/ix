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
      <div className="pt-4 pl-4">
        <h1 className="text-6xl font-bold">Dashboard</h1>
        <div className="mt-24">
          <h1 className="text-5xl font-bold font-montserrat">Submissions</h1>
          {user.submissionId ? (
            <Link href={`/dashboard/submissions/${user.submissionId}`} className="inline-block">
              <div className="p-4 mt-4 rounded-lg w-80 h-36 bg-neutral-900">
                <h2 className="mb-2 text-2xl font-bold text-teal-300">{user.submission.title}</h2>
                <p>{user.submission.description}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center justify-center max-w-sm mt-4 rounded-lg h-36 bg-neutral-800">
              <Link href="/dashboard/create-submission">
                <button className="flex items-center justify-center w-16 h-16 duration-200 rounded-full group bg-neutral-700 hover:bg-sky-400">
                  <PlusIcon className="w-8 h-8 duration-200 fill-sky-400 group-hover:fill-white" />
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
