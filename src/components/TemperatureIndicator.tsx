
import React from 'react';
import { cn } from "@/lib/utils";

interface TemperatureIndicatorProps {
  temperature: number;
  className?: string;
}

const TemperatureIndicator: React.FC<TemperatureIndicatorProps> = ({ 
  temperature, 
  className 
}) => {
  const getTemperatureClass = () => {
    if (temperature >= 25) {
      return 'temp-warm';
    } else if (temperature <= 18) {
      return 'temp-cool';
    } else {
      return 'temp-moderate';
    }
  };

  return (
    <span className={cn('temp-indicator', getTemperatureClass(), className)}>
      {temperature}°
    </span>
  );
};

export default TemperatureIndicator;
