import { useFormik } from "formik";
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
import BasicDatePicker from "@/components/common/DatePicker";
import type { User } from "@/types/User";
import { userProfileInfoSchema } from "@/utils/validators/userProfile.validator";

interface PersonalInfoFormProps {
  user: User;
  onUpdate: (updatedUser: Partial<User>) => void;
}

const PersonalInfoForm = ({ user, onUpdate }: PersonalInfoFormProps) => {
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dob: user.dob ? new Date(user.dob) : undefined,
    },
    enableReinitialize: true,
    validationSchema: userProfileInfoSchema,
    onSubmit: (values) => {
      onUpdate(values);
    },
  });

  const handleDateChange = (newDate: Date | null) => {
    formik.setFieldValue("dob", newDate);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-[#164e63]/30 backdrop-blur-sm bg-[#0f1729]/80 shadow-lg">
        <CardHeader className="border-b border-[#164e63]/30">
          <CardTitle className="text-white text-2xl">
            Personal Information
          </CardTitle>
          <CardDescription className="text-[#94a3b8]">
            Update your personal details and account information
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 pb-2">
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
              <BasicDatePicker 
                onChange={handleDateChange}
                value={formik.values.dob}
              />
              {formik.touched.dob && formik.errors.dob && (
                <p className="text-xs text-red-500 mt-1">
                  {/* {formik.errors.dob} */}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-6">
          <Button
            type="submit"
            className="bg-[#0891b2] hover:bg-[#06b6d4] text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            disabled={!formik.isValid || !formik.dirty}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PersonalInfoForm;