import { useState } from 'react'

type RegistrationType = 'service-provider' | 'service-seeker'
type ServiceProviderType = 'food-vendor' | 'lounge-nightclub'
type ServiceSeekerType = 'individual' | 'corporate'
type FoodVendorTier = 'Restaurant ~ Tier 1' | 'Restaurant ~ Tier 2' | 'Catering Services ~ Tier 3' | 'Restaurant ~ Tier 4' | 'Elite Restaurant ~ Tier 5' | 'Others'
type LoungeType = 'Lounge' | 'Night Club' | 'Others'

const Registration = () => {
  const [registrationType, setRegistrationType] = useState<RegistrationType>('service-provider')
  const [serviceProviderType, setServiceProviderType] = useState<ServiceProviderType>('food-vendor')
  const [serviceSeekerType, setServiceSeekerType] = useState<ServiceSeekerType>('individual')

  // Food Vendor Form State
  const [foodVendorForm, setFoodVendorForm] = useState({
    businessName: '',
    ownerManagerName: '',
    phone: '',
    email: '',
    whatsapp: '',
    telegram: '',
    businessType: '' as FoodVendorTier | '',
    city: '',
    primaryLocation: '',
    businessRegistration: null as File | null,
    businessLicense: null as File | null,
    tin: null as File | null,
    certificate: null as File | null,
    menuSamples: null as File | null,
    video: null as File | null,
    photos: null as File | null,
  })

  // Lounge/Night Club Form State
  const [loungeForm, setLoungeForm] = useState({
    businessName: '',
    ownerManagerName: '',
    phone: '',
    email: '',
    whatsapp: '',
    telegram: '',
    businessType: '' as LoungeType | '',
    city: '',
    primaryLocation: '',
    businessRegistration: null as File | null,
    businessLicense: null as File | null,
    tin: null as File | null,
    certificate: null as File | null,
    menuSamples: null as File | null,
    video: null as File | null,
    photos: null as File | null,
  })

  // Individual Service Seeker Form State
  const [individualForm, setIndividualForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    whatsapp: '',
    telegram: '',
    city: '',
    address: '',
  })

  // Corporate Service Seeker Form State
  const [corporateForm, setCorporateForm] = useState({
    companyName: '',
    contactPersonName: '',
    phone: '',
    email: '',
    whatsapp: '',
    telegram: '',
    city: '',
    address: '',
    businessRegistration: null as File | null,
    businessLicense: null as File | null,
  })

  const handleFoodVendorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFoodVendorForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFoodVendorFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0] || null
    setFoodVendorForm(prev => ({ ...prev, [name]: file }))
  }

  const handleLoungeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLoungeForm(prev => ({ ...prev, [name]: value }))
  }

  const handleLoungeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0] || null
    setLoungeForm(prev => ({ ...prev, [name]: file }))
  }

  const handleIndividualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setIndividualForm(prev => ({ ...prev, [name]: value }))
  }

  const handleCorporateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCorporateForm(prev => ({ ...prev, [name]: value }))
  }

  const handleCorporateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0] || null
    setCorporateForm(prev => ({ ...prev, [name]: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', {
      registrationType,
      serviceProviderType,
      serviceSeekerType,
      foodVendorForm,
      loungeForm,
      individualForm,
      corporateForm,
    })
    alert('Registration form submitted successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 py-12 px-4 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Kushena</span>
          </h1>
          <p className="text-lg text-slate-600">
            Register as a service provider or service seeker
          </p>
        </div>

        {/* Registration Type Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setRegistrationType('service-provider')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                registrationType === 'service-provider'
                  ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-md'
                  : 'bg-yellow-50 text-slate-700 hover:bg-yellow-100'
              }`}
            >
              Service Provider
            </button>
            <button
              onClick={() => setRegistrationType('service-seeker')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                registrationType === 'service-seeker'
                  ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-md'
                  : 'bg-yellow-50 text-slate-700 hover:bg-yellow-100'
              }`}
            >
              Service Seeker
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Provider Forms */}
            {registrationType === 'service-provider' && (
              <>
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setServiceProviderType('food-vendor')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      serviceProviderType === 'food-vendor'
                        ? 'bg-yellow-200 text-yellow-800 border-2 border-yellow-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Food Vendor
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceProviderType('lounge-nightclub')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      serviceProviderType === 'lounge-nightclub'
                        ? 'bg-yellow-200 text-yellow-800 border-2 border-yellow-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Lounge / Night Club
                  </button>
                </div>

                {/* Food Vendor Form */}
                {serviceProviderType === 'food-vendor' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 border-b border-yellow-200 pb-3">
                      Food Vendor Registration
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={foodVendorForm.businessName}
                          onChange={handleFoodVendorChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Owner/Manager Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="ownerManagerName"
                          value={foodVendorForm.ownerManagerName}
                          onChange={handleFoodVendorChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={foodVendorForm.phone}
                          onChange={handleFoodVendorChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={foodVendorForm.email}
                          onChange={handleFoodVendorChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={foodVendorForm.whatsapp}
                          onChange={handleFoodVendorChange}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Telegram
                        </label>
                        <input
                          type="text"
                          name="telegram"
                          value={foodVendorForm.telegram}
                          onChange={handleFoodVendorChange}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Business Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="businessType"
                          value={foodVendorForm.businessType}
                          onChange={handleFoodVendorChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                          <option value="">Select Business Type</option>
                          <option value="Restaurant ~ Tier 1">Restaurant ~ Tier 1</option>
                          <option value="Restaurant ~ Tier 2">Restaurant ~ Tier 2</option>
                          <option value="Catering Services ~ Tier 3">Catering Services ~ Tier 3</option>
                          <option value="Restaurant ~ Tier 4">Restaurant ~ Tier 4</option>
                          <option value="Elite Restaurant ~ Tier 5">Elite Restaurant ~ Tier 5</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={foodVendorForm.city}
                          onChange={handleFoodVendorChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Primary Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="primaryLocation"
                          value={foodVendorForm.primaryLocation}
                          onChange={handleFoodVendorChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>

                    {/* Attachments Section */}
                    <div className="border-t border-yellow-200 pt-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Attachments</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Business Registration
                          </label>
                          <input
                            type="file"
                            name="businessRegistration"
                            onChange={handleFoodVendorFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Business License
                          </label>
                          <input
                            type="file"
                            name="businessLicense"
                            onChange={handleFoodVendorFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            TIN
                          </label>
                          <input
                            type="file"
                            name="tin"
                            onChange={handleFoodVendorFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Certificate
                          </label>
                          <input
                            type="file"
                            name="certificate"
                            onChange={handleFoodVendorFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Menu Samples
                          </label>
                          <input
                            type="file"
                            name="menuSamples"
                            onChange={handleFoodVendorFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Video (30 Min max)
                          </label>
                          <input
                            type="file"
                            name="video"
                            onChange={handleFoodVendorFileChange}
                            accept="video/*"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Photos
                          </label>
                          <input
                            type="file"
                            name="photos"
                            onChange={handleFoodVendorFileChange}
                            accept="image/*"
                            multiple
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lounge/Night Club Form */}
                {serviceProviderType === 'lounge-nightclub' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 border-b border-yellow-200 pb-3">
                      Lounge / Night Club Registration
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={loungeForm.businessName}
                          onChange={handleLoungeChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Owner/Manager Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="ownerManagerName"
                          value={loungeForm.ownerManagerName}
                          onChange={handleLoungeChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={loungeForm.phone}
                          onChange={handleLoungeChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={loungeForm.email}
                          onChange={handleLoungeChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={loungeForm.whatsapp}
                          onChange={handleLoungeChange}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Telegram
                        </label>
                        <input
                          type="text"
                          name="telegram"
                          value={loungeForm.telegram}
                          onChange={handleLoungeChange}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Business Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="businessType"
                          value={loungeForm.businessType}
                          onChange={handleLoungeChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                          <option value="">Select Business Type</option>
                          <option value="Lounge">Lounge</option>
                          <option value="Night Club">Night Club</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={loungeForm.city}
                          onChange={handleLoungeChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Primary Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="primaryLocation"
                          value={loungeForm.primaryLocation}
                          onChange={handleLoungeChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>

                    {/* Attachments Section */}
                    <div className="border-t border-yellow-200 pt-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Attachments</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Business Registration
                          </label>
                          <input
                            type="file"
                            name="businessRegistration"
                            onChange={handleLoungeFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Business License
                          </label>
                          <input
                            type="file"
                            name="businessLicense"
                            onChange={handleLoungeFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            TIN
                          </label>
                          <input
                            type="file"
                            name="tin"
                            onChange={handleLoungeFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Certificate
                          </label>
                          <input
                            type="file"
                            name="certificate"
                            onChange={handleLoungeFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Menu Samples
                          </label>
                          <input
                            type="file"
                            name="menuSamples"
                            onChange={handleLoungeFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Video (30 Min max)
                          </label>
                          <input
                            type="file"
                            name="video"
                            onChange={handleLoungeFileChange}
                            accept="video/*"
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Photos
                          </label>
                          <input
                            type="file"
                            name="photos"
                            onChange={handleLoungeFileChange}
                            accept="image/*"
                            multiple
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Service Seeker Forms */}
            {registrationType === 'service-seeker' && (
              <>
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setServiceSeekerType('individual')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      serviceSeekerType === 'individual'
                        ? 'bg-yellow-200 text-yellow-800 border-2 border-yellow-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceSeekerType('corporate')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      serviceSeekerType === 'corporate'
                        ? 'bg-yellow-200 text-yellow-800 border-2 border-yellow-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Corporate
                  </button>
                </div>

                {/* Individual Service Seeker Form */}
                {serviceSeekerType === 'individual' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 border-b border-yellow-200 pb-3">
                      Individual Service Seeker Registration
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={individualForm.fullName}
                          onChange={handleIndividualChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={individualForm.phone}
                          onChange={handleIndividualChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={individualForm.email}
                          onChange={handleIndividualChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={individualForm.whatsapp}
                          onChange={handleIndividualChange}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Telegram
                        </label>
                        <input
                          type="text"
                          name="telegram"
                          value={individualForm.telegram}
                          onChange={handleIndividualChange}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={individualForm.city}
                          onChange={handleIndividualChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="address"
                          value={individualForm.address}
                          onChange={(e) => setIndividualForm(prev => ({ ...prev, address: e.target.value }))}
                          required
                          rows={3}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Corporate Service Seeker Form */}
                {serviceSeekerType === 'corporate' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 border-b border-yellow-200 pb-3">
                      Corporate Service Seeker Registration
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={corporateForm.companyName}
                          onChange={handleCorporateChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Contact Person Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="contactPersonName"
                          value={corporateForm.contactPersonName}
                          onChange={handleCorporateChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={corporateForm.phone}
                          onChange={handleCorporateChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={corporateForm.email}
                          onChange={handleCorporateChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={corporateForm.whatsapp}
                          onChange={handleCorporateChange}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Telegram
                        </label>
                        <input
                          type="text"
                          name="telegram"
                          value={corporateForm.telegram}
                          onChange={handleCorporateChange}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={corporateForm.city}
                          onChange={handleCorporateChange}
                          required
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="address"
                          value={corporateForm.address}
                          onChange={(e) => setCorporateForm(prev => ({ ...prev, address: e.target.value }))}
                          required
                          rows={3}
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Business Registration
                        </label>
                        <input
                          type="file"
                          name="businessRegistration"
                          onChange={handleCorporateFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Business License
                        </label>
                        <input
                          type="file"
                          name="businessLicense"
                          onChange={handleCorporateFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <div className="pt-6 border-t border-yellow-200">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
