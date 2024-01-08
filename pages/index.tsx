import AccountDropdown from "@/components/AccountDropdown";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isLoading, error, data } = useQuery<{ accounts: Account[] }>({
    queryKey: ["accounts"],
    queryFn: () => fetch("/api/accounts").then((res) => res.json()),
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div>
        <AccountDropdown
          onSelectAccount={(id) => {
            console.log("id", id);
          }}
        />
        {data?.accounts.map((i) => (
          <div key={i.id}>{i.IBAN}</div>
        ))}
      </div>
      <div>{JSON.stringify(isLoading)}</div>
      <div>{JSON.stringify(error)}</div>
    </main>
  );
}
