
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [building, setBuilding] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowSignUpDialog(true);
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!user) {
      setShowSignUpDialog(true);
      return;
    }

    if (!customerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!location.trim()) {
      toast({
        title: "Error",
        description: "Please enter your location.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const totalAmount = getTotalPrice();
      
      const order = {
        id: Date.now(),
        customer: {
          name: customerName.trim(),
          phone: phoneNumber.trim(),
          location: location.trim(),
          building: building.trim() || "Not specified",
          houseNumber: houseNumber.trim() || "Not specified"
        },
        items,
        total: totalAmount,
        address: `${location.trim()}${building.trim() ? `, ${building.trim()}` : ''}${houseNumber.trim() ? `, House ${houseNumber.trim()}` : ''}`,
        paymentMethod: "Cash on Delivery",
        date: new Date().toISOString(),
        status: "Processing"
      };
      
      const existingOrders = JSON.parse(localStorage.getItem("urbanaura_orders") || "[]");
      localStorage.setItem("urbanaura_orders", JSON.stringify([...existingOrders, order]));
      
      clearCart();
      navigate("/order-success");
      
      toast({
        title: "Order placed successfully!",
        description: "Your order will arrive soon. Payment on delivery.",
      });
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <AlertDialog open={showSignUpDialog} onOpenChange={setShowSignUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Up Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please sign up or log in before proceeding with your purchase.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate("/register")}>
              Sign Up
            </AlertDialogAction>
            <AlertDialogAction onClick={() => navigate("/login")}>
              Log In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location (e.g., Westlands, Nairobi)"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="building">Building Name</Label>
                  <Input
                    id="building"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="Enter building name (optional)"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="houseNumber">House Number</Label>
                  <Input
                    id="houseNumber"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    placeholder="Enter house/apartment number (optional)"
                    className="mt-1"
                  />
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    ✓ Cash on Delivery
                  </p>
                  <p className="text-sm text-green-600">
                    Pay cash when your order arrives
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-white sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">
                        KSh {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>KSh {getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Payment Method</h4>
                  <p className="text-sm text-blue-800">Cash on Delivery</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Pay with cash when your order arrives
                  </p>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || !user}
                  className="w-full bg-black text-white hover:bg-gray-800 mt-6"
                >
                  {isProcessing ? "Processing..." : `Place Order - KSh ${getTotalPrice().toLocaleString()}`}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to pay cash on delivery
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
