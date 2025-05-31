
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
      return;
    }
    
    // Load initial products with real images
    const initialProducts = [
      {
        id: 1,
        name: "Clear iPhone 15 Case",
        category: "iphone-cases",
        price: 2500,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
        description: "Crystal clear protection for your iPhone 15"
      },
      {
        id: 2,
        name: "Leather iPhone 15 Pro Case",
        category: "iphone-cases",
        price: 4500,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
        description: "Premium leather case with card slots"
      },
      {
        id: 3,
        name: "MagSafe iPhone 14 Case",
        category: "iphone-cases",
        price: 3500,
        image: "https://images.unsplash.com/photo-1592779677260-dea1358c09d3?w=400&h=400&fit=crop",
        description: "Compatible with MagSafe charging"
      },
      {
        id: 4,
        name: "Aviator Sunglasses",
        category: "sunglasses",
        price: 6500,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        description: "Classic aviator style with UV protection"
      },
      {
        id: 5,
        name: "Polarized Sport Sunglasses",
        category: "sunglasses",
        price: 8500,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
        description: "Perfect for outdoor activities"
      },
      {
        id: 6,
        name: "Vintage Round Sunglasses",
        category: "sunglasses",
        price: 5500,
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop",
        description: "Retro style meets modern protection"
      }
    ];
    setProducts(initialProducts);
  }, [user, navigate]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setImage("");
    setDescription("");
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    if (!name || !category || !price || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      category,
      price: parseInt(price),
      image: image || "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
      description,
    };

    setProducts([...products, newProduct]);
    resetForm();
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct || !name || !category || !price || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedProducts = products.map(product =>
      product.id === editingProduct.id
        ? { ...product, name, category, price: parseInt(price), image: image || product.image, description }
        : product
    );

    setProducts(updatedProducts);
    resetForm();
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Product updated successfully!",
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Success",
      description: "Product deleted successfully!",
    });
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price.toString());
    setImage(product.image);
    setDescription(product.description);
    setIsEditDialogOpen(true);
  };

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your UrbanAura store</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">iPhone Cases</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.category === "iphone-cases").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sunglasses</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.category === "sunglasses").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Products Management</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-black text-white hover:bg-gray-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iphone-cases">iPhone Cases</SelectItem>
                          <SelectItem value="sunglasses">Sunglasses</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price (KSh) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL (optional)</Label>
                      <Input
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="w-full bg-black text-white hover:bg-gray-800">
                      Add Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <p className="text-sm font-semibold">KSh {product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iphone-cases">iPhone Cases</SelectItem>
                    <SelectItem value="sunglasses">Sunglasses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-price">Price (KSh) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description *</Label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button onClick={handleEditProduct} className="w-full bg-black text-white hover:bg-gray-800">
                Update Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
