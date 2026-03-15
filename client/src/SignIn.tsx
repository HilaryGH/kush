import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, useToast } from './components/ui'
import { useAuth } from './context/AuthContext'

const SignIn = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, user } = useAuth()
  const { showSuccess, showError } = useToast()
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'user':
          navigate('/dashboard')
          break
        case 'vendor':
          navigate('/vendor/dashboard')
          break
        case 'rider':
          navigate('/rider/dashboard')
          break
        case 'admin':
        case 'superadmin':
        case 'support':
        case 'marketing':
          navigate('/admin/dashboard')
          break
        default:
          navigate('/dashboard')
      }
    }
  }, [isAuthenticated, user, navigate])
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      showError('Please fix the errors in the form')
      return
    }
    
    setIsLoading(true)
    
    try {
      console.log('Attempting login with email:', formData.email)
      const userData = await login(formData.email, formData.password)
      console.log('Login successful, userData:', userData)
      
      if (!userData) {
        console.error('No user data returned from login')
        showError('Sign in failed. Please try again.')
        setIsLoading(false)
        return
      }
      
      if (!userData.role) {
        console.error('User data missing role:', userData)
        showError('Sign in failed. User role not found.')
        setIsLoading(false)
        return
      }
      
      showSuccess('Welcome back! Sign in successful.')
      console.log('Navigating to dashboard for role:', userData.role)
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        // Navigate based on user role
        switch (userData.role) {
          case 'user':
            navigate('/dashboard')
            break
          case 'vendor':
            navigate('/vendor/dashboard')
            break
          case 'rider':
            navigate('/rider/dashboard')
            break
          case 'admin':
          case 'superadmin':
          case 'support':
          case 'marketing':
            navigate('/admin/dashboard')
            break
          default:
            console.warn('Unknown role, defaulting to user dashboard:', userData.role)
            navigate('/dashboard')
        }
      }, 100)
    } catch (error: any) {
      console.error('Login error details:', error)
      console.error('Error response:', error.response)
      const errorMessage = error.response?.data?.message || error.message || 'Sign in failed. Please check your credentials.'
      showError(errorMessage)
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    // Simulate Google sign in
    setTimeout(() => {
      console.log('Google sign in')
      showSuccess('Google sign in initiated!')
      setIsLoading(false)
    }, 1000)
  }

  const handleFacebookSignIn = () => {
    setIsLoading(true)
    // Simulate Facebook sign in
    setTimeout(() => {
      console.log('Facebook sign in')
      showSuccess('Facebook sign in initiated!')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 flex flex-col overflow-hidden relative">
      {/* Logo in top left corner */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
        <img
          src="/kushina%20logo%202.png"
          alt="Kushena logo"
          className="h-12 md:h-16 w-auto object-contain"
        />
      </div>

      {/* Centered Sign In Form */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
              Welcome back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Kushena</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600">
              Sign in to continue
            </p>
          </div>

          {/* Sign In Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-7">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Input */}
            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              error={errors.email}
              className="py-2"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                error={errors.password}
                className="py-2 pr-12"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[calc(1.5rem+0.5rem+0.5rem)] text-slate-500 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-100 flex items-center justify-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end -mt-1">
              <Link
                to="/forgot-password"
                className="text-xs text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full"
              size="md"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-yellow-200"></div>
            <span className="px-3 text-xs text-slate-500">Or continue with</span>
            <div className="flex-1 border-t border-yellow-200"></div>
          </div>

          {/* Social Sign In Buttons */}
          <div className="space-y-2">
            {/* Google Sign In */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full"
              size="sm"
              leftIcon={
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
            >
              Continue with Google
            </Button>

            {/* Facebook Sign In */}
            <Button
              type="button"
              onClick={handleFacebookSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full"
              size="sm"
              leftIcon={
                <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              }
            >
              Continue with Facebook
            </Button>
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-600">
              Don't have an account?{' '}
              <Link
                to="/registration"
                className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
