import { model, Schema } from "mongoose";
import { ICategory } from "../types/category";

const categorySchema = new Schema<ICategory>(
  {
    categoryId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

export const CategoryModel = model<ICategory>("Category", categorySchema);
