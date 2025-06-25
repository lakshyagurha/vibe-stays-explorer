
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Property } from '@/types/property';
import { Edit, Trash2, Eye, Star } from 'lucide-react';

interface PropertyTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onView: (property: Property) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const PropertyTable: React.FC<PropertyTableProps> = ({
  properties,
  onEdit,
  onView,
  onDelete,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Loading properties...</p>
        </CardContent>
      </Card>
    );
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600 mb-4">No properties found</p>
          <p className="text-sm text-gray-500">Add your first property to get started</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Name & Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <img
                      src={property.images[0] || '/placeholder.svg'}
                      alt={property.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{property.name}</div>
                      <div className="text-sm text-gray-600">
                        {property.location}, {property.state}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {property.propertyType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">₹{property.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">per {property.priceUnit}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{property.maxGuests} guests</div>
                      <div className="text-gray-600">{property.bedrooms} bed, {property.bathrooms} bath</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{property.rating || 0}</span>
                      <span className="text-sm text-gray-600 ml-1">({property.reviewCount || 0})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant={property.featured ? "default" : "secondary"} className="text-xs">
                        {property.featured ? "Featured" : "Standard"}
                      </Badge>
                      <Badge variant={property.verified ? "default" : "destructive"} className="text-xs">
                        {property.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onView(property)}
                        title="View Property"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(property)}
                        title="Edit Property"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(property.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete Property"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyTable;
