function Register() {
  return (
    <>
      <form action="/api/register" method="POST">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="osis">OSIS</label>
        <input type="text" id="osis" name="osis" />
        <label htmlFor="beginner">Beginner</label>
        <input type="radio" id="beginner" name="experience" value="BEGINNER" />
        <label htmlFor="intermediate">Intermediate</label>
        <input type="radio" id="intermediate" name="experience" value="INTERMEDIATE" />
        <label htmlFor="advanced">Advanced</label>
        <input type="radio" id="advanced" name="experience" value="ADVANCED" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Register;
