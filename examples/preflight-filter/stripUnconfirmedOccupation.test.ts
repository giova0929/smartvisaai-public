import { describe, expect, it } from "vitest";
import { stripUnconfirmedOccupation } from "./stripUnconfirmedOccupation";

describe("stripUnconfirmedOccupation", () => {
  it("removes an unconfirmed occupation", () => {
    const input = {
      occupation: { label: "Example occupation" },
      region: "Example region",
    };

    const result = stripUnconfirmedOccupation(input);

    expect(result).not.toHaveProperty("occupation");
  });

  it("keeps an occupation when confirmed is true", () => {
    const occupation = { label: "Example occupation", confirmed: true };
    const input = { occupation };

    const result = stripUnconfirmedOccupation(input);

    expect(result.occupation).toEqual(occupation);
  });

  it("leaves occupation absent when it was not provided", () => {
    const input = { region: "Example region" };

    const result = stripUnconfirmedOccupation(input);

    expect(result).not.toHaveProperty("occupation");
    expect(result).toEqual({ region: "Example region" });
  });

  it("removes an occupation when confirmed is false", () => {
    const input = {
      occupation: { label: "Example occupation", confirmed: false },
    };

    const result = stripUnconfirmedOccupation(input);

    expect(result).not.toHaveProperty("occupation");
  });

  it("does not mutate the input", () => {
    const input = {
      occupation: { label: "Example occupation", confirmed: false },
      region: "Example region",
    };
    const snapshot = structuredClone(input);

    const result = stripUnconfirmedOccupation(input);

    expect(input).toEqual(snapshot);
    expect(result).not.toBe(input);
  });

  it("keeps other fields", () => {
    const input = {
      occupation: { label: "Example occupation", confirmed: false },
      givenName: "Example",
      region: "Example region",
      answers: { english: "yes" },
    };

    const result = stripUnconfirmedOccupation(input);

    expect(result.givenName).toBe("Example");
    expect(result.region).toBe("Example region");
    expect(result.answers).toEqual({ english: "yes" });
    expect(result).not.toHaveProperty("occupation");
  });
});
