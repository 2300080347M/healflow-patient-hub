
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

interface AppointmentCardProps {
  appointment: Appointment;
  isProvider?: boolean;
  onCancel?: (appointment: Appointment) => void;
  onReschedule?: (appointment: Appointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  isProvider = false,
  onCancel,
  onReschedule
}) => {
  const { providerName, patientName, date, time, duration, type, status, reason } = appointment;

  const getStatusBadge = () => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'no-show':
        return <Badge variant="outline" className="text-red-500 border-red-300">No Show</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const displayName = isProvider ? patientName : providerName;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{type} Appointment</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>
          With {displayName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-health-600" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-health-600" />
            <span>{formatTime(time)} ({duration} minutes)</span>
          </div>
          <div className="mt-2">
            <span className="font-medium">Reason: </span> 
            <span className="text-sm">{reason}</span>
          </div>
        </div>
      </CardContent>
      {status === 'scheduled' && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => onReschedule?.(appointment)}>
            Reschedule
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onCancel?.(appointment)}>
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AppointmentCard;
