import { NextApiRequest, NextApiResponse } from "next";
import { placeOrder } from "../../lib/binance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { action, symbol, quantity, type } = req.body;

  if (!action || !symbol || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await placeOrder({
      symbol,
      side: action.toUpperCase() === "BUY" ? "BUY" : "SELL",
      quantity,
      type: type || "MARKET",
    });

    return res.status(200).json({ message: "Order placed", result });
  } catch (err: any) {
    console.error("Error placing order:", err.response?.data || err.message);
    return res
      .status(500)
      .json({
        error: "Order failed",
        details: err.response?.data || err.message,
      });
  }
}
