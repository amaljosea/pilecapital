import AccountDropdown from "@/components/AccountDropdown";
import TransferForm from "@/components/TransferForm";
import { useQuery } from "@tanstack/react-query";

export default function TransferFormPage() {
  const { isLoading, error, data } = useQuery<{ accounts: Account[] }>({
    queryKey: ["accounts"],
    queryFn: () => fetch("/api/accounts").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";
  if (error) return "Error!";
  if (!data?.accounts) return "No data!";

  return (
    <TransferForm
      onSubmit={(value) => {
        console.log("values", value);
      }}
      accounts={data?.accounts}
    />
  );
}
