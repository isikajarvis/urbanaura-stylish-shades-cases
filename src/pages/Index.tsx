import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const Index = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem("urbanaura_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Fallback to initial products
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
      localStorage.setItem("urbanaura_products", JSON.stringify(initialProducts));
    }
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const iphoneCases = products.filter(product => product.category === "iphone-cases");
  const sunglasses = products.filter(product => product.category === "sunglasses");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-black">
              UrbanAura Nairobi
            </Link>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-600">Welcome, {user.name}</span>
                  {user.isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link to="/cart" className="relative">
                    <Button variant="outline" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-black text-white hover:bg-gray-800">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Premium iPhone Cases & Sunglasses</h1>
          <p className="text-xl mb-8 text-gray-300">
            Discover our curated collection of stylish protection and eyewear
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => setSelectedCategory("iphone-cases")}
              className="bg-white text-black hover:bg-gray-100"
            >
              Shop iPhone Cases
            </Button>
            <Button 
              onClick={() => setSelectedCategory("sunglasses")}
              className="bg-white text-black hover:bg-gray-100"
            >
              Shop Sunglasses
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-black text-white" : ""}
            >
              All Products ({products.length})
            </Button>
            <Button
              variant={selectedCategory === "iphone-cases" ? "default" : "outline"}
              onClick={() => setSelectedCategory("iphone-cases")}
              className={selectedCategory === "iphone-cases" ? "bg-black text-white" : ""}
            >
              iPhone Cases ({iphoneCases.length})
            </Button>
            <Button
              variant={selectedCategory === "sunglasses" ? "default" : "outline"}
              onClick={() => setSelectedCategory("sunglasses")}
              className={selectedCategory === "sunglasses" ? "bg-black text-white" : ""}
            >
              Sunglasses ({sunglasses.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            {selectedCategory === "all" ? "All Products" : 
             selectedCategory === "iphone-cases" ? "iPhone Cases" : "Sunglasses"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">UrbanAura Nairobi</h3>
              <p className="text-gray-300">Premium iPhone cases and sunglasses for the modern lifestyle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">iPhone Cases</a></li>
                <li><a href="#" className="hover:text-white">Sunglasses</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-300">WhatsApp: +254 701 036 266</p>
              <p className="text-gray-300 mt-2">Location: Outside USIU gate A opposite the nduthi stage</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UrbanAura Nairobi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
