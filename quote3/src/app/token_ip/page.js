export default function About() {
  console.log(process.env.SUPABASE_URL);
  return (
    <div>
      <p>Token: </p>
      <p>IP address: </p>
    </div>
  );
}
