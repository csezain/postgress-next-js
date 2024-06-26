import { client } from "@/db/db";
import { revalidatePath } from "next/cache";

async function sendTweet(formData) {
  "use server";
  const tweet = formData.get("tweet");

  // await client.query("INSERT INTO users (username) values ($1)", ["Zain"]);

  await client.query(
    "INSERT INTO tweets (tweet_text,user_id) VALUES ($1, $2)",
    [tweet, 1]
  );
  revalidatePath("/");
}

export default async function Home() {
  const data = await client.query("SELECT * FROM tweets");

  return (
    <main className="flex flex-col max-w-md mx-auto items-center justify-center min-h-screen">
      <div className="w-full">
        <h1 className="text-2xl font-bold">My Tweets</h1>
        <ul>
          {data.rows.map(({ tweet_text }, ind) => (
            <li key={ind}>{tweet_text}</li>
          ))}
        </ul>
      </div>

      <form action={sendTweet} className="w-full mt-10">
        <input
          type="text"
          name="tweet"
          className="border"
          placeholder="Enter Tweet"
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
