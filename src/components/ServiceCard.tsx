import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  ctaText?: string;
  onLearnMore?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  ctaText = "Learn More",
  onLearnMore,
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-border">
      <CardHeader className="pb-4">
        <div className="w-12 h-12 bg-soft-gray rounded-lg flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-warm-accent" />
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-warm-accent rounded-full mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          variant="caring" 
          className="w-full"
          onClick={onLearnMore}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;