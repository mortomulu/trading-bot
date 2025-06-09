import { NextApiRequest, NextApiResponse } from "next";
import { placeOrder } from "@/lib/binance";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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

  const orderPayload: any = {
    symbol,
    side: action.toUpperCase() === "BUY" ? "BUY" : "SELL",
    quantity,
    type: type || "MARKET",
  };

  try {
    const result = await placeOrder(orderPayload);

    await addDoc(collection(db, "orders"), {
      ...orderPayload,
      status: "SUCCESS",
      binanceResponse: result,
      createdAt: Timestamp.now(),
      from: "manual", 
    });

    return res.status(200).json({ message: "Order placed", result });
  } catch (err: any) {
    const errorData = err.response?.data || err.message;

    await addDoc(collection(db, "orders"), {
      ...orderPayload,
      status: "FAILED",
      error: errorData,
      createdAt: Timestamp.now(),
      from: "manual",
    });

    console.error("Error placing order:", errorData);
    return res.status(500).json({
      error: "Order failed",
      details: errorData,
    });
  }
}
