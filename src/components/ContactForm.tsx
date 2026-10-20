import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface ContactFormProps {
  title?: string
  subtitle?: string
  variant?: 'contact' | 'admission' | 'career'
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = 'Get in Touch',
  subtitle = "We'd love to hear from you and answer any questions about our care services.",
  variant = 'contact',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    urgency: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: 'Preview complete — message not sent',
        description:
          'This form is not connected to delivery yet. Please call or email us directly for a response.',
      })

      setFormData({
        name: '',
        email: '',
        phone: '',
        relationship: '',
        urgency: '',
        message: '',
      })
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or call us directly at (913) 271-4783.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card
      id={variant === 'contact' ? 'contact-form' : undefined}
      className="contact-form mx-auto w-full max-w-2xl"
    >
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
        <p className="text-base leading-6 text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <p className="mb-6 rounded-lg border border-border bg-soft-gray/50 p-3 text-sm leading-5 text-muted-foreground">
          This is a preview form and does not send messages yet. Please call or
          email us directly for a response.
        </p>

        <form onSubmit={handleSubmit} className="contact-form__fields space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label id="relationship-label" htmlFor="relationship">
                Relationship to Potential Resident
              </Label>
              <Select
                value={formData.relationship}
                onValueChange={(value) => handleChange('relationship', value)}
              >
                <SelectTrigger
                  id="relationship"
                  aria-labelledby="relationship-label"
                >
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult-child">Adult Child</SelectItem>
                  <SelectItem value="spouse">Spouse/Partner</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="other-family">
                    Other Family Member
                  </SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="professional">
                    Healthcare Professional
                  </SelectItem>
                  <SelectItem value="self">Myself</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {variant === 'admission' && (
            <div className="space-y-2">
              <Label id="urgency-label" htmlFor="urgency">
                Timeline for Care Needs
              </Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => handleChange('urgency', value)}
              >
                <SelectTrigger id="urgency" aria-labelledby="urgency-label">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">
                    Immediate (Within 1 week)
                  </SelectItem>
                  <SelectItem value="urgent">
                    Urgent (Within 1 month)
                  </SelectItem>
                  <SelectItem value="planning">
                    Planning (Within 3 months)
                  </SelectItem>
                  <SelectItem value="future">
                    Future Planning (3+ months)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">
              {variant === 'admission'
                ? 'Tell us about your care needs'
                : 'Message'}
              {variant === 'contact' && ' *'}
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder={
                variant === 'admission'
                  ? 'Please describe the level of care needed, any specific medical conditions, preferences, or questions you have...'
                  : 'How can we help you today?'
              }
              rows={4}
              required={variant === 'contact'}
            />
          </div>

          <Button
            type="submit"
            variant="warm"
            size="lg"
            className="contact-form__submit w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Preparing preview...
              </>
            ) : (
              'Preview Message'
            )}
          </Button>

          <p className="text-center text-sm leading-5 text-muted-foreground">
            We respect your privacy and will never share your information with
            third parties. You can also call us directly at{' '}
            <a
              href="tel:9132714783"
              className="text-warm-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              (913) 271-4783
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm
