interface FilterOptions {
  offset?: number;
  limit?: number;
  minBalance?: number;
  maxBalance?: number;
}

export const filterAccounts = (
  options: FilterOptions,
  accounts: Account[]
): Account[] => {
  const {
    offset = 0,
    limit = accounts.length,
    minBalance = 0,
    maxBalance = Number.MAX_SAFE_INTEGER,
  } = options;

  return accounts
    .slice(offset, offset + limit)
    .filter(
      (account) =>
        account.balances.available.value >= minBalance &&
        account.balances.available.value <= maxBalance
    );
};
