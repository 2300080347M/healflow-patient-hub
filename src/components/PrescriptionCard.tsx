
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prescription } from "@/types";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

interface PrescriptionCardProps {
  prescription: Prescription;
  onRenew?: (prescription: Prescription) => void;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription, onRenew }) => {
  const { medication, dosage, frequency, startDate, endDate, status, providerName, instructions } = prescription;

  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const isExpiring = () => {
    const today = new Date();
    const end = new Date(endDate);
    const daysLeft = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7 && daysLeft > 0 && status === 'active';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{medication}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>
          {dosage} - {frequency}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <p className="text-sm">
            <span className="font-medium">Prescribed by:</span> {providerName}
          </p>
          <p className="text-sm">
            <span className="font-medium">Valid:</span> {formatDate(startDate)} - {formatDate(endDate)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Instructions:</span> {instructions}
          </p>
          <p className="text-sm">
            <span className="font-medium">Refills remaining:</span> {prescription.refills}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isExpiring() && (
          <div className="flex items-center text-amber-600 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Expiring soon
          </div>
        )}
        {status === 'active' && (
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto"
            onClick={() => onRenew?.(prescription)}
          >
            Request Renewal
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PrescriptionCard;
