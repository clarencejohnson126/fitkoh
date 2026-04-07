import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-dark">
      {/* Top gradient border */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #009966, #de5f04, transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Left — Brand */}
          <div>
            <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl tracking-wide text-white">
              REBELZ AI{" "}
              <span className="text-green">AGENCY</span>
            </h3>
            <p className="mt-3 text-white/70 text-sm leading-relaxed max-w-xs">
              We build AI that runs your business.
            </p>
            <p className="mt-6 text-xs text-white/40 tracking-wide">
              From chatbots to full automation &mdash; powered by the latest in
              artificial intelligence.
            </p>
          </div>

          {/* Middle — Quick links */}
          <div>
            <h4 className="font-[var(--font-display)] text-lg tracking-wider text-white mb-5">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-green transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Contact */}
          <div>
            <h4 className="font-[var(--font-display)] text-lg tracking-wider text-white mb-5">
              CONTACT
            </h4>
            <p className="text-sm text-white/70 mb-4">
              Built for FitKoh &amp; Lionheart Samui
            </p>

            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/66808848280"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-green transition-colors duration-200"
                >
                  <Phone size={15} className="text-green shrink-0" />
                  +66 80 884 82 80
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fitkoh.com"
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-green transition-colors duration-200"
                >
                  <Mail size={15} className="text-green shrink-0" />
                  info@fitkoh.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2.5 text-sm text-white/70">
                  <MapPin size={15} className="text-green shrink-0" />
                  Koh Samui, Thailand
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 tracking-wide">
            Powered by Rebelz AI
          </p>
          <p className="text-xs text-white/40">
            &copy; 2026 Rebelz AI Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
