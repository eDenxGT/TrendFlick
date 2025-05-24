import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#ececec]">
      <img
        src="https://img.genial.ly/5f5c7058a383d5109fd374cc/0ad90034-38a8-4df0-8025-9ecf7aab2749.gif?genial&1668240403241"
        alt="Not Found"
        className="w-[100vw] h-[100vh] object-cover"
      />

      <Button
        onClick={() => navigate(-1)}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-[#00b37e] hover:bg-[#009e6b] text-white z-10"
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
