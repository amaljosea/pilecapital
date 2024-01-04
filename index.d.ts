type Account = {
  IBAN: string;
  balances: {
    available: {
      value: number;
      currency: string;
    };
  };
  country: string;
  createdAt: string;
  id: string;
  name: string;
};
