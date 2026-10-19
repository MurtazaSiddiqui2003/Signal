import { describe, expect, it } from "vitest";
import { lookupPhoneNumber } from "./phone-lookup";

describe("lookupPhoneNumber", () => {
  it("rejects empty input", () => {
    expect(lookupPhoneNumber("")).toMatchObject({ parsed: false });
  });

  it("parses an international Pakistani number", () => {
    const result = lookupPhoneNumber("+923001234567");
    expect(result.parsed).toBe(true);
    if (result.parsed) {
      expect(result.country).toBe("PK");
      expect(result.callingCode).toBe("+92");
      expect(result.e164).toBe("+923001234567");
      expect(result.isPossible).toBe(true);
    }
  });

  it("supports a selected default country", () => {
    const result = lookupPhoneNumber("2025550123", "US");
    expect(result.parsed).toBe(true);
    if (result.parsed) {
      expect(result.country).toBe("US");
      expect(result.callingCode).toBe("+1");
    }
  });

  it("rejects an implausibly short number", () => {
    const result = lookupPhoneNumber("123", "PK");
    expect(result.parsed).toBe(true);
    if (result.parsed) {
      expect(result.isPossible).toBe(false);
      expect(result.isValid).toBe(false);
    }
  });
});
