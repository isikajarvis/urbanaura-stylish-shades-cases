
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features?: string[];
  inStock: boolean;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock product data - in a real app, this would fetch from an API
    const products: Product[] = [
      {
        id: 1,
        name: "Clear iPhone 15 Case",
        category: "iphone-cases",
        price: 2500,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop",
        description: "Crystal clear protection for your iPhone 15",
        features: ["Crystal Clear", "Drop Protection", "Wireless Charging Compatible", "Scratch Resistant"],
        inStock: true
      },
      {
        id: 2,
        name: "Leather iPhone 15 Pro Case",
        category: "iphone-cases",
        price: 4500,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop",
        description: "Premium leather case with card slots",
        features: ["Genuine Leather", "Card Slots", "Magnetic Closure", "Premium Feel"],
        inStock: true
      },
      {
        id: 3,
        name: "MagSafe iPhone 14 Case",
        category: "iphone-cases",
        price: 3500,
        image: "https://images.unsplash.com/photo-1592779677260-dea1358c09d3?w=500&h=500&fit=crop",
        description: "Compatible with MagSafe charging",
        features: ["MagSafe Compatible", "Strong Magnets", "Easy Installation", "Wireless Charging"],
        inStock: true
      },
      {
        id: 4,
        name: "Aviator Sunglasses",
        category: "sunglasses",
        price: 6500,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
        description: "Classic aviator style with UV protection",
        features: ["UV 400 Protection", "Metal Frame", "Classic Design", "Comfortable Fit"],
        inStock: true
      },
      {
        id: 5,
        name: "Polarized Sport Sunglasses",
        category: "sunglasses",
        price: 8500,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
        description: "Perfect for outdoor activities",
        features: ["Polarized Lenses", "Sport Design", "Lightweight", "Anti-Glare"],
        inStock: true
      },
      {
        id: 6,
        name: "Vintage Round Sunglasses",
        category: "sunglasses",
        price: 5500,
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=500&fit=crop",
        description: "Retro style meets modern protection",
        features: ["Vintage Style", "Round Frame", "UV Protection", "Trendy Design"],
        inStock: true
      }
    ];

    const foundProduct = products.find(p => p.id === parseInt(id || ""));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsLoading(true);
    try {
      addToCart(product);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    
    const message = `Hi! I'm interested in the ${product.name} (KSh ${product.price.toLocaleString()}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/254701036266?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Product not found</h2>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center text-black hover:text-gray-600">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Products
            </Link>
            <Link to="/" className="text-2xl font-bold text-black">
              UrbanAura
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category === "iphone-cases" ? "iPhone Case" : "Sunglasses"}
              </Badge>
              <h1 className="text-3xl font-bold text-black mb-4">{product.name}</h1>
              <p className="text-4xl font-bold text-black mb-4">
                KSh {product.price.toLocaleString()}
              </p>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="text-lg font-semibold text-black mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !product.inStock}
                className="w-full bg-black text-white hover:bg-gray-800 h-12"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isLoading ? "Adding..." : "Add to Cart"}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleWhatsAppInquiry}
                className="w-full border-black text-black hover:bg-black hover:text-white h-12"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Inquiry
              </Button>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-black mb-2">Delivery Information</h4>
                <p className="text-sm text-gray-600">
                  • Free delivery within Nairobi<br/>
                  • Delivery within 90 minutes<br/>
                  • Pay on delivery available<br/>
                  • M-Pesa payment accepted
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
