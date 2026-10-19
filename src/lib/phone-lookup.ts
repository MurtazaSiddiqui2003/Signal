import {
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/max";

export function lookupPhoneNumber(
  input: string,
  defaultCountry: CountryCode = "PK",
) {
  const value = input.trim();

  if (!value) {
    return { parsed: false as const, message: "Enter a phone number." };
  }

  const phone = parsePhoneNumberFromString(value, defaultCountry);

  if (!phone) {
    return {
      parsed: false as const,
      message: "Could not parse this phone number.",
    };
  }

  return {
    parsed: true as const,
    e164: phone.number,
    international: phone.formatInternational(),
    national: phone.formatNational(),
    isPossible: phone.isPossible(),
    isValid: phone.isValid(),
    country: phone.country ?? null,
    callingCode: `+${phone.countryCallingCode}`,
    type: phone.getType() ?? null,
  };
}
