// send request to route api/login

async function submit(username, password, setMsg, setOK) {
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
      setOK(false);
      const data = await res.json();
      setMsg(data.error);
    }

    // submit accepted:
    setOK(true);
    setMsg(`Success: logged in ${username}`);

    // catch:
  } catch (e) {
    setOK(false);
    const error = JSON.parse(e.message);
    setMsg(error.details);
  }
}

export default submit;
