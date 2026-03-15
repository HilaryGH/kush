import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../components/ui';
import { Button, Input, Select } from '../../components/ui';

interface User {
  _id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: string;
  registrationStatus?: string;
  registrationType?: string;
  businessName?: string;
  city?: string;
  createdAt: string;
  isVerified?: boolean;
}

const UsersManagement = () => {
  const { showSuccess, showError } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.role && filters.role.trim()) params.append('role', filters.role.trim());
      if (filters.status && filters.status.trim()) params.append('status', filters.status.trim());
      if (filters.search && filters.search.trim()) params.append('search', filters.search.trim());

      const queryString = params.toString();
      const url = `/admin/users${queryString ? `?${queryString}` : ''}`;
      console.log('Fetching users from:', url);
      
      const response = await api.get(url);
      console.log('Users response:', response.data);
      console.log('Number of users:', response.data?.users?.length || 0);
      
      if (response.data && response.data.success !== false) {
        // Handle both { success: true, users: [...] } and { users: [...] } formats
        const usersList = response.data.users || response.data || [];
        setUsers(Array.isArray(usersList) ? usersList : []);
        
        if (usersList.length === 0) {
          console.log('No users found in response');
        }
      } else {
        console.error('Unexpected response format:', response.data);
        setUsers([]);
        if (response.data?.message) {
          showError(response.data.message);
        }
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setUsers([]);
      
      if (error.response?.status === 403) {
        showError('Access denied. You do not have permission to view users.');
      } else if (error.response?.status === 401) {
        showError('Authentication failed. Please sign in again.');
      } else {
        showError(error.response?.data?.message || 'Failed to load users. Please check console for details.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApproveReject = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      await api.patch(`/admin/users/${userId}/registration-status`, { registrationStatus: status });
      showSuccess(`User registration ${status} successfully`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating user status:', error);
      showError(error.response?.data?.message || 'Failed to update user status');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      user: 'bg-blue-100 text-blue-800',
      vendor: 'bg-green-100 text-green-800',
      rider: 'bg-purple-100 text-purple-800',
      admin: 'bg-yellow-100 text-yellow-800',
      superadmin: 'bg-red-100 text-red-800',
      support: 'bg-indigo-100 text-indigo-800',
      marketing: 'bg-pink-100 text-pink-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadgeColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const colors: Record<string, string> = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage all users in the system</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Search"
            name="search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by name, email, or phone..."
          />
          <Select
            label="Role"
            name="role"
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            options={[
              { value: '', label: 'All Roles' },
              { value: 'user', label: 'User' },
              { value: 'vendor', label: 'Vendor' },
              { value: 'rider', label: 'Rider' },
              { value: 'admin', label: 'Admin' },
              { value: 'superadmin', label: 'Super Admin' },
              { value: 'support', label: 'Support' },
              { value: 'marketing', label: 'Marketing' },
            ]}
          />
          <Select
            label="Registration Status"
            name="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'approved', label: 'Approved' },
              { value: 'pending', label: 'Pending' },
              { value: 'rejected', label: 'Rejected' },
            ]}
          />
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => setFilters({ role: '', status: '', search: '' })}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.businessName && (
                          <div className="text-xs text-gray-400">{user.businessName}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone || 'N/A'}</div>
                      {user.city && (
                        <div className="text-xs text-gray-500">{user.city}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                          user.registrationStatus
                        )}`}
                      >
                        {user.registrationStatus || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.registrationStatus === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleApproveReject(user._id, 'approved')}
                            className="text-green-600 hover:text-green-900 font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproveReject(user._id, 'rejected')}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {user.registrationStatus !== 'pending' && (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            <div className="text-sm text-gray-500">Total Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === 'user').length}
            </div>
            <div className="text-sm text-gray-500">Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.role === 'vendor').length}
            </div>
            <div className="text-sm text-gray-500">Vendors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter(u => u.registrationStatus === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
