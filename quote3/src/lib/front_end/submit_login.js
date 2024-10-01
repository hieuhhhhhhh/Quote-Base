// send request to route api/login

async function submit(username, password, setMsg, setOk) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setOk(false);
      const data = await res.json();
      setMsg(data.error);
    }

    // submit accepted:
    setOk(true);
    setMsg(`Success: logged in ${username}`);

    // catch:
  } catch (e) {
    setOk(false);
    const error = JSON.parse(e.message);
    setMsg(error.details);
  }
}

export default submit;
