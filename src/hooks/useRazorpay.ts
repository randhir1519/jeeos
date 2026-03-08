import { useEffect } from "react";
import { supabase } from "@/services/supabase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (planName: string, amount: number, onSuccess: () => void) => {
    // In a real implementation, you would call your backend to create an order
    // For this demo, we'll simulate the flow or use client-side only (not secure for prod)
    
    // 1. Get User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login to purchase");
      return;
    }

    const options = {
      key: "rzp_test_YOUR_KEY_HERE", // Replace with actual key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "JEEOS",
      description: `Subscription for ${planName}`,
      image: "https://your-logo-url.com/logo.png",
      handler: async function (response: any) {
        // 2. Save Subscription to Supabase on Success
        try {
          const { error } = await supabase.from('subscriptions').insert({
            user_id: user.id,
            plan_name: planName,
            amount: amount,
            payment_status: 'paid',
            payment_id: response.razorpay_payment_id,
            start_date: new Date().toISOString(),
            end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString() // 1 Year validity
          });

          if (error) throw error;
          onSuccess();
        } catch (err) {
          console.error("Subscription save failed", err);
          alert("Payment successful but subscription update failed. Contact support.");
        }
      },
      prefill: {
        name: user.user_metadata.full_name,
        email: user.email,
        contact: ""
      },
      theme: {
        color: "#4f46e5"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return { handlePayment };
};
