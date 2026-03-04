'use client'

import { useState } from 'react'
import { Bell, CreditCard, User, Shield, Phone, Mail, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export default function AccountPage() {
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Account Settings</h1>
        <p className="text-slate-400 mt-1">Manage your profile, subscription, and alerts.</p>
      </div>

      {/* Profile */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-slate-400" />
          <h2 className="font-semibold text-white">Profile</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1.5">Full Name</label>
            <input
              type="text"
              defaultValue="Alex Johnson"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1.5">Email</label>
            <input
              type="email"
              defaultValue="alex@example.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1.5">Phone (for SMS alerts)</label>
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <p className="text-slate-500 text-xs mt-1.5">Required for SMS alerts (Pro plan only)</p>
          </div>
        </div>
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={handleSave}>
            {saved ? <><Check className="w-3.5 h-3.5" /> Saved!</> : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-4 h-4 text-slate-400" />
          <h2 className="font-semibold text-white">Subscription</h2>
        </div>
        <div className="flex items-center justify-between p-4 bg-indigo-950/50 border border-indigo-500/30 rounded-xl mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">Pro Plan</span>
              <Badge variant="pro">ACTIVE</Badge>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">$79/month · Renews March 15, 2026</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">$79</div>
            <div className="text-slate-500 text-xs">/month</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">Manage Billing</Button>
          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">Cancel Subscription</Button>
        </div>
      </div>

      {/* Alert Preferences */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-slate-400" />
          <h2 className="font-semibold text-white">Alert Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-white text-sm font-medium">Email Alerts</span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5 ml-6">Daily digest of new trades from followed traders</p>
            </div>
            <button
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${emailEnabled ? 'bg-indigo-600' : 'bg-slate-700'}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${emailEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-white text-sm font-medium">SMS Alerts</span>
                <Badge variant="pro">Pro</Badge>
              </div>
              <p className="text-slate-500 text-xs mt-0.5 ml-6">Instant text when a followed trader files a new trade</p>
            </div>
            <button
              onClick={() => setSmsEnabled(!smsEnabled)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${smsEnabled ? 'bg-indigo-600' : 'bg-slate-700'}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${smsEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={handleSave}>
            {saved ? <><Check className="w-3.5 h-3.5" /> Saved!</> : 'Save Preferences'}
          </Button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-slate-400" />
          <h2 className="font-semibold text-white">Security</h2>
        </div>
        <div className="space-y-3">
          <Button variant="outline" size="sm">Change Password</Button>
          <div className="text-slate-500 text-xs">Last login: Today at 9:34 AM</div>
        </div>
      </div>
    </div>
  )
}
