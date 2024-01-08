// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import accounts from "@/data/accounts.json";

type Data = {
  accounts?: Account[];
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).send({ error: "Only GET requests allowed" });
    return;
  }
  res.status(200).json({ accounts: accounts.data });
}
