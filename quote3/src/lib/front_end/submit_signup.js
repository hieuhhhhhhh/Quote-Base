// send request to route api/signup

async function submit(username, password, setMsg) {
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.code === "23505") {
        setMsg("Username already taken. Please enter a different one.");
      } else setMsg(data.details);

      return false;
    }

    // submit accepted:
    setMsg(`Success: a new user was created`);

    return true;
    // catch:
  } catch (e) {
    const error = e.message;
    setMsg(error.details);
    return false;
  }
}

export default submit;
