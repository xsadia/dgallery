import type { Config } from "jest";

const config: Config = {
  verbose: true,
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
