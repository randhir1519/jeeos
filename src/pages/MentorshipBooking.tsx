import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Phone, Calendar, CheckCircle2 } from "lucide-react";
import { supabase } from "@/services/supabase";

export default function MentorshipBooking() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    class: "11",
    jee_attempt_year: "2026",
    preferred_time: "Evening (6PM - 9PM)"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('mentorship_call_requests').insert(formData);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-900 border-emerald-500/30">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">Request Received!</h3>
            <p className="text-slate-400">
              Our mentorship team will contact you shortly on <span className="text-white font-mono">{formData.mobile}</span> to schedule your 1:1 strategy call.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">
              Book Another
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Book 1:1 Mentorship Call</CardTitle>
          <CardDescription>Speak with a senior mentor to plan your strategy.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Full Name</Label>
              <Input 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-slate-950 border-slate-800 text-white"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Mobile Number</Label>
              <Input 
                required
                type="tel"
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                className="bg-slate-950 border-slate-800 text-white"
                placeholder="9876543210"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Class</Label>
                <Select onValueChange={(v) => setFormData({...formData, class: v})} defaultValue={formData.class}>
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                    <SelectItem value="Dropper">Dropper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Target Year</Label>
                <Select onValueChange={(v) => setFormData({...formData, jee_attempt_year: v})} defaultValue={formData.jee_attempt_year}>
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Preferred Call Time</Label>
              <Select onValueChange={(v) => setFormData({...formData, preferred_time: v})} defaultValue={formData.preferred_time}>
                <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                  <SelectItem value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</SelectItem>
                  <SelectItem value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</SelectItem>
                  <SelectItem value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</SelectItem>
                  <SelectItem value="Night (8PM - 10PM)">Night (8PM - 10PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-4" variant="glow" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Request Call"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
