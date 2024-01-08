import React from "react";
import { useForm, SubmitHandler, FieldValues, useWatch } from "react-hook-form";

export interface TransferFormData {
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

const emptyMessage = (
  <span className="text-red-800">This field is required</span>
);
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
    <div className="p-5">
      <h1 className="text-lg font-bold">Transfer Form</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="sourceAccount">Source Account:</label>
        <select
          className="border-solid border-2 border-indigo-600 rounded h-10"
          id="sourceAccount"
          {...register("sourceAccount", { required: true })}
        >
          {[
            {
              name: null,
              id: undefined,
            },
            ...accounts,
          ].map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        {errors.sourceAccount && emptyMessage}

        <label htmlFor="amount">Amount (EUR):</label>
        <input
          className="border-solid border-2 border-indigo-600 rounded h-10"
          type="number"
          id="amount"
          {...register("amount", { required: true })}
        />
        {errors.amount && emptyMessage}

        <label htmlFor="recipientName">Recipient Name:</label>
        <input
          className="border-solid border-2 border-indigo-600 rounded h-10"
          type="text"
          id="recipientName"
          {...register("recipientName", { required: true })}
        />
        {errors.recipientName && emptyMessage}

        <label htmlFor="targetIBAN">Target IBAN:</label>
        <input
          className="border-solid border-2 border-indigo-600 rounded h-10"
          type="text"
          id="targetIBAN"
          {...register("targetIBAN", { required: true })}
        />
        {errors.targetIBAN && (
          <span className="text-red-800">This field is required</span>
        )}

        <label htmlFor="targetBIC">Target BIC:</label>
        <input
          className="border-solid border-2 border-indigo-600 rounded h-10"
          type="text"
          id="targetBIC"
          {...register("targetBIC", { required: true })}
        />
        {errors.targetBIC && emptyMessage}

        <label htmlFor="reference">Reference:</label>
        <input
          className="border-solid border-2 border-indigo-600 rounded h-10"
          type="text"
          id="reference"
          {...register("reference", { required: true })}
        />
        {errors.reference && emptyMessage}

        <button
          type="submit"
          className="mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
