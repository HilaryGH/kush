import { useState } from 'react'
import { Link } from 'react-router-dom'

type PartnerType = 'Investor' | 'Strategic Partner' | 'Sponsorship'

const InvestPartner = () => {
  const [formData, setFormData] = useState({
    partnerType: '' as PartnerType | '',
    partner: '',
    investmentType: '',
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    whatsapp: '',
    idDocument: null as File | null,
    license: null as File | null,
    tradeRegistration: null as File | null,
    enquiries: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const partners = [
    'Technology Partner',
    'Marketing Partner',
    'Financial Partner',
    'Logistics Partner',
    'Food & Beverage Partner',
    'Other',
  ]

  const investmentTypes = [
    'Equity Investment',
    'Debt Financing',
    'Strategic Partnership',
    'Sponsorship',
    'Joint Venture',
    'Other',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0] || null
    
    // Check file size (100MB = 100 * 1024 * 1024 bytes)
    if (file && file.size > 100 * 1024 * 1024) {
      alert(`${name} file size exceeds 100MB limit`)
      e.target.value = ''
      return
    }
    
    setFormData(prev => ({ ...prev, [name]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      alert('Partnership request submitted successfully! We will contact you soon.')
      setIsLoading(false)
      // Reset form
      setFormData({
        partnerType: '' as PartnerType | '',
        partner: '',
        investmentType: '',
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        whatsapp: '',
        idDocument: null,
        license: null,
        tradeRegistration: null,
        enquiries: '',
      })
    }, 1000)
  }

  return (
    <div className="page-shell min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl text-slate-900 md:text-5xl mb-2">
            Invest / <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Partner</span> With Us
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join us as an investor or partner and grow together
          </p>
        </div>

        {/* Form */}
        <div className="form-shell p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Partner Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Partner Type <span className="text-red-500">*</span>
              </label>
              <select
                name="partnerType"
                value={formData.partnerType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              >
                <option value="">-- Select Partner Type --</option>
                <option value="Investor">Investor</option>
                <option value="Strategic Partner">Strategic Partner</option>
                <option value="Sponsorship">Sponsorship</option>
              </select>
            </div>

            {/* Partner Information Section */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Partner Information</h3>
              
              {/* Partner */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Partner <span className="text-red-500">*</span>
                </label>
                <select
                  name="partner"
                  value={formData.partner}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                >
                  <option value="">-- Select Partner --</option>
                  {partners.map((partner) => (
                    <option key={partner} value={partner}>
                      {partner}
                    </option>
                  ))}
                </select>
              </div>

              {/* Investment Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Investment Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="investmentType"
                  value={formData.investmentType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                >
                  <option value="">-- Select Investment Type --</option>
                  {investmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Basic Information</h3>
              
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

                {/* Company Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your company name"
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

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    WhatsApp
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
              </div>
            </div>

            {/* Attachments Section */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Attachments</h3>
              
              {/* ID / Passport / Driving Licence */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ID / Passport / Driving Licence
                </label>
                <input
                  type="file"
                  name="idDocument"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.webm,.mkv"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Max file size: 100MB | Accepted: Images (JPG, PNG, GIF), PDF, and Videos (MP4, MOV, AVI, WEBM, MKV)
                </p>
              </div>

              {/* License */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  License
                </label>
                <input
                  type="file"
                  name="license"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.webm,.mkv"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Max file size: 100MB | Accepted: Images (JPG, PNG, GIF), PDF, and Videos (MP4, MOV, AVI, WEBM, MKV)
                </p>
              </div>

              {/* Trade Registration */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Trade Registration
                </label>
                <input
                  type="file"
                  name="tradeRegistration"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.webm,.mkv"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Max file size: 100MB | Accepted: Images (JPG, PNG, GIF), PDF, and Videos (MP4, MOV, AVI, WEBM, MKV)
                </p>
              </div>
            </div>

            {/* Enquiries Section */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Enquiries</h3>
              <textarea
                name="enquiries"
                value={formData.enquiries}
                onChange={handleChange}
                rows={5}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
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
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InvestPartner
