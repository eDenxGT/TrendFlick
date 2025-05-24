import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import {
  userLoginEmailSchema,
  userLoginPhoneSchema,
} from "@/utils/validators/userAuth.validator";
import { useToaster } from "@/hooks/ui/useToaster";
import { loginUser } from "@/services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToaster();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleLoginMethod = () => {
    setLoginMethod((prev) => (prev === "email" ? "phone" : "email"));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema:
      loginMethod === "email" ? userLoginEmailSchema : userLoginPhoneSchema,
    onSubmit: (values: { identifier: string; password: string }) => {
      handleLogin({ ...values, loginMethod });
    },
  });

  const handleLogin = async (values: {
    identifier: string;
    password: string;
    loginMethod: "email" | "phone";
  }) => {
    try {
      setLoading(true);
      const response = await loginUser(values);

      if (response.success) {
        successToast(response.message);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        formik.resetForm();
        navigate("/feed");
      }
    } catch (error: any) {
      errorToast(error?.response?.data?.message || "Something went wrong");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-10 bg-gradient-to-b from-[#0f172a] to-[#2b2a2a]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] bg-clip-text text-transparent mb-2">
            TrendFlick
          </h1>
          <p className="text-[#94a3b8]">
            Access your personalized article feed
          </p>
        </div>

        <Card className="border-[#164e63]/30 backdrop-blur-sm bg-[#0f1729]/80 shadow-lg">
          <CardHeader className="border-b border-[#164e63]/30">
            <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
            <CardDescription className="text-[#94a3b8]">
              Log in to continue to your personalized article feed
            </CardDescription>
          </CardHeader>

          <form onSubmit={formik.handleSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="identifier" className="text-[#94a3b8]">
                      {loginMethod === "email" ? "Email" : "Phone Number"}
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs text-[#06b6d4] hover:text-[#38bdf8] hover:bg-gray-800"
                      onClick={toggleLoginMethod}
                    >
                      Use {loginMethod === "email" ? "phone" : "email"} instead
                    </Button>
                  </div>

                  <Input
                    id="identifier"
                    name="identifier"
                    placeholder={
                      loginMethod === "email"
                        ? "Enter your email"
                        : "Enter your number"
                    }
                    value={formik.values.identifier}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4]"
                  />
                  {formik.touched.identifier && formik.errors.identifier && (
                    <div className="text-sm text-[#f43f5e] mt-1">
                      {formik.errors.identifier}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#94a3b8]">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8] hover:text-[#e2e8f0] transition-colors"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-sm text-[#f43f5e] mt-1">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <Link
                    to="#"
                    className="text-sm text-[#22d3ee] hover:text-[#67e8f9] hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-[#0891b2] hover:bg-[#06b6d4] text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>

              <p className="text-center text-sm text-[#94a3b8]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#22d3ee] hover:text-[#67e8f9] hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center text-xs text-[#94a3b8]">
          <p>© 2025 CyberArticles. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
