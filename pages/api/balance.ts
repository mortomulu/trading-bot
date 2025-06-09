import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import crypto from "crypto";

const API_KEY = process.env.BINANCE_API_KEY!;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY!;
const BASE_URL = process.env.BINANCE_API_URL!;

async function getServerTime() {
  const res = await axios.get(`${BASE_URL}/v3/time`);
  return res.data.serverTime;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serverTime = await getServerTime();

  const queryString = `timestamp=${serverTime.toString()}`;

  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(queryString)
    .digest("hex");

  const url = `${BASE_URL}/v3/account?${queryString}&signature=${signature}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-MBX-APIKEY": API_KEY,
      },
    });

    const balances = response.data.balances.filter(
      (asset: any) => parseFloat(asset.free) > 0 || parseFloat(asset.locked) > 0
    );

    res.status(200).json({ balances });
  } catch (err: any) {
    console.error("Error fetching balance:", err.response?.data || err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch balance", detail: err.response?.data });
  }
}
