import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../components/ui';
import { Button, Input, Select, Textarea, Modal } from '../../components/ui';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  tags: string[];
}

const MenuManagement = () => {
  const { showSuccess, showError } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: '',
    isAvailable: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/menu');
      setMenuItems(response.data.menuItems || []);
    } catch (error: any) {
      console.error('Error fetching menu items:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load menu items';
      if (errorMessage.includes('Vendor not found')) {
        showError('Vendor profile not found. Please complete your vendor registration or contact support.');
      } else {
        showError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      tags: '',
      isAvailable: true,
    });
    setImageFile(null);
    setEditingItem(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      category: item.category || '',
      tags: item.tags.join(', '),
      isAvailable: item.isAvailable,
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('category', formData.category);
      submitData.append('tags', formData.tags);
      submitData.append('isAvailable', formData.isAvailable.toString());

      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (editingItem) {
        // Update existing item
        await api.patch(`/menu/${editingItem._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showSuccess('Menu item updated successfully!');
      } else {
        // Create new item
        await api.post('/menu', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showSuccess('Menu item added successfully!');
      }

      closeModal();
      fetchMenuItems();
    } catch (error: any) {
      console.error('Error saving menu item:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save menu item';
      if (errorMessage.includes('Vendor not found')) {
        showError('Vendor profile not found. Please complete your vendor registration or contact support.');
      } else {
        showError(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    try {
      await api.delete(`/menu/${id}`);
      showSuccess('Menu item deleted successfully!');
      fetchMenuItems();
    } catch (error: any) {
      console.error('Error deleting menu item:', error);
      showError(error.response?.data?.message || 'Failed to delete menu item');
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    try {
      const submitData = new FormData();
      submitData.append('isAvailable', (!item.isAvailable).toString());
      
      await api.patch(`/menu/${item._id}`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      showSuccess(`Menu item ${!item.isAvailable ? 'enabled' : 'disabled'} successfully!`);
      fetchMenuItems();
    } catch (error: any) {
      console.error('Error updating availability:', error);
      showError(error.response?.data?.message || 'Failed to update availability');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600 mt-1">Manage your menu items for customers to order</p>
        </div>
        <Button onClick={openAddModal} size="md">
          + Add Menu Item
        </Button>
      </div>

      {menuItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No menu items</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first menu item.</p>
          <div className="mt-6">
            <Button onClick={openAddModal} size="md">
              + Add Menu Item
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.imageUrl && (
                          <img
                            className="h-12 w-12 rounded-lg object-cover mr-3"
                            src={item.imageUrl}
                            alt={item.name}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category || 'Uncategorized'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₦{item.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleAvailability(item)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.isAvailable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., Jollof Rice"
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your menu item..."
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₦)"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder="0.00"
            />

            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select Category' },
                { value: 'Main Course', label: 'Main Course' },
                { value: 'Appetizer', label: 'Appetizer' },
                { value: 'Dessert', label: 'Dessert' },
                { value: 'Beverage', label: 'Beverage' },
                { value: 'Soup', label: 'Soup' },
                { value: 'Side Dish', label: 'Side Dish' },
                { value: 'Snack', label: 'Snack' },
                { value: 'Other', label: 'Other' },
              ]}
            />
          </div>

          <Input
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="e.g., spicy, vegetarian, popular"
          />

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
              />
              <span className="ml-2 text-sm text-gray-700">Available for order</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
            />
            {editingItem?.imageUrl && !imageFile && (
              <img
                src={editingItem.imageUrl}
                alt="Current"
                className="mt-2 h-24 w-24 rounded-lg object-cover"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MenuManagement;
