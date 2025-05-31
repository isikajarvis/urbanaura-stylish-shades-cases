
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    // Load products from localStorage
    const savedProducts = localStorage.getItem("urbanaura_products");
    let products: Product[] = [];
    
    if (savedProducts) {
      products = JSON.parse(savedProducts);
    } else {
      // Fallback to initial products
      products = [
        {
          id: 1,
          name: "Clear iPhone 15 Case",
          category: "iphone-cases",
          price: 2500,
          image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
          description: "Crystal clear protection for your iPhone 15. Made with high-quality materials that resist yellowing and provide excellent drop protection."
        },
        {
          id: 2,
          name: "Leather iPhone 15 Pro Case",
          category: "iphone-cases",
          price: 4500,
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
          description: "Premium leather case with card slots. Handcrafted from genuine leather with precise cutouts for all ports and buttons."
        },
        {
          id: 3,
          name: "MagSafe iPhone 14 Case",
          category: "iphone-cases",
          price: 3500,
          image: "https://images.unsplash.com/photo-1592779677260-dea1358c09d3?w=400&h=400&fit=crop",
          description: "Compatible with MagSafe charging and accessories. Features built-in magnets for seamless wireless charging."
        },
        {
          id: 4,
          name: "Aviator Sunglasses",
          category: "sunglasses",
          price: 6500,
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
          description: "Classic aviator style with UV protection. Features polarized lenses and durable metal frames."
        },
        {
          id: 5,
          name: "Polarized Sport Sunglasses",
          category: "sunglasses",
          price: 8500,
          image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
          description: "Perfect for outdoor activities. Lightweight design with impact-resistant lenses and comfortable fit."
        },
        {
          id: 6,
          name: "Vintage Round Sunglasses",
          category: "sunglasses",
          price: 5500,
          image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop",
          description: "Retro style meets modern protection. Classic round frames with contemporary lens technology."
        }
      ];
    }

    const foundProduct = products.find(p => p.id === parseInt(id));
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
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} added to your cart.`,
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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-black">
              UrbanAura
            </Link>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </nav>

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
              <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8/5 - 24 reviews)</span>
              </div>
              <p className="text-4xl font-bold text-black mb-4">
                KSh {product.price.toLocaleString()}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Premium quality materials</li>
                  <li>• Perfect fit and finish</li>
                  <li>• Easy installation</li>
                  <li>• 1-year warranty</li>
                </ul>
              </CardContent>
            </Card>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 border rounded-md">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="w-full bg-black text-white hover:bg-gray-800 py-3"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isLoading ? "Adding..." : `Add to Cart - KSh ${(product.price * quantity).toLocaleString()}`}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleWhatsAppInquiry}
                  className="w-full border-black text-black hover:bg-black hover:text-white py-3"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Inquire via WhatsApp
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Delivery Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ Fast delivery within 90 minutes</p>
                  <p>✓ Delivery fee: KSh 200</p>
                  <p>✓ Cash on delivery available</p>
                  <p>✓ M-Pesa payment accepted</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
