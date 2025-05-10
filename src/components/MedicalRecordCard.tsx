
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MedicalRecord } from "@/types";
import { formatDate } from "@/lib/utils";
import { FileText } from "lucide-react";

interface MedicalRecordCardProps {
  record: MedicalRecord;
  onView?: (record: MedicalRecord) => void;
}

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({ record, onView }) => {
  const { title, type, date, providerName, description } = record;

  const getBadgeVariant = () => {
    switch (type) {
      case 'examination':
        return 'default';
      case 'test':
        return 'secondary';
      case 'procedure':
        return 'destructive';
      case 'note':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={getBadgeVariant()}>{type}</Badge>
        </div>
        <CardDescription>
          {formatDate(date)} - {providerName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {record.attachments?.length ? `${record.attachments.length} attachments` : 'No attachments'}
        </div>
        <Button variant="outline" size="sm" onClick={() => onView?.(record)}>
          <FileText className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicalRecordCard;
