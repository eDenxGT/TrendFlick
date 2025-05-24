import type React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BasicDatePicker from "@/components/common/DatePicker";
import type { Category } from "@/types/Category";

interface RegisterFormProps {
  formik: any;
  categories: Category[];
  handleCategoryChange: (categoryId: string, checked: boolean) => void;
  handleDateChange: (newDate: Date | null) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formik,
  categories,
  handleCategoryChange,
  handleDateChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-[#164e63]/30 backdrop-blur-sm bg-[#0f1729]/80 shadow-lg">
        <CardHeader className="border-b border-[#164e63]/30">
          <CardTitle className="text-white text-2xl">
            Create your account
          </CardTitle>
          <CardDescription className="text-[#94a3b8]">
            Enter your details to get started with personalized articles
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 pb-2">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#94a3b8]">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#94a3b8]">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#94a3b8]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#94a3b8]">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-[#94a3b8]">
                  Date of Birth
                </Label>

                <BasicDatePicker onChange={handleDateChange} value={formik.values.dob}/>

                {formik.touched.dob && formik.errors.dob && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.dob}
                  </p>
                )}
              </div>
            </div>

            {/* Password & Preferences */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#94a3b8]">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#94a3b8]">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <div className="space-y-3">
                <Label className="text-[#94a3b8]">Article Preferences</Label>
                <div className="grid grid-cols-2 gap-2 max-h-[126px] border border-[#164e63]/30 rounded-md p-2 overflow-y-auto pr-2 custom-scrollbar">
                  {categories?.length > 0 ? (
                    categories?.map((category) => (
                      <div
                        key={category.categoryId}
                        className="flex items-center space-x-2 hover:bg-[#1e293b]/50 p-1.5 rounded-md transition-colors cursor-pointer"
                      >
                        <Checkbox
                          id={category.categoryId}
                          onCheckedChange={(checked) => {
                            handleCategoryChange(
                              category.categoryId,
                              checked as boolean
                            );
                          }}
                          checked={formik.values.preferences.includes(
                            category.categoryId
                          )}
                          className="border-[#0891b2] data-[state=checked]:bg-[#06b6d4] data-[state=checked]:text-[#082f49]"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Label
                          htmlFor={category.categoryId}
                          className="text-sm cursor-pointer text-[#94a3b8]"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#94a3b8]">
                      No categories found
                    </p>
                  )}
                </div>
                {formik.touched.preferences && formik.errors.preferences && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.preferences}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-sm text-[#94a3b8] order-2 sm:order-1">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#06b6d4] hover:text-[#67e8f9] hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
          <Button
            type="submit"
            className="w-full sm:w-auto order-1 sm:order-2 bg-[#0891b2] hover:bg-[#06b6d4] text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          >
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default RegisterForm;
