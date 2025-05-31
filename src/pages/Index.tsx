import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Updated products data with proper image URLs
  const products = [
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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-black">
                UrbanAura
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedCategory === "all" ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black"
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setSelectedCategory("iphone-cases")}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedCategory === "iphone-cases" ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black"
                }`}
              >
                iPhone Cases
              </button>
              <button
                onClick={() => setSelectedCategory("sunglasses")}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedCategory === "sunglasses" ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black"
                }`}
              >
                Sunglasses
              </button>
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>

              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hi, {user.name}</span>
                  <Button variant="ghost" onClick={logout}>Logout</Button>
                  {user.isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">Admin</Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-500 hover:text-black"
                  >
                    All Products
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("iphone-cases");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-500 hover:text-black"
                  >
                    iPhone Cases
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("sunglasses");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-500 hover:text-black"
                  >
                    Sunglasses
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Premium Accessories
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of iPhone cases and sunglasses. Quality meets style.
          </p>
          <Button 
            size="lg" 
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => setSelectedCategory("all")}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">
              {selectedCategory === "all" ? "All Products" : 
               selectedCategory === "iphone-cases" ? "iPhone Cases" : "Sunglasses"}
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>

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
              <h3 className="text-xl font-bold mb-4">UrbanAura</h3>
              <p className="text-gray-400">
                Premium accessories for the modern lifestyle. Quality guaranteed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><button onClick={() => setSelectedCategory("iphone-cases")} className="hover:text-white">iPhone Cases</button></li>
                <li><button onClick={() => setSelectedCategory("sunglasses")} className="hover:text-white">Sunglasses</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">WhatsApp: 0701036266</p>
              <p className="text-gray-400">Delivery: Under 90 minutes</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UrbanAura. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
