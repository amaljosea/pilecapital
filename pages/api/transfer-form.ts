import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success?: boolean;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).send({ error: "Only POST requests allowed" });
    return;
  }
  console.log(req.body);
  res.status(200).json({ success: true });
}
