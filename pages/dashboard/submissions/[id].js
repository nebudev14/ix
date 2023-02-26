import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import Layout from "../../../components/dashboard/Layout";
import { getSubmission } from "../../../lib/server";

export default function Submission({ submission }) {
  return (
    <div className="max-w-screen-md mx-auto py-6 p-2">
      <h1 className="text-6xl mb-4 font-bold text-teal-300">{submission.title}</h1>
      <p className="text-xl">{submission.description}</p>
    </div>
  );
}

Submission.Layout = Layout;

export async function getServerSideProps({ req, query: { id } }) {
  const submission = await getSubmission(req, id);
  if (!submission) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      submission,
    },
  };
}
