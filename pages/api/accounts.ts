// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import accountsData from "@/data/accounts.json";
import { filterAccounts } from "@/utils/filterAccounts";

const accounts = accountsData.data;

type Data = {
  accounts?: Account[];
  error?: string;
  totalCount?: number;
};

const parseNumberQueryParam = (
  n: string | string[] | undefined
): number | undefined => {
  let parsedNumber = undefined;
  if (typeof n === "string") {
    const number = Number(n);
    if (!Number.isNaN(number)) {
      parsedNumber = number;
    }
  }
  return parsedNumber;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).send({ error: "Only GET requests allowed" });
    return;
  }
  const { query } = req;

  const { offset, limit, minBalance, maxBalance } = query;

  const { filteredAndPaginatedAccounts, totalCount } = filterAccounts(
    {
      offset: parseNumberQueryParam(offset),
      limit: parseNumberQueryParam(limit),
      minBalance: parseNumberQueryParam(minBalance),
      maxBalance: parseNumberQueryParam(maxBalance),
    },
    accounts
  );

  res.status(200).json({ accounts: filteredAndPaginatedAccounts, totalCount });
}
