
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Star, MapPin, Users, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminProperties } from '@/hooks/useAdminProperties';
import AdminProperties from './AdminProperties';

const Admin = () => {
  const { user, isAdmin, loading, signIn, signOut } = useAdminAuth();
  const { properties = [] } = useAdminProperties();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const { error } = await signIn(credentials.email, credentials.password);
    
    if (error) {
      setLoginError(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const stats = {
    totalProperties: properties.length,
    featuredProperties: properties.filter(p => p.featured).length,
    verifiedProperties: properties.filter(p => p.verified).length,
    totalReviews: properties.reduce((sum, p) => sum + (p.reviewCount || 0), 0),
    avgRating: properties.length > 0 
      ? (properties.reduce((sum, p) => sum + (p.rating || 0), 0) / properties.length).toFixed(1)
      : '0.0'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-sm border max-w-md w-full mx-4"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the VibeStays admin dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                placeholder="admin@vibestays.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="admin123"
                required
              />
            </div>
            
            {loginError && (
              <div className="text-red-600 text-sm">{loginError}</div>
            )}
            
            <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Credentials:</strong><br/>
              Email: admin@vibestays.com<br/>
              Password: admin123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (activeTab === 'properties') {
    return <AdminProperties />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your VibeStays properties and bookings</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProperties}</div>
                  <p className="text-xs text-muted-foreground">
                    Active listings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Featured</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.featuredProperties}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.totalProperties > 0 ? Math.round((stats.featuredProperties / stats.totalProperties) * 100) : 0}% of total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verified</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.verifiedProperties}</div>
                  <p className="text-xs text-muted-foreground">
                    Verified properties
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalReviews}</div>
                  <p className="text-xs text-muted-foreground">
                    Customer reviews
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgRating}</div>
                  <p className="text-xs text-muted-foreground">
                    Overall rating
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveTab('properties')} 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Plus className="h-6 w-6" />
                    <span>Add New Property</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('properties')}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Edit className="h-6 w-6" />
                    <span>Manage Properties</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('reviews')}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Star className="h-6 w-6" />
                    <span>Review Management</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Properties</CardTitle>
                  <Button variant="outline" onClick={() => setActiveTab('properties')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.slice(0, 5).map((property) => (
                    <div key={property.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={property.images[0] || '/placeholder.svg'}
                        alt={property.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{property.name}</h3>
                        <p className="text-sm text-gray-600">{property.location}, {property.state}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={property.featured ? "default" : "secondary"}>
                            {property.featured ? "Featured" : "Standard"}
                          </Badge>
                          <Badge variant={property.verified ? "default" : "destructive"}>
                            {property.verified ? "Verified" : "Pending"}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {property.propertyType}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{property.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">per {property.priceUnit}</div>
                        <div className="flex items-center justify-end mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm">{property.rating || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {properties.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No properties found. Add your first property to get started!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Management</CardTitle>
                <p className="text-sm text-gray-600">Manage customer reviews and ratings</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {properties.flatMap(p => p.reviews || []).length > 0 ? (
                    properties.flatMap(p => p.reviews || []).map((review) => {
                      const property = properties.find(p => p.id === review.propertyId);
                      return (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium">{review.guestName}</span>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="ml-1 text-sm">{review.rating}</span>
                                </div>
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs">Verified</Badge>
                                )}
                                <Badge variant={review.approved ? "default" : "secondary"} className="text-xs">
                                  {review.approved ? "Approved" : "Pending"}
                                </Badge>
                              </div>
                              <p className="text-gray-700 mb-2">{review.comment}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{property?.name}</span>
                                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {!review.approved && (
                                <Button size="sm" variant="outline">
                                  Approve
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="text-red-600">
                                {review.approved ? "Reject" : "Delete"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No reviews found.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Destinations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      properties.reduce((acc, p) => {
                        acc[p.state] = (acc[p.state] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([state, count]) => (
                      <div key={state} className="flex items-center justify-between">
                        <span>{state}</span>
                        <Badge variant="secondary">{count} properties</Badge>
                      </div>
                    ))}
                    {properties.length === 0 && (
                      <p className="text-gray-500 text-center">No data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      properties.reduce((acc, p) => {
                        acc[p.propertyType] = (acc[p.propertyType] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="capitalize">{type}</span>
                        <Badge variant="secondary">{count} properties</Badge>
                      </div>
                    ))}
                    {properties.length === 0 && (
                      <p className="text-gray-500 text-center">No data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = properties.filter(p => 
                        Math.floor(p.rating || 0) === rating
                      ).length;
                      const percentage = properties.length > 0 
                        ? Math.round((count / properties.length) * 100) 
                        : 0;
                      
                      return (
                        <div key={rating} className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 w-16">
                            <span>{rating}</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Ranges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'Under ₹2,000', min: 0, max: 2000 },
                      { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
                      { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
                      { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
                      { label: 'Above ₹20,000', min: 20000, max: Infinity }
                    ].map(range => {
                      const count = properties.filter(p => 
                        p.price >= range.min && p.price < range.max
                      ).length;
                      
                      return (
                        <div key={range.label} className="flex items-center justify-between">
                          <span>{range.label}</span>
                          <Badge variant="secondary">{count} properties</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
