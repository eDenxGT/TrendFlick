import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { User } from "@/types/User";
import { useEffect, useState } from "react";
import type { Category } from "@/types/Category";
import { getCategories } from "@/services/authService";
import { Loader2 } from "lucide-react";
import { userPreferencesSchema } from "@/utils/validators/userProfile.validator";

interface PreferencesFormProps {
  user: User;
  onUpdate: (updatedUser: Partial<User>) => void;
}

const PreferencesForm = ({ user, onUpdate }: PreferencesFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      preferences: user.preferences,
    },
    validationSchema: userPreferencesSchema,
    onSubmit: (values) => {
      onUpdate({ preferences: values.preferences });
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categories = await getCategories();
        setCategories(categories.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentPreferences = formik.values.preferences;
    let newPreferences;

    if (checked) {
      newPreferences = [...currentPreferences, categoryId];
    } else {
      newPreferences = currentPreferences.filter((id) => id !== categoryId);
    }

    formik.setFieldValue("preferences", newPreferences);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 text-[#06b6d4] animate-spin" />
        </div>
      ) : (
        <>
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
                <p className="text-sm text-[#94a3b8]">No categories found</p>
              )}
            </div>
            {formik.touched.preferences && formik.errors.preferences && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.preferences}
              </p>
            )}
          </div>

          <div className="pt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#94a3b8]">
                Selected: {formik.values.preferences?.length} categories
              </p>
              <Button
                type="submit"
                className="bg-[#0891b2] hover:bg-[#06b6d4] text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                disabled={!formik.isValid || !formik.dirty}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default PreferencesForm;
