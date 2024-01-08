import { filterAccounts } from "./filterAccounts";
import accountsData from "@/data/accounts.json";

const accounts = accountsData.data;

describe("filterAccounts", () => {
  it("should filter accounts based on default options", () => {
    const result = filterAccounts({}, accounts);
    expect(result).toEqual(accounts);
  });

  it("should filter accounts when offset=0 and limit=0", () => {
    const result = filterAccounts(
      {
        offset: 0,
        limit: 0,
      },
      accounts
    );
    expect(result).toEqual([]);
  });

  it("should filter accounts when offset=1 and limit=0", () => {
    const result = filterAccounts(
      {
        offset: 1,
        limit: 0,
      },
      accounts
    );
    expect(result).toEqual([]);
  });

  it("should filter accounts when offset=1 and limit=0", () => {
    const result = filterAccounts(
      {
        offset: 1,
        limit: 0,
      },
      accounts
    );
    expect(result).toEqual([]);
  });

  it("should filter accounts when offset=1 and limit=1", () => {
    const result = filterAccounts(
      {
        offset: 1,
        limit: 1,
      },
      accounts
    );
    expect(result).toEqual([accounts[1]]);
  });

  it("should filter accounts when offset=0 and limit=1", () => {
    const result = filterAccounts(
      {
        offset: 0,
        limit: 1,
      },
      accounts
    );
    expect(result).toEqual([accounts[0]]);
  });

  it("should filter accounts when offset=2 and limit=2", () => {
    const result = filterAccounts(
      {
        offset: 2,
        limit: 2,
      },
      accounts
    );
    expect(result).toEqual([accounts[2], accounts[3]]);
  });
});
