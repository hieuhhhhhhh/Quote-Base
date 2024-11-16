// send request to route api/signup/additional_info

async function submitInfo(alias, bio, setMsg, setOK) {
  try {
    const res = await fetch(
      "/api/authentication/signup/additional_info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alias, bio }),
      }
    );

    if (!res.ok) {
      setOK(false);
      const data = await res.json();
      if (data.code === "23505") {
        setMsg("Alias already taken. Please enter a different one.");
      } else setMsg(data.details);

      return;
    }

    // submit accepted:
    setOK(true);
    setMsg(`Success: additional user info was saved`);

    // catch:
  } catch (e) {
    setOK(false);
    //const error = JSON.parse(e.message);
    const error = e.message;
    setMsg(error.details);
  }
}

export default submitInfo;
