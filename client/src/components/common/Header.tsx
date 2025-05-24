import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Settings, Menu, FileText, LogOut } from "lucide-react";
import { logoutUser } from "@/services/authService";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-b border-[#164e63]/30 bg-[#0f1729]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <h1
            onClick={() => navigate("/feed")}
            className="text-lg cursor-pointer sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] bg-clip-text text-transparent flex-shrink-0"
          >
            CyberArticles
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#155e75] bg-[#155e75]/50 hover:bg-[#155e75]/20 text-sm px-4 py-2"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#1e293b] border-[#164e63]/30 text-white z-[100]"
                align="end"
              >
                <DropdownMenuItem
                  onClick={() => navigate("/my-articles")}
                  className="hover:bg-[#334155] cursor-pointer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  My Articles
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/settings")}
                  className="hover:bg-[#334155] cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 text-gray-500 hover:text-white w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#155e75] bg-[#155e75]/50 hover:bg-[#155e75]/20 text-xs px-3 py-1.5"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#1e293b] border-[#164e63]/30 text-white z-[100]"
                align="end"
              >
                <DropdownMenuItem
                  onClick={() => navigate("/my-articles")}
                  className="hover:bg-[#334155] cursor-pointer"
                >
                  <Home className="mr-2 h-4 w-4" />
                  My Feed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/settings")}
                  className="hover:bg-[#334155] cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 text-gray-500 hover:text-white w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
