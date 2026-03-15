import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Select, FileInput, Button, useToast } from './components/ui'
import api from './services/api'

type RegistrationType = 'service-provider' | 'service-seeker'
type ServiceProviderType = 'food-vendor' | 'lounge-nightclub'
type ServiceSeekerType = 'individual' | 'corporate'
type FoodVendorTier = 'Restaurant ~ Tier 1' | 'Restaurant ~ Tier 2' | 'Catering Services ~ Tier 3' | 'Restaurant ~ Tier 4' | 'Elite Restaurant ~ Tier 5' | 'Others'
type LoungeType = 'Lounge' | 'Night Club' | 'Others'

const Registration = () => {
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
  const [registrationType, setRegistrationType] = useState<RegistrationType>('service-provider')
  const [serviceProviderType, setServiceProviderType] = useState<ServiceProviderType>('food-vendor')
  const [serviceSeekerType, setServiceSeekerType] = useState<ServiceSeekerType>('individual')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Food Vendor Form State
  const [foodVendorForm, setFoodVendorForm] = useState({
    businessName: '',
    ownerManagerName: '',
    phone: '',
    email: '',
    password: '',
    whatsapp: '',
    telegram: '',
    businessType: '' as FoodVendorTier | '',
    city: '',
    primaryLocation: '',
    restaurantPhoto: null as File | null,
    businessRegistration: null as File | null,
    businessLicense: null as File | null,
    tin: null as File | null,
    certificate: null as File | null,
    menuSamples: null as File | null,
    video: null as File | null,
  })

  // Lounge/Night Club Form State
  const [loungeForm, setLoungeForm] = useState({
    businessName: '',
    ownerManagerName: '',
    phone: '',
    email: '',
    password: '',
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
    photos: [] as File[],
  })

  // Individual Service Seeker Form State
  const [individualForm, setIndividualForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
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
    password: '',
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

  const handleFoodVendorFileChange = (e: React.ChangeEvent<HTMLInputElement> | FileList | null, name?: string) => {
    if (e instanceof Event || (e && 'target' in e)) {
      // Regular input element
      const event = e as React.ChangeEvent<HTMLInputElement>
      const { name: inputName } = event.target
      const file = event.target.files?.[0] || null
      setFoodVendorForm(prev => ({ ...prev, [inputName]: file }))
    } else if (e && name) {
      // FileInput component (FileList)
      const fileList = e as FileList
      if (fileList.length > 0) {
        const file = fileList[0]
        setFoodVendorForm(prev => ({ ...prev, [name]: file }))
      }
    }
  }

  const handleLoungeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLoungeForm(prev => ({ ...prev, [name]: value }))
  }

  const handleLoungeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    if (name === 'photos') {
      const files = e.target.files ? Array.from(e.target.files) : []
      setLoungeForm(prev => ({ ...prev, [name]: files }))
    } else {
      const file = e.target.files?.[0] || null
      setLoungeForm(prev => ({ ...prev, [name]: file }))
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      
      // Add common fields
      formData.append('registrationType', registrationType)
      
      if (registrationType === 'service-provider') {
        formData.append('serviceProviderType', serviceProviderType)
        
        if (serviceProviderType === 'food-vendor') {
          // Add food vendor fields
          formData.append('businessName', foodVendorForm.businessName)
          formData.append('ownerManagerName', foodVendorForm.ownerManagerName)
          formData.append('phone', foodVendorForm.phone)
          formData.append('email', foodVendorForm.email)
          formData.append('password', foodVendorForm.password)
          formData.append('whatsapp', foodVendorForm.whatsapp || '')
          formData.append('telegram', foodVendorForm.telegram || '')
          formData.append('businessType', foodVendorForm.businessType)
          formData.append('city', foodVendorForm.city)
          formData.append('primaryLocation', foodVendorForm.primaryLocation)
          
          // Add files
          if (foodVendorForm.businessRegistration) {
            formData.append('businessRegistration', foodVendorForm.businessRegistration)
          }
          if (foodVendorForm.businessLicense) {
            formData.append('businessLicense', foodVendorForm.businessLicense)
          }
          if (foodVendorForm.tin) {
            formData.append('tin', foodVendorForm.tin)
          }
          if (foodVendorForm.certificate) {
            formData.append('certificate', foodVendorForm.certificate)
          }
          if (foodVendorForm.restaurantPhoto) {
            formData.append('restaurantPhoto', foodVendorForm.restaurantPhoto)
          }
          if (foodVendorForm.menuSamples) {
            formData.append('menuSamples', foodVendorForm.menuSamples)
          }
          if (foodVendorForm.video) {
            formData.append('video', foodVendorForm.video)
          }
        } else if (serviceProviderType === 'lounge-nightclub') {
          // Add lounge/nightclub fields
          formData.append('businessName', loungeForm.businessName)
          formData.append('ownerManagerName', loungeForm.ownerManagerName)
          formData.append('phone', loungeForm.phone)
          formData.append('email', loungeForm.email)
          formData.append('password', loungeForm.password)
          formData.append('whatsapp', loungeForm.whatsapp || '')
          formData.append('telegram', loungeForm.telegram || '')
          formData.append('businessType', loungeForm.businessType)
          formData.append('city', loungeForm.city)
          formData.append('primaryLocation', loungeForm.primaryLocation)
          
          // Add files
          if (loungeForm.businessRegistration) {
            formData.append('businessRegistration', loungeForm.businessRegistration)
          }
          if (loungeForm.businessLicense) {
            formData.append('businessLicense', loungeForm.businessLicense)
          }
          if (loungeForm.tin) {
            formData.append('tin', loungeForm.tin)
          }
          if (loungeForm.certificate) {
            formData.append('certificate', loungeForm.certificate)
          }
          if (loungeForm.menuSamples) {
            formData.append('menuSamples', loungeForm.menuSamples)
          }
          if (loungeForm.video) {
            formData.append('video', loungeForm.video)
          }
          if (loungeForm.photos && Array.isArray(loungeForm.photos)) {
            loungeForm.photos.forEach((photo) => {
              formData.append('photos', photo)
            })
          }
        }
      } else if (registrationType === 'service-seeker') {
        formData.append('serviceSeekerType', serviceSeekerType)
        
        if (serviceSeekerType === 'individual') {
          // Add individual fields
          formData.append('fullName', individualForm.fullName)
          formData.append('phone', individualForm.phone)
          formData.append('email', individualForm.email)
          formData.append('password', individualForm.password)
          formData.append('whatsapp', individualForm.whatsapp || '')
          formData.append('telegram', individualForm.telegram || '')
          formData.append('city', individualForm.city)
          formData.append('address', individualForm.address)
        } else if (serviceSeekerType === 'corporate') {
          // Add corporate fields
          formData.append('companyName', corporateForm.companyName)
          formData.append('contactPersonName', corporateForm.contactPersonName)
          formData.append('phone', corporateForm.phone)
          formData.append('email', corporateForm.email)
          formData.append('password', corporateForm.password)
          formData.append('whatsapp', corporateForm.whatsapp || '')
          formData.append('telegram', corporateForm.telegram || '')
          formData.append('city', corporateForm.city)
          formData.append('address', corporateForm.address)
          
          // Add files
          if (corporateForm.businessRegistration) {
            formData.append('businessRegistrationCorporate', corporateForm.businessRegistration)
          }
          if (corporateForm.businessLicense) {
            formData.append('businessLicenseCorporate', corporateForm.businessLicense)
          }
        }
      }
      
      // For vendors and lounges, use vendor-registration endpoints
      if (registrationType === 'service-provider' && (serviceProviderType === 'food-vendor' || serviceProviderType === 'lounge-nightclub')) {
        const endpoint = serviceProviderType === 'food-vendor' ? '/vendor-registration/vendor' : '/vendor-registration/lounge'
        
        // Map field names for vendor registration
        const vendorFormData = new FormData()
        if (serviceProviderType === 'food-vendor') {
          vendorFormData.append('ownerName', foodVendorForm.ownerManagerName)
          vendorFormData.append('businessName', foodVendorForm.businessName)
          vendorFormData.append('email', foodVendorForm.email)
          vendorFormData.append('password', foodVendorForm.password)
          vendorFormData.append('phone', foodVendorForm.phone)
          vendorFormData.append('whatsapp', foodVendorForm.whatsapp || '')
          vendorFormData.append('telegram', foodVendorForm.telegram || '')
          vendorFormData.append('businessType', foodVendorForm.businessType)
          vendorFormData.append('city', foodVendorForm.city)
          vendorFormData.append('primaryLocationAddress', foodVendorForm.primaryLocation)
          
          if (foodVendorForm.businessRegistration) {
            vendorFormData.append('businessRegistration', foodVendorForm.businessRegistration)
          }
          if (foodVendorForm.businessLicense) {
            vendorFormData.append('license', foodVendorForm.businessLicense)
          }
          if (foodVendorForm.tin) {
            vendorFormData.append('tin', foodVendorForm.tin)
          }
          if (foodVendorForm.certificate) {
            vendorFormData.append('certificate', foodVendorForm.certificate)
          }
          if (foodVendorForm.restaurantPhoto) {
            vendorFormData.append('restaurantPhoto', foodVendorForm.restaurantPhoto)
          }
          if (foodVendorForm.menuSamples) {
            vendorFormData.append('menuSamples', foodVendorForm.menuSamples)
          }
          if (foodVendorForm.video) {
            vendorFormData.append('promoVideo', foodVendorForm.video)
          }
        } else {
          vendorFormData.append('ownerName', loungeForm.ownerManagerName)
          vendorFormData.append('businessName', loungeForm.businessName)
          vendorFormData.append('email', loungeForm.email)
          vendorFormData.append('password', loungeForm.password)
          vendorFormData.append('phone', loungeForm.phone)
          vendorFormData.append('whatsapp', loungeForm.whatsapp || '')
          vendorFormData.append('telegram', loungeForm.telegram || '')
          vendorFormData.append('businessType', loungeForm.businessType)
          vendorFormData.append('city', loungeForm.city)
          vendorFormData.append('primaryLocationAddress', loungeForm.primaryLocation)
          
          if (loungeForm.businessRegistration) {
            vendorFormData.append('businessRegistration', loungeForm.businessRegistration)
          }
          if (loungeForm.businessLicense) {
            vendorFormData.append('license', loungeForm.businessLicense)
          }
          if (loungeForm.menuSamples) {
            vendorFormData.append('menu', loungeForm.menuSamples)
          }
          if (loungeForm.video) {
            vendorFormData.append('video', loungeForm.video)
          }
          if (loungeForm.photos && Array.isArray(loungeForm.photos)) {
            loungeForm.photos.forEach((photo) => {
              vendorFormData.append('photos', photo)
            })
          }
        }
        
        const response = await api.post(endpoint, vendorFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        
        if (response.data.success && response.data.token && response.data.user) {
          // Auto-login the user after registration
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          
          showSuccess('Registration submitted successfully! Redirecting to dashboard...')
          
          // Redirect to vendor dashboard
          setTimeout(() => {
            navigate('/vendor/dashboard')
          }, 1000)
        } else {
          showSuccess('Registration submitted successfully! Please sign in to access your dashboard.')
          navigate('/signin')
        }
        return
      }
      
      // Submit to API for other registration types
      const response = await api.post('/registration/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      if (response.data.success) {
        showSuccess('Registration submitted successfully! We will review your application soon.')
        // Reset forms
        setFoodVendorForm({
          businessName: '',
          ownerManagerName: '',
          phone: '',
          email: '',
          password: '',
          whatsapp: '',
          telegram: '',
          businessType: '' as FoodVendorTier | '',
          city: '',
          primaryLocation: '',
          restaurantPhoto: null,
          businessRegistration: null,
          businessLicense: null,
          tin: null,
          certificate: null,
          menuSamples: null,
          video: null,
        })
        setLoungeForm({
          businessName: '',
          ownerManagerName: '',
          phone: '',
          email: '',
          password: '',
          whatsapp: '',
          telegram: '',
          businessType: '' as LoungeType | '',
          city: '',
          primaryLocation: '',
          businessRegistration: null,
          businessLicense: null,
          tin: null,
          certificate: null,
          menuSamples: null,
          video: null,
          photos: [],
        })
        setIndividualForm({
          fullName: '',
          phone: '',
          email: '',
          password: '',
          whatsapp: '',
          telegram: '',
          city: '',
          address: '',
        })
        setCorporateForm({
          companyName: '',
          contactPersonName: '',
          phone: '',
          email: '',
          password: '',
          whatsapp: '',
          telegram: '',
          city: '',
          address: '',
          businessRegistration: null,
          businessLicense: null,
        })
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      showError(error.response?.data?.message || 'Failed to submit registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 py-8 px-4 md:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Kushena</span>
          </h1>
          <p className="text-base text-slate-600">
            Register as a service provider or service seeker
          </p>
        </div>

        {/* Registration Type Selection */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          {/* Dropdown Selection */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Registration Type <span className="text-red-500">*</span>
            </label>
            <Select
              name="registrationType"
              value={registrationType}
              onChange={(e) => setRegistrationType(e.target.value as RegistrationType)}
              required
              options={[
                { value: '', label: 'Select Registration Type' },
                { value: 'service-provider', label: 'Service Provider' },
                { value: 'service-seeker', label: 'Service Seeker' }
              ]}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Provider Forms */}
            {registrationType === 'service-provider' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Provider Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceProviderType"
                        value="food-vendor"
                        checked={serviceProviderType === 'food-vendor'}
                        onChange={(e) => setServiceProviderType(e.target.value as ServiceProviderType)}
                        className="sr-only"
                      />
                      <div className={`py-2 px-3 rounded-lg font-medium text-center transition-all border-2 ${
                        serviceProviderType === 'food-vendor'
                          ? 'bg-yellow-200 text-yellow-800 border-yellow-400'
                          : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                      }`}>
                        Food Vendor
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceProviderType"
                        value="lounge-nightclub"
                        checked={serviceProviderType === 'lounge-nightclub'}
                        onChange={(e) => setServiceProviderType(e.target.value as ServiceProviderType)}
                        className="sr-only"
                      />
                      <div className={`py-2 px-3 rounded-lg font-medium text-center transition-all border-2 ${
                        serviceProviderType === 'lounge-nightclub'
                          ? 'bg-yellow-200 text-yellow-800 border-yellow-400'
                          : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                      }`}>
                        Lounge / Night Club
                      </div>
                    </label>
                  </div>
                </div>

                {/* Food Vendor Form */}
                {serviceProviderType === 'food-vendor' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 border-b border-yellow-200 pb-2">
                      Food Vendor Registration
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        type="text"
                        name="businessName"
                        label="Business Name"
                        value={foodVendorForm.businessName}
                        onChange={handleFoodVendorChange}
                        required
                        placeholder="Enter business name"
                      />

                      <Input
                        type="text"
                        name="ownerManagerName"
                        label="Owner/Manager Name"
                        value={foodVendorForm.ownerManagerName}
                        onChange={handleFoodVendorChange}
                        required
                        placeholder="Enter owner/manager name"
                      />

                      <Input
                        type="tel"
                        name="phone"
                        label="Phone"
                        value={foodVendorForm.phone}
                        onChange={handleFoodVendorChange}
                        required
                        placeholder="Enter phone number"
                        icon={
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        }
                      />

                      <Input
                        type="email"
                        name="email"
                        label="Email"
                        value={foodVendorForm.email}
                        onChange={handleFoodVendorChange}
                        required
                        placeholder="Enter email address"
                        icon={
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        }
                      />

                      <Input
                        type="password"
                        name="password"
                        label="Password"
                        value={foodVendorForm.password}
                        onChange={handleFoodVendorChange}
                        required
                        placeholder="Enter password"
                        icon={
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        }
                      />

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          WhatsApp (Optional)
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

                      <Select
                        name="businessType"
                        label="Business Type"
                        value={foodVendorForm.businessType}
                        onChange={handleFoodVendorChange}
                        required
                        options={[
                          { value: '', label: 'Select Business Type' },
                          { value: 'Restaurant ~ Tier 1', label: 'Restaurant ~ Tier 1' },
                          { value: 'Restaurant ~ Tier 2', label: 'Restaurant ~ Tier 2' },
                          { value: 'Catering Services ~ Tier 3', label: 'Catering Services ~ Tier 3' },
                          { value: 'Restaurant ~ Tier 4', label: 'Restaurant ~ Tier 4' },
                          { value: 'Elite Restaurant ~ Tier 5', label: 'Elite Restaurant ~ Tier 5' },
                          { value: 'Others', label: 'Others' }
                        ]}
                      />

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
                    <div className="border-t border-yellow-200 pt-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Attachments</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        <FileInput
                          name="businessRegistration"
                          label="Business Registration"
                          onChange={(files) => handleFoodVendorFileChange(files, 'businessRegistration')}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />

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
                            Restaurant/Place Photo <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            name="restaurantPhoto"
                            onChange={handleFoodVendorFileChange}
                            accept="image/*"
                            required
                            className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                          <p className="text-xs text-slate-500 mt-1">This photo will be displayed on the restaurants page</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lounge/Night Club Form */}
                {serviceProviderType === 'lounge-nightclub' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 border-b border-yellow-200 pb-2">
                      Lounge / Night Club Registration
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
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
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={loungeForm.password}
                          onChange={handleLoungeChange}
                          required
                          placeholder="Enter password"
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          WhatsApp (Optional)
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
                          Telegram (Optional)
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
                    <div className="border-t border-yellow-200 pt-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Attachments</h3>
                      <div className="grid gap-3 md:grid-cols-2">
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
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Seeker Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceSeekerType"
                        value="individual"
                        checked={serviceSeekerType === 'individual'}
                        onChange={(e) => setServiceSeekerType(e.target.value as ServiceSeekerType)}
                        className="sr-only"
                      />
                      <div className={`py-2 px-3 rounded-lg font-medium text-center transition-all border-2 ${
                        serviceSeekerType === 'individual'
                          ? 'bg-yellow-200 text-yellow-800 border-yellow-400'
                          : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                      }`}>
                        Individual
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceSeekerType"
                        value="corporate"
                        checked={serviceSeekerType === 'corporate'}
                        onChange={(e) => setServiceSeekerType(e.target.value as ServiceSeekerType)}
                        className="sr-only"
                      />
                      <div className={`py-2 px-3 rounded-lg font-medium text-center transition-all border-2 ${
                        serviceSeekerType === 'corporate'
                          ? 'bg-yellow-200 text-yellow-800 border-yellow-400'
                          : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                      }`}>
                        Corporate
                      </div>
                    </label>
                  </div>
                </div>

                {/* Individual Service Seeker Form */}
                {serviceSeekerType === 'individual' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 border-b border-yellow-200 pb-2">
                      Individual Service Seeker Registration
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
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
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={individualForm.password}
                          onChange={handleIndividualChange}
                          required
                          placeholder="Enter password"
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          WhatsApp (Optional)
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
                          Telegram (Optional)
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
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 border-b border-yellow-200 pb-2">
                      Corporate Service Seeker Registration
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
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
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={corporateForm.password}
                          onChange={handleCorporateChange}
                          required
                          placeholder="Enter password"
                          className="w-full px-4 py-2.5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          WhatsApp (Optional)
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
                          Telegram (Optional)
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
            <div className="pt-4 border-t border-yellow-200">
              <Button
                type="submit"
                isLoading={isSubmitting}
                size="lg"
                className="w-full md:w-auto"
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
