
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Star, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleProperties } from '@/data/sampleProperties';
import { Property } from '@/types/property';

const Admin = () => {
  const [properties] = useState<Property[]>(sampleProperties);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock authentication - in real app, this would be handled by Supabase auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock credentials for demo
    if (credentials.email === 'admin@vibestays.com' && credentials.password === 'demo123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use: admin@vibestays.com / demo123');
    }
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalProperties: properties.length,
    featuredProperties: properties.filter(p => p.featured).length,
    verifiedProperties: properties.filter(p => p.verified).length,
    totalReviews: properties.reduce((sum, p) => sum + p.reviewCount, 0)
  };

  if (!isAuthenticated) {
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
                placeholder="demo123"
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Credentials:</strong><br/>
              Email: admin@vibestays.com<br/>
              Password: demo123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your VibeStays properties</p>
            </div>
            <Button 
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProperties}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
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
                    {Math.round((stats.featuredProperties / stats.totalProperties) * 100)}% of total
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
                    All properties verified
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalReviews}</div>
                  <p className="text-xs text-muted-foreground">
                    Avg rating: 4.7/5
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={property.images[0]}
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
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{property.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">per {property.priceUnit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{property.name}</h3>
                            <p className="text-gray-600">{property.location}, {property.state}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant={property.featured ? "default" : "secondary"}>
                                {property.featured ? "Featured" : "Standard"}
                              </Badge>
                              <Badge variant={property.verified ? "default" : "destructive"}>
                                {property.verified ? "Verified" : "Pending"}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{property.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">per {property.priceUnit}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                          <span>{property.maxGuests} guests</span>
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            {property.rating} ({property.reviewCount})
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {properties.flatMap(p => p.reviews).map((review) => {
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
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{property?.name}</span>
                              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
