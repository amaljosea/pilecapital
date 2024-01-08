// src/components/AccountDropdown.tsx
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, ChangeEvent } from "react";

interface Account {
  id: string;
  name: string;
}

interface AccountDropdownProps {
  onSelectAccount: (accountId: string) => void;
}

const emptyArray: Account[] = [];

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  onSelectAccount,
}) => {
  const { isLoading, error, data } = useQuery<{ accounts: Account[] }>({
    queryKey: ["accounts"],
    queryFn: () => fetch("/api/accounts").then((res) => res.json()),
  });

  const accounts = data?.accounts || emptyArray;

  const [selectedAccount, setSelectedAccount] = useState<string>("");

  useEffect(() => {
    if (accounts.length > 0) {
      setSelectedAccount(accounts[0].id);
      onSelectAccount(accounts[0].id);
    }
  }, [accounts, onSelectAccount]);

  const handleAccountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedAccountId = e.target.value;
    setSelectedAccount(selectedAccountId);
    onSelectAccount(selectedAccountId);
  };

  return (
    <div>
      <label htmlFor="account">Select Account:</label>
      <select
        id="account"
        onChange={handleAccountChange}
        value={selectedAccount}
      >
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountDropdown;
