const validate = async (event, username, setResultMessage) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Check if username is provided
  if (!username) {
    setResultMessage("Please enter a username.");
    return;
  }

  try {
    // Make a GET request to the API route
    const response = await fetch(
      `/api/validate_username?username=${encodeURIComponent(username)}`
    );
    const data = await response.json();

    if (response.ok) {
      if (data.exists) {
        setResultMessage("Username is already taken.");
      } else {
        setResultMessage("Username is available.");
        // Proceed with form submission or other logic
      }
    } else {
      setResultMessage(`Error: ${data.error}`);
    }
  } catch (error) {
    setResultMessage(`Error: ${error.message}`);
  }
};

export default validate;
