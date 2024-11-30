import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./search_bar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    if (query) {
      router.push(`/pages/search/${query}`); // Redirects to the dynamic page with the search query
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        placeholder="Search Posts"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
        className={styles.SearchBar}
      />
      <button type="submit" className={styles.btnSubmit}>
        <FontAwesomeIcon title="Search" icon={faSearch} />
      </button>
    </form>
  );
}
