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
    const data = await res.json();

    // 1.0: Submit failed.
    if (!res.ok) {
      setOK(false);
      setMsg(data.error);
    }

    // 2.0: Submit accepted, token got:
    setOK(true);
    setMsg(data.message);

    //
  } catch (e) {
    setOK(false);
    const error = JSON.parse(e.message);
    setMsg(error.details);
  }
}

export default submit;
