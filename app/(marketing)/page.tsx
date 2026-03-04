import Link from 'next/link'

const mockTrades = [
  { label: 'Pelosi bought NVDA $1M–$5M', age: '2d ago', type: 'buy' },
  { label: 'Buffett added AAPL $500M+', age: '4d ago', type: 'buy' },
  { label: 'Insider sold META $2M–$10M', age: '5d ago', type: 'sell' },
]

const steps = [
  {
    number: '1',
    title: 'We Monitor Filings',
    description:
      'Our system continuously scans SEC EDGAR, congressional disclosures, and institutional 13F filings the moment they are submitted.',
  },
  {
    number: '2',
    title: 'Get Instant Alerts',
    description:
      'Receive real-time push notifications, SMS, or email alerts whenever a tracked trader makes a move — before it hits the news.',
  },
  {
    number: '3',
    title: 'Act on Insights',
    description:
      'View full trade context, historical patterns, and stock price overlays to make informed decisions with confidence.',
  },
]

const features = [
  {
    icon: '🏛️',
    title: 'Congress Trades',
    description:
      'Track every House and Senate disclosure filed under the STOCK Act. 535 lawmakers, all transactions, zero lag.',
  },
  {
    icon: '🏦',
    title: 'Institutional 13F',
    description:
      'Follow hedge funds, asset managers, and family offices as they report quarterly positions to the SEC.',
  },
  {
    icon: '📋',
    title: 'Insider Form 4',
    description:
      "Monitor C-suite executives and board members buying or selling their own company's stock.",
  },
  {
    icon: '🔔',
    title: 'Real-time Alerts',
    description:
      'Customizable watchlists with instant notifications across email, SMS, and in-app push — never miss a move.',
  },
]

const pricingTiers = [
  {
    name: 'Basic',
    price: '$29',
    description: 'Everything you need to start following the smart money.',
    features: ['5 trader follows', 'Congress trades only', '90-day trade history', 'Email alerts', 'Daily digest emails'],
  },
  {
    name: 'Pro',
    price: '$79',
    popular: true,
    description: 'Full access for serious investors who want every edge.',
    features: [
      'Unlimited trader follows',
      'Congress + Institutional + Insider',
      'Full trade history',
      'Instant SMS alerts',
      'Real-time feed',
      'Stock price overlays',
      'Priority support',
    ],
  },
]

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            🚀 Moonshot
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-24 pb-28 px-4 sm:px-6">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="w-[800px] h-[400px] bg-indigo-700/20 rounded-full blur-3xl -translate-y-1/4" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              🔥 Live congressional filings — no delay
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Track What the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                Insiders
              </span>{' '}
              Are Buying
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Follow Congress, institutions, and corporate insiders in real time — before the public
              even knows they moved. Moonshot surfaces the trades that matter, the moment they're
              filed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-base shadow-lg shadow-indigo-500/20"
              >
                Start Tracking Free
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/feed"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-base"
              >
                View Live Feed
              </Link>
            </div>

            {/* Mock trade pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {mockTrades.map((trade) => (
                <span
                  key={trade.label}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${
                    trade.type === 'buy'
                      ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/60 border-red-500/30 text-red-300'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      trade.type === 'buy' ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                  />
                  {trade.label}
                  <span className="text-slate-400 font-normal">· {trade.age}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-24 px-4 sm:px-6 border-t border-slate-800/60">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">From filing to your feed in minutes</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-5">
                    <span className="text-indigo-400 font-bold text-lg">{step.number}</span>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-24 px-4 sm:px-6 border-t border-slate-800/60">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Everything you need to follow the smart money</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feat) => (
                <div
                  key={feat.title}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
                >
                  <div className="text-3xl mb-4">{feat.icon}</div>
                  <h3 className="text-white font-semibold text-base mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Condensed Pricing ── */}
        <section className="py-24 px-4 sm:px-6 border-t border-slate-800/60">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Simple, transparent pricing</h2>
              <p className="text-slate-400 mt-3 text-base">No hidden fees. Cancel any time.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-6 border ${
                    tier.popular
                      ? 'bg-indigo-950/50 border-indigo-500/40 shadow-xl shadow-indigo-500/10'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${tier.popular ? 'text-indigo-400' : 'text-slate-400'}`}>
                    {tier.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-slate-400 text-sm">/mo</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-5">{tier.description}</p>
                  <Link
                    href="/register"
                    className={`block w-full text-center text-sm font-semibold py-2.5 rounded-xl transition-colors mb-5 ${
                      tier.popular
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    {tier.popular ? 'Go Pro' : 'Start Basic'}
                  </Link>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className={tier.popular ? 'text-indigo-400' : 'text-emerald-400'}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/pricing" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4">
                See full pricing &amp; FAQ →
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/60 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span className="font-semibold text-slate-400">🚀 Moonshot</span>
          <span>© 2025 Moonshot. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
