import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import RegisterForm from "@/components/auth/RegisterForm";
import { userRegisterSchema } from "@/utils/validators/userAuth.validator";
import { getCategories, registerUser } from "@/services/authService";
import type { Category } from "@/types/Category";
import { useToaster } from "@/hooks/ui/useToaster";

const Register = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);

  const { successToast, errorToast } = useToaster();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      preferences: [] as string[],
      dob: date,
    },
    validationSchema: userRegisterSchema,
    onSubmit: async (values) => {
      handleRegister(values);
    },
  });

  const handleRegister = async (values: any) => {
    try {
      const response = await registerUser(values);

      if (response.success) {
        successToast(response.message);
        formik.resetForm();
        navigate("/login");
      }
    } catch (error: any) {
      errorToast(error?.response?.data?.message || "Something went wrong");
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentCategories = [...formik.values.preferences];

    if (checked) {
      formik.setFieldValue("preferences", [...currentCategories, categoryId]);
    } else {
      formik.setFieldValue(
        "preferences",
        currentCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate);
      formik.setFieldValue("dob", newDate);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-5 bg-gradient-to-b from-[#0f172a] to-[#2b2a2a]">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] bg-clip-text text-transparent mb-2">
            TrendFlick
          </h1>
          <p className="text-[#94a3b8]">
            Join the cutting-edge article platform
          </p>
        </div>

        <RegisterForm
          formik={formik}
          categories={categories}
          handleCategoryChange={handleCategoryChange}
          handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
        />

        <div className="mt-10 text-center text-xs text-[#94a3b8]">
          <p>
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;