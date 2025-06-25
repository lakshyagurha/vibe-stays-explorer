
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search } from 'lucide-react';
import { useAdminProperties } from '@/hooks/useAdminProperties';
import PropertyTable from '@/components/admin/PropertyTable';
import PropertyForm from '@/components/admin/PropertyForm';
import PropertyView from '@/components/admin/PropertyView';
import { Property } from '@/types/property';

const AdminProperties = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);

  const { 
    properties, 
    isLoading, 
    createProperty, 
    updateProperty, 
    deleteProperty 
  } = useAdminProperties();

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.hostName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
    setViewingProperty(null);
  };

  const handleViewProperty = (property: Property) => {
    setViewingProperty(property);
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      deleteProperty.mutate(id);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingProperty) {
        await updateProperty.mutateAsync({ id: editingProperty.id, ...data });
      } else {
        await createProperty.mutateAsync(data);
      }
      setShowForm(false);
      setEditingProperty(null);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <PropertyForm
          property={editingProperty}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={createProperty.isPending || updateProperty.isPending}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Property Management</CardTitle>
              <Button onClick={handleAddProperty} className="bg-primary-600 hover:bg-primary-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search properties by name, location, state, or host..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{properties.length}</div>
              <div className="text-sm text-gray-600">Total Properties</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{properties.filter(p => p.featured).length}</div>
              <div className="text-sm text-gray-600">Featured</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{properties.filter(p => p.verified).length}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{filteredProperties.length}</div>
              <div className="text-sm text-gray-600">Search Results</div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Table */}
        <PropertyTable
          properties={filteredProperties}
          onEdit={handleEditProperty}
          onView={handleViewProperty}
          onDelete={handleDeleteProperty}
          isLoading={isLoading}
        />

        {/* Property View Modal */}
        {viewingProperty && (
          <PropertyView
            property={viewingProperty}
            onClose={() => setViewingProperty(null)}
            onEdit={() => handleEditProperty(viewingProperty)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProperties;
