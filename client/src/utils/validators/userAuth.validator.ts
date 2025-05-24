import * as Yup from "yup";

export const userRegisterSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name can't be longer than 30 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name can't be longer than 30 characters")
    .required("Last name is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),

  dob: Yup.date().required("Date of birth is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include at least one special character"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  preferences: Yup.array()
    .of(Yup.string().trim().min(1))
    .min(1, "Select at least one category"),
});

export const userLoginPhoneSchema = Yup.object({
  identifier: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include at least one special character"),
});

export const userLoginEmailSchema = Yup.object({
  identifier: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include at least one special character"),
});
