
import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Moon,
  Star
} from 'lucide-react';

interface WeatherIconProps {
  icon: string;
  className?: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, className = "", size = 16 }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'sun':
        return <Sun className={className} size={size} />;
      case 'cloud':
        return <Cloud className={className} size={size} />;
      case 'rain':
        return <CloudRain className={className} size={size} />;
      case 'snow':
        return <CloudSnow className={className} size={size} />;
      case 'thunder':
        return <CloudLightning className={className} size={size} />;
      case 'moon':
        return <Moon className={className} size={size} />;
      case 'star':
        return <Star className={className} size={size} />;
      default:
        return <Sun className={className} size={size} />;
    }
  };

  return renderIcon();
};

export default WeatherIcon;
