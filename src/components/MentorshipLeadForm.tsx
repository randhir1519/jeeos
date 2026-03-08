import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Phone, Calendar, User, GraduationCap, X, MessageCircle } from "lucide-react";
import { api } from "@/services/api";

export function MentorshipLeadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    class: "11",
    jee_attempt_year: "2026"
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.saveMentorshipLead(formData);
      setSubmitted(true);
    } catch (err: any) {
      setError("Failed to book session. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg rounded-full px-6 py-6 h-auto font-bold transition-all hover:scale-105 hover:shadow-indigo-500/25 flex items-center gap-3"
        >
          <Phone className="w-5 h-5 animate-pulse" />
          Free Mentorship Call
        </Button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 bg-slate-800 text-slate-400 hover:text-white rounded-full p-2 hover:bg-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <Card className="bg-slate-900 border-emerald-500/50 shadow-2xl">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Session Booked!</h3>
                  <p className="text-slate-400">
                    Our academic counselor will call you shortly on <span className="text-white font-mono">{formData.mobile_number}</span> to schedule your free strategy session.
                  </p>
                  <Button variant="outline" onClick={() => { setSubmitted(false); setIsOpen(false); }}>Close</Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-900 border-slate-800 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Book Free Strategy Call</CardTitle>
                  <CardDescription>Fill in your details to get a callback from our mentors.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4" /> Student Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Mobile Number
                      </label>
                      <input 
                        type="tel" 
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"
                        value={formData.mobile_number}
                        onChange={(e) => setFormData({...formData, mobile_number: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="9876543210"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" /> Class
                        </label>
                        <select 
                          value={formData.class}
                          onChange={(e) => setFormData({...formData, class: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="11">Class 11</option>
                          <option value="12">Class 12</option>
                          <option value="Dropper">Dropper</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> Target Year
                        </label>
                        <select 
                          value={formData.jee_attempt_year}
                          onChange={(e) => setFormData({...formData, jee_attempt_year: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                        </select>
                      </div>
                    </div>

                    {error && <div className="text-red-400 text-sm">{error}</div>}

                    <Button className="w-full mt-2" variant="glow" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Book Free Session"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  );
}
