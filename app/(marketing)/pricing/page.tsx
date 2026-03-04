import Link from 'next/link'
import { PricingCard } from '@/components/PricingCard'

const basicFeatures = [
  '5 trader follows',
  'Congress trades only',
  '90-day trade history',
  'Email alerts',
  'Daily digest emails',
]

const proFeatures = [
  'Unlimited trader follows',
  'Congress + Institutional + Insider',
  'Full trade history',
  'Instant SMS alerts',
  'Real-time feed',
  'Stock price overlays',
  'Priority support',
]

const faqs = [
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes. You can cancel your subscription at any time from your account settings. You will continue to have access until the end of your current billing period. We do not offer partial refunds for unused time.',
  },
  {
    question: 'How current is the trade data?',
    answer:
      'Congressional disclosures are ingested within minutes of being published on the House and Senate disclosure portals. SEC Form 4 (insider trades) and 13F filings (institutional) are processed as soon as they appear on EDGAR — typically within 15–30 minutes of the official filing time.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) via Stripe. All transactions are encrypted and we never store your card details on our servers.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Basic plan users get a 7-day free trial with no credit card required. Pro plan users get a 14-day free trial. After the trial period ends, you will be charged the standard monthly rate unless you cancel beforehand.',
  },
]

export default function PricingPage() {
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-20">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Choose the plan that fits your investing style. No hidden fees, no lock-in. Cancel any time.
          </p>
        </div>

        {/* ── Pricing Cards ── */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-24">
          <PricingCard
            name="Basic"
            price={29}
            description="Perfect for casual investors tracking Congress"
            features={basicFeatures}
            ctaText="Start Basic"
          />
          <PricingCard
            name="Pro"
            price={79}
            isPro
            isPopular
            description="Everything you need to track the smart money"
            features={proFeatures}
            ctaText="Go Pro"
          />
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently asked questions</h2>
            <p className="text-slate-400 mt-2 text-base">Still have questions? <Link href="/login" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">Contact support →</Link></p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-slate-800/50 transition-colors">
                  <span className="text-white font-medium text-sm sm:text-base">{faq.question}</span>
                  <span className="text-slate-400 shrink-0 text-lg transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/60 py-8 px-4 sm:px-6 mt-12">
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
