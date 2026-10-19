"use client";

import { useState, type FormEvent } from "react";
import { getCountries, type CountryCode } from "libphonenumber-js/max";
import { lookupPhoneNumber } from "@/lib/phone-lookup";

const names = new Intl.DisplayNames(["en"], { type: "region" });

export function PhoneLookup() {
  const [input, setInput] = useState("");
  const [country, setCountry] = useState<CountryCode>("PK");
  const [checked, setChecked] = useState(false);
  const countries = getCountries().map((code) => ({ code, name: names.of(code) ?? code })).sort((a, b) => a.name.localeCompare(b.name));
  const result = checked ? lookupPhoneNumber(input, country) : null;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChecked(true);
  }

  return <section className="lookup-card" id="number-check">
    <div className="eyebrow">NUMBER DESK · FREE</div>
    <h2>Know the number.<br /><span>Not someone’s secrets.</span></h2>
    <p className="muted">Check number format, numbering region and type where available. This tool does not identify a number’s owner.</p>
    <form className="lookup-form" onSubmit={submit}>
      <label className="field" htmlFor="country">Default country
        <select id="country" value={country} onChange={(event) => { setCountry(event.target.value as CountryCode); setChecked(false); }}>
          {countries.map(({ code, name }) => <option key={code} value={code}>{name} ({code})</option>)}
        </select>
      </label>
      <label className="field" htmlFor="phone">Phone number
        <input id="phone" inputMode="tel" autoComplete="tel" placeholder="+92 300 1234567" value={input} onChange={(event) => { setInput(event.target.value); setChecked(false); }} />
      </label>
      <button type="submit">Check number</button>
    </form>
    {result && <div className="result" role="status" aria-live="polite">
      {!result.parsed ? <><strong>We couldn’t parse that number</strong><p className="muted">{result.message}</p></> : <>
        <strong>{result.isValid ? "Number format looks valid" : result.isPossible ? "Possible number format" : "Number format may be invalid"}</strong>
        <div className="result-grid">
          <div className="result-item"><small>International format</small><strong>{result.international}</strong></div>
          <div className="result-item"><small>Country / region</small><strong>{result.country ?? "Not available"}</strong></div>
          <div className="result-item"><small>Calling code</small><strong>{result.callingCode}</strong></div>
          <div className="result-item"><small>Number type</small><strong>{result.type ?? "Not available"}</strong></div>
        </div>
        <p className="muted">This checks numbering metadata only. It cannot confirm ownership, carrier, active service or physical location.</p>
      </>}
    </div>}
  </section>;
}