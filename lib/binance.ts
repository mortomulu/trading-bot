import axios from "axios";
import crypto from "crypto";

const API_KEY = process.env.BINANCE_API_KEY!;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY!;
const BASE_URL = process.env.BINANCE_API_URL!;

async function getServerTime() {
  const res = await axios.get(`${BASE_URL}/v3/time`);
  return res.data.serverTime;
}

export async function placeOrder({
  symbol,
  side,
  quantity,
  type = "MARKET",
}: {
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  type?: string;
}) {
  const serverTime = await getServerTime();

  const params: Record<string, string> = {
    symbol,
    side,
    type,
    quantity: quantity.toString(),
    timestamp: serverTime.toString(),
    recvWindow: "10000",
  };

  const queryString = new URLSearchParams(params).toString();
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(queryString)
    .digest("hex");

  const url = `${BASE_URL}/v3/order?${queryString}&signature=${signature}`;

  try {
    const response = await axios.post(url, undefined, {
      headers: {
        "X-MBX-APIKEY": API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Binance API Error:", error.response?.data || error.message);
    throw error;
  }
}
