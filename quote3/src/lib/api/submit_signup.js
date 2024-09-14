// send username, password to database to request for a sign up.

async function submit(event, username, password, setMessage, setSubmitOk) {
  event.preventDefault(); // Prevent the default form submission behavior

  if (!username || !password) {
    setMessage("Please enter a username and password.");
    return;
  }

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    // submit accepted:
    setSubmitOk(true);
    setMessage(`Success: a new user was created`);
  } catch (e) {
    // submit failed:
    setSubmitOk(false);
    const error = JSON.parse(e.message);

    if (error.code === "23505") {
      setMessage("Username already taken. Please choose a different one.");
    } else setMessage(error.details);
  }
}

export default submit;
