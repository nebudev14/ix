// Floating modal type thing

// TODO: client side validation
export default function Setup({ setInitialized }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ideally some sort of red error box
    if (!e.target.osis.value || !e.target.experience.value) {
      return;
    }
    const body = JSON.stringify({
      osis: e.target.osis.value,
      experience: e.target.experience.value,
      initialized: true,
    });
    const res = await fetch("/api/user/update-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (res.status == 200) {
      console.log(await res.json());
      setInitialized(true);
    }
  };

  return (
    <div>
      <h1>First-time Setup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="osis">Please enter your OSIS:</label>
        <input type="text" id="osis" name="osis" />
        <h1>What is your level of programming experience?</h1>
        <input type="radio" id="beginner" name="experience" value="BEGINNER" />
        <label htmlFor="beginner">Beginner</label>
        <br />
        <input type="radio" id="intermediate" name="experience" value="INTERMEDIATE" />
        <label htmlFor="intermediate">Intermediate</label>
        <br />
        <input type="radio" id="advanced" name="experience" value="ADVANCED" />
        <label htmlFor="advanced">Advanced</label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
