// send request to route api/signup

async function submit(username, password, setMsg, setOk) {
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setOk(false);
      const data = await res.json();
      if (data.code === "23505") {
        setMsg("Username already taken. Please enter a different one.");
      } else setMsg(data.details);

      return;
    }

    // submit accepted:
    setOk(true);
    setMsg(`Success: a new user was created`);

    // catch:
  } catch (e) {
    setOk(false);
    const error = JSON.parse(e.message);
    setMsg(error.details);
  }
}

export default submit;
