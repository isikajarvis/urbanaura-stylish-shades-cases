
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, MessageCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = `UA${Date.now().toString().slice(-6)}`;

  const handleWhatsAppContact = () => {
    const message = `Hi! I just placed an order (${orderNumber}). Can you confirm my order details?`;
    const whatsappUrl = `https://wa.me/254701036266?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Card className="bg-white text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-black">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg font-semibold text-black mb-2">
                Thank you for your order!
              </p>
              <p className="text-gray-600 mb-4">
                Your order #{orderNumber} has been confirmed and is being prepared.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">
                  🚚 Your order is on the way!
                </p>
                <p className="text-green-700 text-sm mt-1">
                  We will contact you shortly with order details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">What's next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-black mb-2">📱 Track your order</h4>
                  <p className="text-sm text-gray-600">
                    Contact us on WhatsApp for real-time updates
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-black mb-2">🎁 Prepare for order</h4>
                  <p className="text-sm text-gray-600">
                    Our team will contact you shortly
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleWhatsAppContact}
                className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Contact via WhatsApp
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>Order Details:</strong><br />
                Order #: {orderNumber}<br />
                Status: Confirmed & Processing<br />
                Support: WhatsApp 0701036266
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
