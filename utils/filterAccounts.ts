interface FilterOptions {
  offset?: number;
  limit?: number;
  minBalance?: number;
  maxBalance?: number;
}

export const filterAccounts = (
  options: FilterOptions,
  accounts: Account[]
): { filteredAndPaginatedAccounts: Account[]; totalCount: number } => {
  const {
    offset = 0,
    limit = accounts.length,
    minBalance = 0,
    maxBalance = Number.MAX_SAFE_INTEGER,
  } = options;

  const filterd = accounts.filter(
    (account) =>
      account.balances.available.value >= minBalance &&
      account.balances.available.value <= maxBalance
  );
  const filteredAndPaginatedAccounts = filterd.slice(offset, offset + limit);

  return {
    filteredAndPaginatedAccounts,
    totalCount: filterd.length,
  };
};
