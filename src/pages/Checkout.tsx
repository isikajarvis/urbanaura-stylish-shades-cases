
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery pricing based on areas
  const deliveryPricing = {
    "city-center": 150,
    "westlands": 200,
    "karen": 300,
    "kiambu": 400,
    "thika": 500,
    "other": 350
  };

  const deliveryFee = area ? deliveryPricing[area as keyof typeof deliveryPricing] || 350 : 200;

  const simulateMpesaPrompt = async (phoneNumber: string, amount: number) => {
    console.log(`Simulating M-Pesa prompt to ${phoneNumber} for KSh ${amount}`);
    
    // Simulate API call to M-Pesa
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
          resolve({ success: true, transactionId: `TXN${Date.now()}` });
        } else {
          reject(new Error("M-Pesa transaction failed"));
        }
      }, 3000); // 3 second delay to simulate real API
    });
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Please enter your delivery address.",
        variant: "destructive",
      });
      return;
    }

    if (!area) {
      toast({
        title: "Error",
        description: "Please select your delivery area.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "mpesa" && !phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter your M-Pesa phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const totalAmount = getTotalPrice() + deliveryFee;

      if (paymentMethod === "mpesa") {
        toast({
          title: "M-Pesa Prompt Sent",
          description: `Please check your phone ${phoneNumber} for M-Pesa payment prompt of KSh ${totalAmount.toLocaleString()}`,
        });

        // Simulate M-Pesa payment
        await simulateMpesaPrompt(phoneNumber, totalAmount);
        
        toast({
          title: "Payment Successful",
          description: "M-Pesa payment completed successfully!",
        });
      }
      
      // Save order to localStorage for admin to see
      const order = {
        id: Date.now(),
        customer: user,
        items,
        subtotal: getTotalPrice(),
        deliveryFee,
        total: totalAmount,
        address,
        area,
        paymentMethod,
        phoneNumber: paymentMethod === "mpesa" ? phoneNumber : "",
        date: new Date().toISOString(),
        status: "Processing"
      };
      
      const existingOrders = JSON.parse(localStorage.getItem("urbanaura_orders") || "[]");
      localStorage.setItem("urbanaura_orders", JSON.stringify([...existingOrders, order]));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate("/order-success");
      
      toast({
        title: "Order placed successfully!",
        description: "Your order is being processed and will be delivered within 90 minutes.",
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "M-Pesa payment failed. Please try again.",
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Delivery Information */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={user?.name || ""}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="area">Delivery Area *</Label>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city-center">Nairobi City Center - KSh 150</SelectItem>
                      <SelectItem value="westlands">Westlands - KSh 200</SelectItem>
                      <SelectItem value="karen">Karen - KSh 300</SelectItem>
                      <SelectItem value="kiambu">Kiambu - KSh 400</SelectItem>
                      <SelectItem value="thika">Thika - KSh 500</SelectItem>
                      <SelectItem value="other">Other Areas - KSh 350</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="address">Detailed Address *</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your detailed address"
                    className="mt-1"
                    required
                  />
                </div>
                <p className="text-sm text-green-600 font-medium">
                  ✓ Delivery within 90 minutes - KSh {deliveryFee}
                </p>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <Label htmlFor="mpesa" className="flex-1">
                      M-Pesa Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Truck className="h-5 w-5 text-blue-600" />
                    <Label htmlFor="cod" className="flex-1">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "mpesa" && (
                  <div className="mt-4">
                    <Label htmlFor="phone">M-Pesa Phone Number *</Label>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="07XXXXXXXX or 254XXXXXXXX"
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      You will receive an M-Pesa prompt to complete payment
                    </p>
                  </div>
                )}
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
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KSh {getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery ({area || 'Select area'})</span>
                    <span>KSh {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>KSh {(getTotalPrice() + deliveryFee).toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-black text-white hover:bg-gray-800 mt-6"
                >
                  {isProcessing ? "Processing..." : `Place Order - KSh ${(getTotalPrice() + deliveryFee).toLocaleString()}`}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our terms and conditions
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
