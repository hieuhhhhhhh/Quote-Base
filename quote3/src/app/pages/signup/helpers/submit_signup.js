// send request to route api/signup/username_and_password

async function submit(username, password, setMsg, setOK) {
  try {
    const res = await fetch("/api/authentication/signup/username_and_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setOK(false);
      const data = await res.json();
      if (data.code === "23505") {
        setMsg("Username already taken. Please enter a different one.");
      } else setMsg(data.details);

      return;
    }

    // submit accepted:
    setOK(true);
    setMsg(`Success: a new user was created`);

    // catch:
  } catch (e) {
    setOK(false);
    const error = JSON.parse(e.message);
    setMsg(error.details);
  }
}

export default submit;
