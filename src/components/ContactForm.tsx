import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  variant?: "contact" | "admission" | "career";
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = "Get in Touch",
  subtitle = "We'd love to hear from you and answer any questions about our care services.",
  variant = "contact",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    relationship: "",
    urgency: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        relationship: "",
        urgency: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly at (555) 123-4567.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-foreground">{title}</CardTitle>
        <p className="text-center text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                aria-describedby="name-description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                aria-describedby="email-description"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship to Potential Resident</Label>
              <Select value={formData.relationship} onValueChange={(value) => handleChange("relationship", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult-child">Adult Child</SelectItem>
                  <SelectItem value="spouse">Spouse/Partner</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="other-family">Other Family Member</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="professional">Healthcare Professional</SelectItem>
                  <SelectItem value="self">Myself</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {variant === "admission" && (
            <div className="space-y-2">
              <Label htmlFor="urgency">Timeline for Care Needs</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleChange("urgency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (Within 1 week)</SelectItem>
                  <SelectItem value="urgent">Urgent (Within 1 month)</SelectItem>
                  <SelectItem value="planning">Planning (Within 3 months)</SelectItem>
                  <SelectItem value="future">Future Planning (3+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">
              {variant === "admission" ? "Tell us about your care needs" : "Message"}
              {variant === "contact" && " *"}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder={
                variant === "admission"
                  ? "Please describe the level of care needed, any specific medical conditions, preferences, or questions you have..."
                  : "How can we help you today?"
              }
              rows={4}
              required={variant === "contact"}
            />
          </div>

          <Button
            type="submit"
            variant="warm"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy and will never share your information with third parties. 
            You can also call us directly at{" "}
            <a href="tel:5551234567" className="text-warm-accent hover:underline">
              (555) 123-4567
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;