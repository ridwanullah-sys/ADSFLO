export default async function handler(req, res) {
  try {
    const data = await fetch(
      "https://nextjs-orpin-omega-98.vercel.app/api/restaurants"
    );
    const jsonData = await data.json();

    res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
