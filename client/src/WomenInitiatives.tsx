import { useState } from 'react'
import { Link } from 'react-router-dom'

const WomenInitiatives = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    location: '',
    city: '',
    idDocument: null as File | null,
    profilePhoto: null as File | null,
    certificates: null as File | null,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0] || null
    
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file && file.size > 5 * 1024 * 1024) {
      alert(`${name} file size exceeds 5MB limit`)
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
      alert('Application submitted successfully!')
      setIsLoading(false)
      // Reset form
      setFormData({
        fullName: '',
        age: '',
        email: '',
        phone: '',
        whatsapp: '',
        telegram: '',
        location: '',
        city: '',
        idDocument: null,
        profilePhoto: null,
        certificates: null,
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 py-12 px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center">
              <span className="text-3xl">👩</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Women</span> Initiatives
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-3">
            Join Women Initiatives
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Empower yourself and join our community of amazing women
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
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

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter your age"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* Email */}
            <div>
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
                Phone
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
                WhatsApp <span className="text-slate-500 text-xs">(Optional)</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Enter your whatsapp (optional)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Telegram <span className="text-slate-500 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                placeholder="Enter your telegram (optional)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* Attachments Section */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Attachments</h3>
              
              {/* ID / Driving Licence / Passport */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ID / Driving Licence / Passport <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="idDocument"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                <p className="text-xs text-slate-500 mt-1">Max: 5MB</p>
              </div>

              {/* Profile Photo */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Profile Photo <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                <p className="text-xs text-slate-500 mt-1">Max: 5MB</p>
              </div>

              {/* Certificates */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Certificates <span className="text-slate-500 text-xs">(Optional)</span>
                </label>
                <input
                  type="file"
                  name="certificates"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                <p className="text-xs text-slate-500 mt-1">Max: 5MB</p>
              </div>
            </div>

            {/* Buttons */}
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
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>

        {/* Survey Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-4">
            <span className="text-4xl">📋</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Want to transform your business? Take our survey!
          </h3>
          <p className="text-slate-600 mb-6">
            Help us understand your needs and provide better support
          </p>
          <button className="inline-flex items-center gap-2 py-3 px-8 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold shadow-md hover:shadow-lg transition-all">
            <span>📋</span>
            <span>Take Survey</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WomenInitiatives
