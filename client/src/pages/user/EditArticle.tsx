import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, X, ImageIcon, Loader2 } from "lucide-react";
import type { Article } from "@/types/Article";
import { getCategories } from "@/services/authService";
import type { Category } from "@/types/Category";
import { getArticleById, updateArticle } from "@/services/userService";
import { useToaster } from "@/hooks/ui/useToaster";
import { uploadImageToCloudinary } from "@/services/cloudinaryService";
import { createArticleSchema } from "@/utils/validators/category.validator";

const EditArticle = () => {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const { successToast, errorToast } = useToaster();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      categoryId: "",
    },
    validationSchema: createArticleSchema,
    onSubmit: async (values) => {
      handleUpdateArticle(values);
    },
  });

  const handleUpdateArticle = async (values: Partial<Article>) => {
    try {
      setLoading(true);
      if (!articleId) {
        navigate("/my-articles");
        errorToast("Article not found");
        return;
      }
      if (!values.image && !imageFile) {
        errorToast("Please select an image");
        return;
      }

      let imageUrl = values.image;

      if (imageFile) {
        const url = await uploadImageToCloudinary(imageFile);
        if (url) imageUrl = url;
      }
      const articleData = {
        ...values,
        image: imageUrl,
      };
      const response = await updateArticle(articleId, articleData);
      if (response.success) {
        successToast(response.message);
        navigate("/my-articles");
      }
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    const loadArticle = async () => {
      if (!articleId) {
        navigate("/my-articles");
        return;
      }

      try {
        const articleData = await getArticleById(articleId);
        if (!articleData) {
          navigate("/my-articles");
          errorToast("Article not found");
          return;
        }

        setImagePreview(articleData.data.article.image);
        formik.setValues({
          title: articleData.data.article.title,
          description: articleData.data.article.description,
          image: articleData.data.article.image,
          categoryId: articleData.data.article.categoryId,
        });
      } catch (error) {
        console.error("Error loading article:", error);
        navigate("/my-articles");
        errorToast("Error loading article");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId, navigate]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      formik.setFieldValue("categoryId", categoryId);
    } else {
      formik.setFieldValue("categoryId", "");
    }
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        errorToast("File too large. Please select an image smaller than 5MB.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        errorToast("Invalid file type. Please select an image file.");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        formik.setFieldValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    formik.setFieldValue("image", "");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#121826] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#06b6d4] mx-auto mb-4" />
          <p className="text-[#94a3b8]">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#121826] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-[#94a3b8] hover:text-[#ecfeff] hover:bg-[#155e75]/20 mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] bg-clip-text text-transparent">
            Edit Article
          </h1>
          <p className="text-[#94a3b8] mt-2">
            Update your article content and settings
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <Card className="border-[#164e63]/30 backdrop-blur-sm bg-[#0f1729]/80 shadow-lg">
            <CardHeader className="border-b border-[#164e63]/30">
              <CardTitle className="text-white text-xl">
                Article Details
              </CardTitle>
              <CardDescription className="text-[#94a3b8]">
                Update the information below to modify your article
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#94a3b8]">
                  Article Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter an engaging title for your article"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] ${
                    formik.touched.title && formik.errors.title
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#94a3b8]">
                  Article Content *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write your article content here..."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={8}
                  className={`bg-[#1e293b]/50 border-[#164e63]/30 focus:border-[#06b6d4] resize-none ${
                    formik.touched.description && formik.errors.description
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <div className="flex justify-between items-center">
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-xs text-red-500">
                      {formik.errors.description}
                    </p>
                  )}
                  <p className="text-xs text-[#64748b] ml-auto">
                    {formik.values.description.length}/2000 characters
                  </p>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-[#94a3b8]">Article Image</Label>
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-[#164e63]/30 rounded-lg p-8 text-center hover:border-[#06b6d4]/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <ImageIcon
                        size={48}
                        className="mx-auto text-[#64748b] mb-4"
                      />
                      <p className="text-[#94a3b8] mb-2">
                        Click to upload an image
                      </p>
                      <p className="text-xs text-[#64748b]">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full object-cover rounded-lg border border-[#164e63]/30"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-[#0f1729]/80 hover:bg-[#1e293b] text-white"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <Label className="text-[#94a3b8]">Article Category *</Label>
                <div className="grid grid-cols-2 gap-2 max-h-[126px] border border-[#164e63]/30 rounded-md p-2 overflow-y-auto pr-2 custom-scrollbar">
                  {categories && categories?.length > 0 ? (
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
                          checked={
                            formik.values.categoryId === category.categoryId
                          }
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
                {formik.touched.categoryId && formik.errors.categoryId && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.categoryId}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto order-2 sm:order-1 bg-[#1e293b]/50 border-[#164e63]/30 text-[#ecfeff] hover:bg-[#334155]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto order-1 sm:order-2 bg-[#0891b2] hover:bg-[#06b6d4] text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              >
                {loading ? "Updating..." : "Update Article"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
