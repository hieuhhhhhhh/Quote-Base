// send username, password to database to request for a sign up.

async function submit(username, password, setMessage, setSubmitOk) {
  if (!username || !password) {
    console.error("the request is missing username or password");
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
      setMessage("Username already taken. Please enter a different one.");
    } else setMessage(error.details);
  }
}

export default submit;
