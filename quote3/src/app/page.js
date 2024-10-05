// app/page.js
import styles from './HomePage.module.css'; 

function HomePage() {
  const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Life is what happens when you’re busy making other plans. – John Lennon",
    "Do not go where the path may lead, go instead where there is no path and leave a trail. – Ralph Waldo Emerson",
    "It is never too late to be what you might have been. – George Eliot",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "Get busy living or get busy dying. – Stephen King",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "Believe you can and you’re halfway there. – Theodore Roosevelt",
    "Act as if what you do makes a difference. It does. – William James",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  ]; 

  const colors = [
    "#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", 
    "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9"
  ]; 

  return (
    <div className={styles.container}>
      <div className={styles.quotesContainer}>
        {quotes.map((quote, index) => (
          <div 
            key={index} 
            className={styles.quoteCard}
            style={{ backgroundColor: colors[index % colors.length] }} 
          >
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage;

