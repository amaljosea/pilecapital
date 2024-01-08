import { filterAccounts } from "./filterAccounts";

describe("filterAccounts", () => {
  const mockAccounts = [
    {
      IBAN: "DE03678822021961930232",
      balances: {
        available: {
          value: 80722.7,
          currency: "EUR",
        },
      },
      country: "DEU",
      createdAt: "2023-10-31T11:37:57.051Z",
      id: "2fd5e4e0-16e2-4337-b63d-22582d2623f5",
      name: "61tuh",
    },
    {
      IBAN: "DE56530041836982318248",
      balances: {
        available: {
          value: 123132.19,
          currency: "EUR",
        },
      },
      country: "DEU",
      createdAt: "2023-10-31T11:37:57.051Z",
      id: "5f1b6eb7-885f-4f85-af57-a4694ab62eec",
      name: "auu9v",
    },
  ];

  it("should filter accounts based on default options", () => {
    const result = filterAccounts({}, mockAccounts);
    expect(result).toEqual(mockAccounts);
  });

  it("should filter accounts based on minBalance", () => {
    const result = filterAccounts(
      {
        minBalance: 123132,
      },
      mockAccounts
    );
    expect(result).toEqual([mockAccounts[1]]);
  });

  it("should filter accounts based on maxBalance", () => {
    const result = filterAccounts(
      {
        maxBalance: 123132,
      },
      mockAccounts
    );
    expect(result).toEqual([mockAccounts[0]]);
  });

  it("should filter accounts based on both maxBalance and minBalance", () => {
    const result = filterAccounts(
      {
        maxBalance: 123132,
        minBalance: 123131,
      },
      mockAccounts
    );
    expect(result).toEqual([]);
  });
});
