// send username, password to database to request to sign up.

async function submit(event, username, password, setResultMessage) {
  event.preventDefault(); // Prevent the default form submission behavior

  if (!username || !password) {
    setResultMessage("Please enter a username and password.");
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

    const data = await response.json();
    setResultMessage(`Success: ${data.message}`); // Update result message on success
  } catch (e) {
    const error = JSON.parse(e.message);

    if (error.code === "23505") {
      setResultMessage(
        "Username already taken. Please choose a different one."
      );
    } else setResultMessage(error.details);
  }
}

export default submit;
