import { useQuery } from "@tanstack/react-query";
import { apis } from "@/utils/apis";

export default function Accounts() {
  const { isLoading, error, data } = useQuery<{ accounts: Account[] }>({
    queryKey: ["accounts"],
    queryFn: apis.get("/api/accounts"),
  });

  if (isLoading) return "Loading...";
  if (error) return "Error!";
  if (!data?.accounts) return "No data!";

  return (
    <div>
      {data.accounts.map((account) => (
        <div className="flex" key={account.name}>
          <div>{account.name}</div>
          <div className="ml-2">{account.balances.available.value}</div>
        </div>
      ))}
    </div>
  );
}
