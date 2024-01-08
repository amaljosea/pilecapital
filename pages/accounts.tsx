import { useQuery } from "@tanstack/react-query";
import { apis } from "@/utils/apis";
import { useEffect, useMemo, useState } from "react";

const defaultParams = {
  offset: 0,
  limit: 10,
  minBalance: 100,
  maxBalance: 999999,
};

type Keys = keyof typeof defaultParams;
const queryFields: Keys[] = ["offset", "limit", "minBalance", "maxBalance"];

export default function Accounts() {
  const [params, setParams] = useState(defaultParams);

  const { isLoading, error, data, refetch } = useQuery<{
    accounts: Account[];
    totalCount: number;
  }>({
    queryKey: ["accounts", params],
    queryFn: apis.get(
      `/api/accounts?offset=${params.offset}&limit=${params.limit}&minBalance=${params.minBalance}&maxBalance=${params.maxBalance}`
    ),
  });

  if (isLoading) return "Loading...";
  if (error) return "Error!";
  if (!data?.accounts) return "No data!";

  return (
    <div>
      <div className="flex justify-center p-5">
        {queryFields.map((i) => (
          <div className="p-5" key={i}>
            <label htmlFor={i}>{i}</label>
            <input
              id={i}
              value={params[i]}
              onChange={(e) => {
                setParams({ ...params, [i]: e.target.value });
              }}
              className="m-5 border-solid border-2 border-indigo-600 rounded h-10"
              type="number"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center flex-col items-center">
        <button
          onClick={() => {
            setParams(defaultParams);
          }}
        >
          Clear
        </button>
        <p>Total Count: {data.totalCount}</p>
      </div>
      <div className="flex justify-center">
        <table>
          <tr>
            <th>Name</th>
            <th>Balance</th>
            <th>Currency</th>
          </tr>
          {data.accounts.map((account) => (
            <tr key={account.name}>
              <td>{account.name}</td>
              <td>{account.balances.available.value}</td>
              <td>{account.balances.available.currency}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
