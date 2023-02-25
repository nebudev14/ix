import { getSubmission, getUser, notFound, unauthorized } from "../../../lib/server";

export default function Submission({ submission }) {
  console.log(submission)
}

export async function getServerSideProps({ req, res, query: { id } }) {
  console.log(req)
  const submission = await getSubmission(id);
  if (!submission) {
    return notFound(res);
  }
  if (!submission.public) {
    const user = await getUser(req);
    if (!user) {
      return unauthorized(res);
    }
    if (!submission.members.includes(user)) {
      console.log(submission.members)
      console.log(user)
      // This is maybe not so user friendly, todo: replace
      return unauthorized(res);
    }
    return {
      props: submission
    }
  }
}
