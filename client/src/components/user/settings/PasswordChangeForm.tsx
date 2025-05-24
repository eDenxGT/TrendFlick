import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordChangeValidationSchema } from "@/utils/validators/userProfile.validator";
import { updatePassword } from "@/services/userService";
import { useToaster } from "@/hooks/ui/useToaster";

const PasswordChangeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { successToast, errorToast } = useToaster();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordChangeValidationSchema,
    onSubmit: async (values) => {
      handleUpdatePassword(values);
    },
  });

  const handleUpdatePassword = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsSubmitting(true);
      const response = await updatePassword(
        values.currentPassword,
        values.newPassword
      );
      if (response.success) {
        successToast(response.message);
        formik.resetForm();
      }
    } catch (error: any) {
      errorToast(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="currentPassword" className="text-[#94a3b8]">
          Current Password
        </Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] text-white"
        />
        {formik.touched.currentPassword && formik.errors.currentPassword && (
          <p className="text-red-400 text-sm">
            {formik.errors.currentPassword}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-[#94a3b8]">
          New Password
        </Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] text-white"
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <p className="text-red-400 text-sm">{formik.errors.newPassword}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-[#94a3b8]">
          Confirm New Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] text-white"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-400 text-sm">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="bg-[#0891b2] hover:bg-[#06b6d4] text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          disabled={!formik.isValid || !formik.dirty || isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </div>

      <div className="text-sm text-[#94a3b8] space-y-1">
        <p>Password requirements:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>At least 8 characters long</li>
          <li>Contains at least one letter</li>
          <li>Contains at least one number</li>
        </ul>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
