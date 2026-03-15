import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../components/ui';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FileInput from '../components/ui/FileInput';

const VendorRegistration = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    businessName: '',
    email: '',
    password: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    businessType: '',
    city: '',
    primaryLocationAddress: '',
    primaryLocationLat: '',
    primaryLocationLng: '',
  });

  const [files, setFiles] = useState<Record<string, File[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (name: string, fileList: FileList | null) => {
    if (fileList) {
      const filesArray = Array.from(fileList);
      setFiles({ ...files, [name]: filesArray });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // Add files
      Object.entries(files).forEach(([key, fileList]) => {
        fileList.forEach((file) => {
          submitData.append(key, file);
        });
      });

      const response = await api.post('/vendor-registration/vendor', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success && response.data.token && response.data.user) {
        // Auto-login the user after registration
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        showSuccess('Registration submitted successfully! Redirecting to dashboard...');
        
        // Redirect to vendor dashboard
        setTimeout(() => {
          navigate('/vendor/dashboard');
        }, 1000);
      } else {
        showSuccess('Registration submitted successfully! Please sign in to access your dashboard.');
        navigate('/signin');
      }
    } catch (error: any) {
      showError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Vendor Registration</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Business Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Business Name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Owner/Manager Name"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="WhatsApp (Optional)"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
                <Input
                  label="Telegram (Optional)"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Business Type</option>
                    <option value="Restaurant Tier 1">Restaurant Tier 1</option>
                    <option value="Restaurant Tier 2">Restaurant Tier 2</option>
                    <option value="Restaurant Tier 3">Restaurant Tier 3</option>
                    <option value="Restaurant Tier 4">Restaurant Tier 4</option>
                    <option value="Elite Restaurant">Elite Restaurant</option>
                    <option value="Catering Service">Catering Service</option>
                    <option value="Lounge">Lounge</option>
                    <option value="Night Club">Night Club</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Primary Location Address"
                  name="primaryLocationAddress"
                  value={formData.primaryLocationAddress}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Latitude"
                  name="primaryLocationLat"
                  type="number"
                  step="any"
                  value={formData.primaryLocationLat}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Longitude"
                  name="primaryLocationLng"
                  type="number"
                  step="any"
                  value={formData.primaryLocationLng}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Documents */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileInput
                  label="Business Registration"
                  name="businessRegistration"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(files) => handleFileChange('businessRegistration', files)}
                />
                <FileInput
                  label="Business License"
                  name="license"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(files) => handleFileChange('license', files)}
                />
                <FileInput
                  label="TIN"
                  name="tin"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(files) => handleFileChange('tin', files)}
                />
                <FileInput
                  label="Certificate"
                  name="certificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(files) => handleFileChange('certificate', files)}
                />
                <FileInput
                  label="Menu Samples"
                  name="menuSamples"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={(files) => handleFileChange('menuSamples', files)}
                />
                <FileInput
                  label="Promo Video (30 seconds)"
                  name="promoVideo"
                  accept=".mp4,.mov,.avi"
                  onChange={(files) => handleFileChange('promoVideo', files)}
                />
                <FileInput
                  label="Photos"
                  name="photos"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={(files) => handleFileChange('photos', files)}
                />
                <FileInput
                  label="Videos"
                  name="videos"
                  accept=".mp4,.mov,.avi"
                  multiple
                  onChange={(files) => handleFileChange('videos', files)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" isLoading={loading}>
              Submit Registration
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
