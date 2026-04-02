import { useState } from 'react'
import { Link } from 'react-router-dom'

type SubscriptionType = 'monthly' | 'annual'

const DiasporaCommunity = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    countryOfResidence: '',
    profession: '',
    whyJoin: '',
    passport: null as File | null,
  })

  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>('monthly')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, [name]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', { ...formData, subscriptionType })
      alert('Redirecting to payment page...')
      setIsLoading(false)
      // In a real app, this would redirect to payment gateway
    }, 1000)
  }

  const subscriptionPlans = {
    monthly: {
      price: 10,
      period: 'month',
      description: 'Stay connected with Ethiopia with a flexible monthly membership.',
    },
    annual: {
      price: 100,
      period: 'year',
      description: 'Best value for dedicated members who want year-round engagement.',
    },
  }

  return (
    <div className="page-shell min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl text-slate-900 md:text-5xl mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Diaspora</span> Premium Community
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-3">
            Choose Your Subscription
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select Monthly or Annual membership. You'll be taken to a payment summary with an invoice-style receipt.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Subscription Selection - First */}
          <div className="form-shell p-8 md:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Choose Your Subscription
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Monthly Plan */}
              <div
                onClick={() => setSubscriptionType('monthly')}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                  subscriptionType === 'monthly'
                    ? 'choice-tile border-yellow-400 bg-yellow-50 shadow-md'
                    : 'choice-tile border-slate-300 hover:border-yellow-300'
                }`}
              >
                {subscriptionType === 'monthly' && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold">
                      Selected
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Monthly</h4>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                    {subscriptionPlans.monthly.price} USD / {subscriptionPlans.monthly.period}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  {subscriptionPlans.monthly.description}
                </p>
              </div>

              {/* Annual Plan */}
              <div
                onClick={() => setSubscriptionType('annual')}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                  subscriptionType === 'annual'
                    ? 'choice-tile border-yellow-400 bg-yellow-50 shadow-md'
                    : 'choice-tile border-slate-300 hover:border-yellow-300'
                }`}
              >
                {subscriptionType === 'annual' && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold">
                      Selected
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Annual</h4>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                    {subscriptionPlans.annual.price} USD / {subscriptionPlans.annual.period}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  {subscriptionPlans.annual.description}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Plan Summary */}
          <div className="soft-panel rounded-2xl border-2 border-yellow-300 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Selected Plan</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold text-slate-900 capitalize">
                  {subscriptionType} — {subscriptionPlans[subscriptionType].price} USD / {subscriptionPlans[subscriptionType].period}
                </p>
              </div>
            </div>
            <p className="text-slate-600 text-sm">
              After submitting your details, you'll be redirected to the payment options page to complete your subscription.
            </p>
          </div>

          {/* Member Details Section */}
          <div className="form-shell p-8 md:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Member Details
            </h3>
            <p className="text-slate-600 mb-6">
              Tell us a bit about yourself so we can personalize your diaspora experience.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  WhatsApp <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Enter your WhatsApp"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Telegram */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Telegram <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  placeholder="Enter your Telegram"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Country of Residence */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Country of Residence <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="countryOfResidence"
                  value={formData.countryOfResidence}
                  onChange={handleChange}
                  required
                  placeholder="Enter your country of residence"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Profession / Expertise */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Profession / Expertise <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Enter your profession or expertise"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Why do you want to join */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Why do you want to join? <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <textarea
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us why you want to join the diaspora community"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Passport / Yellow Card */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Attach Passport / Yellow Card <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <input
                  type="file"
                  name="passport"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                <p className="text-xs text-slate-500 mt-1">
                  You can upload a passport or yellow card now or share it later during onboarding.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 py-3 px-6 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold text-center hover:bg-slate-50 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Continue to Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DiasporaCommunity
