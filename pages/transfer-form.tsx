import TransferForm, { TransferFormData } from "@/components/TransferForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function TransferFormPage() {
  const router = useRouter();

  const { isLoading, error, data } = useQuery<{ accounts: Account[] }>({
    queryKey: ["accounts"],
    queryFn: () => fetch("/api/accounts").then((res) => res.json()),
  });

  const { mutate } = useMutation({
    onSuccess: (data) => {
      if (data.success) {
        router.push("/");
      }
    },
    mutationFn: (values: TransferFormData) =>
      fetch("/api/transfer-form", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      }).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";
  if (error) return "Error!";
  if (!data?.accounts) return "No data!";

  return (
    <TransferForm
      onSubmit={(values) => {
        mutate(values);
      }}
      accounts={data?.accounts}
    />
  );
}
