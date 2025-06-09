import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const BASE_URL = process.env.BINANCE_API_URL!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "Missing or invalid symbol" });
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/v3/ticker/price?symbol=${symbol}`
    );

    res.status(200).json({ price: response.data.price });
  } catch (err: any) {
    console.error("Market price fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch market price" });
  }
}
