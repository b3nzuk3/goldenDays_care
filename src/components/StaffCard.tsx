import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StaffCardProps {
  name: string;
  title: string;
  credentials: string[];
  experience: string;
  photo: string;
  bio: string;
}

const StaffCard: React.FC<StaffCardProps> = ({
  name,
  title,
  credentials,
  experience,
  photo,
  bio,
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-border overflow-hidden">
      <div className="aspect-square bg-soft-gray">
        <img
          src={photo}
          alt={`${name}, ${title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{name}</h3>
            <p className="text-warm-accent font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{experience}</p>
          </div>
          
          {credentials.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Credentials</h4>
              <div className="flex flex-wrap gap-1">
                {credentials.map((credential, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {credential}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffCard;