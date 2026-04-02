import { useState } from 'react'
import { Link } from 'react-router-dom'

type ProfessionalType = 'Professional' | 'Fresh Graduate'

const ProfessionalCommunity = () => {
  const [formData, setFormData] = useState({
    type: '' as ProfessionalType | '',
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    linkedin: '',
    currentLocation: '',
    specialization: '',
    cv: null as File | null,
    credentials: null as File | null,
  })

  const [isLoading, setIsLoading] = useState(false)

  const specializations = [
    'Software Engineering',
    'Data Science',
    'Business Administration',
    'Marketing',
    'Finance',
    'Healthcare',
    'Education',
    'Engineering',
    'Design',
    'Law',
    'Other',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      alert('Application submitted successfully!')
      setIsLoading(false)
      // Reset form
      setFormData({
        type: '' as ProfessionalType | '',
        fullName: '',
        email: '',
        phone: '',
        whatsapp: '',
        linkedin: '',
        currentLocation: '',
        specialization: '',
        cv: null,
        credentials: null,
      })
    }, 1000)
  }

  return (
    <div className="page-shell min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl text-slate-900 md:text-5xl mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Professionals</span> Community
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join us by filling the form below
          </p>
        </div>

        {/* Form */}
        <div className="form-shell p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              >
                <option value="">-- Select Type --</option>
                <option value="Professional">Professional</option>
                <option value="Fresh Graduate">Fresh Graduate</option>
              </select>
            </div>

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
                placeholder="John Doe"
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
                placeholder="john@example.com"
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
                placeholder="+1234567890"
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
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* LinkedIn Profile */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                LinkedIn Profile <span className="text-slate-500 text-xs">(Optional)</span>
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* Current Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Current Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                required
                placeholder="City, Country"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Specialization <span className="text-red-500">*</span>
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              >
                <option value="">-- Select Specialization --</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload CV */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Upload CV <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="cv"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.webm,.mkv"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-slate-500 mt-1">
                Max file size: 100MB | Accepted: Images (JPG, PNG, GIF), PDF, and Videos (MP4, MOV, AVI, WEBM, MKV)
              </p>
            </div>

            {/* Upload Credentials */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Upload Credentials <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="credentials"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.webm,.mkv"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              <p className="text-xs text-slate-500 mt-1">
                Max file size: 100MB | Accepted: Images (JPG, PNG, GIF), PDF, and Videos (MP4, MOV, AVI, WEBM, MKV)
              </p>
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

export default ProfessionalCommunity
