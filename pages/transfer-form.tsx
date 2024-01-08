import TransferForm, { TransferFormData } from "@/components/TransferForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apis } from "@/utils/apis";

export default function TransferFormPage() {
  const router = useRouter();

  const { isLoading, error, data } = useQuery<{ accounts: Account[] }>({
    queryKey: ["accounts"],
    queryFn: apis.get("/api/accounts"),
  });

  const { mutate } = useMutation({
    onSuccess: (data) => {
      if (data.success) {
        alert("Form submitted!");
        router.push("/");
      }
    },
    mutationFn: apis.post("/api/transfer-form"),
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
