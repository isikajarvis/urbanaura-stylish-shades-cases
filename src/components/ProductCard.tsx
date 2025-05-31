
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Map product images to actual URLs
  const getProductImage = (product: Product) => {
    const imageMap: { [key: number]: string } = {
      1: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
      2: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
      3: "https://images.unsplash.com/photo-1592779677260-dea1358c09d3?w=400&h=400&fit=crop",
      4: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      5: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
      6: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop"
    };
    return imageMap[product.id] || product.image;
  };

  const handleAddToCart = async () => {
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
    const message = `Hi! I'm interested in the ${product.name} (KSh ${product.price.toLocaleString()}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/254701036266?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`}>
          <div className="w-full h-64 rounded-t-lg overflow-hidden bg-gray-100">
            <img
              src={getProductImage(product)}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <div className="p-6">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-gray-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          <p className="text-2xl font-bold text-black">
            KSh {product.price.toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
          <Button
            variant="outline"
            onClick={handleWhatsAppInquiry}
            className="border-black text-black hover:bg-black hover:text-white flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
