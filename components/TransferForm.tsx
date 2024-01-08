import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface TransferFormData {
  sourceAccount: string;
  amount: number;
  recipientName: string;
  targetIBAN: string;
  targetBIC: string;
  reference: string;
}

interface TransferFormProps {
  onSubmit: SubmitHandler<TransferFormData>;
  accounts: Account[];
}

const TransferForm: React.FC<TransferFormProps> = ({ onSubmit, accounts }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormData>({ mode: "onChange" });

  const handleFormSubmit: SubmitHandler<TransferFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="sourceAccount">Source Account:</label>
      <select
        id="sourceAccount"
        {...register("sourceAccount", { required: true })}
      >
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </select>
      {errors.sourceAccount && <span>This field is required</span>}

      <label htmlFor="amount">Amount (EUR):</label>
      <input
        type="number"
        id="amount"
        {...register("amount", { required: true })}
      />
      {errors.amount && <span>This field is required</span>}

      <label htmlFor="recipientName">Recipient Name:</label>
      <input
        type="text"
        id="recipientName"
        {...register("recipientName", { required: true })}
      />
      {errors.recipientName && <span>This field is required</span>}

      <label htmlFor="targetIBAN">Target IBAN:</label>
      <input
        type="text"
        id="targetIBAN"
        {...register("targetIBAN", { required: true })}
      />
      {errors.targetIBAN && <span>This field is required</span>}

      <label htmlFor="targetBIC">Target BIC:</label>
      <input
        type="text"
        id="targetBIC"
        {...register("targetBIC", { required: true })}
      />
      {errors.targetBIC && <span>This field is required</span>}

      <label htmlFor="reference">Reference:</label>
      <input
        type="text"
        id="reference"
        {...register("reference", { required: true })}
      />
      {errors.reference && <span>This field is required</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default TransferForm;
