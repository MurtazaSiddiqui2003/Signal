import { PhoneLookup } from "@/components/phone-lookup";

const features = [
  { number: "01", title: "Understand a number", text: "Check international formatting and numbering-plan details." },
  { number: "02", title: "Share by choice", text: "Time-limited location sharing with trusted recipients is a future milestone." },
  { number: "03", title: "Keep control", text: "Clear permissions, transparent features and privacy-first defaults." },
];

export default function HomePage() {
  return <main>
    <header className="site-header">
      <a className="brand" href="#" aria-label="Signal home"><span className="brand-icon">S</span>signal<span className="brand-dot">.</span></a>
      <nav><a href="#number-check">Number check</a><a href="#features">Our approach</a></nav>
    </header>
    <section className="hero">
      <div>
        <p className="eyebrow">A LITTLE MORE CLARITY. MORE CONTROL.</p>
        <h1>Your phone.<br /><span>Your boundaries.</span></h1>
        <p className="hero-description">Useful phone tools built around a simple idea: you should always know what you’re sharing — and with whom.</p>
        <a className="primary-button" href="#number-check">Check a number ↗</a>
        <p className="privacy-note">No account needed for number lookup.</p>
      </div>
      <div className="hero-visual" aria-label="Privacy-focused illustration">
        <div className="visual-ring" /><div className="visual-ring ring-two" />
        <div className="visual-pin">S</div><div className="visual-label">Your data. Your choice.</div>
      </div>
    </section>
    <div className="section-wrap">
      <PhoneLookup />
      <section id="features" className="features">
        {features.map((feature) => <article className="feature" key={feature.number}><p className="eyebrow">{feature.number}</p><b>{feature.title}</b><p>{feature.text}</p></article>)}
      </section>
    </div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Signal</span><span>Useful tools. Clear boundaries. Built with privacy in mind.</span></footer>
  </main>;
}