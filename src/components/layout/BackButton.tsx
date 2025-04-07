
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button on homepage
  if (location.pathname === '/') {
    return null;
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={goBack}
      className="flex items-center gap-1 mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
};

export default BackButton;
