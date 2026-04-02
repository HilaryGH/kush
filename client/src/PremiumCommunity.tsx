import { useState } from 'react'
import { Link } from 'react-router-dom'

type SubscriptionPlan = 'individual-monthly' | 'individual-yearly' | 'corporate-monthly' | 'corporate-yearly'

const PremiumCommunity = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    renewalStatus: 'New Membership',
    wellnessGoals: '',
  })

  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>('individual-monthly')
  const [isLoading, setIsLoading] = useState(false)

  const subscriptionPlans = {
    'individual-monthly': {
      name: 'Individual Monthly',
      price: 100,
      period: 'month',
      currency: 'ETB',
      description: 'Holistic wellness playbook, accountability circles & partner perks.',
    },
    'individual-yearly': {
      name: 'Individual Yearly',
      price: 1000,
      period: 'year',
      currency: 'ETB',
      description: 'All monthly benefits plus 2 complimentary wellness retreat passes.',
    },
    'corporate-monthly': {
      name: 'Corporate Monthly',
      price: 300,
      period: 'month',
      currency: 'ETB',
      description: 'Employee wellness activation, HR wellness toolkits & analytics.',
    },
    'corporate-yearly': {
      name: 'Corporate Yearly',
      price: 2500,
      period: 'year',
      currency: 'ETB',
      description: 'All monthly benefits plus bespoke wellness strategy co-design.',
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', { ...formData, subscriptionPlan })
      alert('Premium request submitted successfully! Our concierge will contact you soon.')
      setIsLoading(false)
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        renewalStatus: 'New Membership',
        wellnessGoals: '',
      })
    }, 1000)
  }

  const selectedPlan = subscriptionPlans[subscriptionPlan]

  return (
    <div className="page-shell min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl text-slate-900 md:text-5xl mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Premium</span> Community
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Curated wellness circles, corporate innovation hubs, and exclusive access to the Wanaw concierge network.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Premium Concierge Intake */}
          <div className="form-shell p-8 md:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Premium Concierge Intake
            </h3>
            <p className="text-slate-600 mb-6">
              Share a few details and our concierge will design your onboarding pathway, including curated programs, wellness data dashboards, and in-person experiences.
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
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Organization / Company */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Organization / Company <span className="text-slate-500 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Enter your organization or company"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Role / Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Role / Title <span className="text-slate-500 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter your role or title"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Renewal Status */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Renewal Status
                </label>
                <select
                  name="renewalStatus"
                  value={formData.renewalStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                >
                  <option value="New Membership">New Membership</option>
                  <option value="Renewal">Renewal</option>
                </select>
              </div>

              {/* Wellness Goals */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Share your wellness goals or concierge requests
                </label>
                <textarea
                  name="wellnessGoals"
                  value={formData.wellnessGoals}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your wellness goals or any specific concierge requests"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Choose Your Subscription */}
          <div className="form-shell p-8 md:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Choose Your Subscription
            </h3>
            <p className="text-slate-600 mb-6">
              Pick the plan that aligns with your goals. You can upgrade or adjust your membership anytime with our community concierge.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Individual Monthly */}
              <div
                onClick={() => setSubscriptionPlan('individual-monthly')}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                  subscriptionPlan === 'individual-monthly'
                    ? 'border-yellow-400 bg-yellow-50 shadow-md'
                    : 'border-slate-300 hover:border-yellow-300'
                }`}
              >
                {subscriptionPlan === 'individual-monthly' && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold">
                      Selected
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Individual Monthly</h4>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                    {subscriptionPlans['individual-monthly'].price} {subscriptionPlans['individual-monthly'].currency} / {subscriptionPlans['individual-monthly'].period}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  {subscriptionPlans['individual-monthly'].description}
                </p>
              </div>

              {/* Individual Yearly */}
              <div
                onClick={() => setSubscriptionPlan('individual-yearly')}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                  subscriptionPlan === 'individual-yearly'
                    ? 'border-yellow-400 bg-yellow-50 shadow-md'
                    : 'border-slate-300 hover:border-yellow-300'
                }`}
              >
                {subscriptionPlan === 'individual-yearly' && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold">
                      Selected
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Individual Yearly</h4>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                    {subscriptionPlans['individual-yearly'].price} {subscriptionPlans['individual-yearly'].currency} / {subscriptionPlans['individual-yearly'].period}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  {subscriptionPlans['individual-yearly'].description}
                </p>
              </div>

              {/* Corporate Monthly */}
              <div
                onClick={() => setSubscriptionPlan('corporate-monthly')}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                  subscriptionPlan === 'corporate-monthly'
                    ? 'border-yellow-400 bg-yellow-50 shadow-md'
                    : 'border-slate-300 hover:border-yellow-300'
                }`}
              >
                {subscriptionPlan === 'corporate-monthly' && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold">
                      Selected
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Corporate Monthly</h4>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                    {subscriptionPlans['corporate-monthly'].price} {subscriptionPlans['corporate-monthly'].currency} / {subscriptionPlans['corporate-monthly'].period}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  {subscriptionPlans['corporate-monthly'].description}
                </p>
              </div>

              {/* Corporate Yearly */}
              <div
                onClick={() => setSubscriptionPlan('corporate-yearly')}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                  subscriptionPlan === 'corporate-yearly'
                    ? 'border-yellow-400 bg-yellow-50 shadow-md'
                    : 'border-slate-300 hover:border-yellow-300'
                }`}
              >
                {subscriptionPlan === 'corporate-yearly' && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold">
                      Selected
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Corporate Yearly</h4>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                    {subscriptionPlans['corporate-yearly'].price} {subscriptionPlans['corporate-yearly'].currency} / {subscriptionPlans['corporate-yearly'].period}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  {subscriptionPlans['corporate-yearly'].description}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Plan Snapshot */}
          <div className="soft-panel rounded-2xl border-2 border-yellow-300 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Selected Plan Snapshot</h3>
            <div className="mb-4">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-2">
                {selectedPlan.price} {selectedPlan.currency} / {selectedPlan.period}
              </p>
              <p className="text-slate-600">
                {selectedPlan.description}
              </p>
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
              {isLoading ? 'Submitting...' : 'Submit Premium Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PremiumCommunity
