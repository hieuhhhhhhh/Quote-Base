// send request to route api/login

async function submit(username, password, setMsg) {
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
      const data = await res.json();
      setMsg(data.error);

      return false;
    }

    // submit accepted:
    setMsg(`Success: logged in ${username}`);

    return true;
    // catch:
  } catch (e) {
    const error = e.message;
    setMsg(error.details);

    return false;
  }
}

export default submit;
