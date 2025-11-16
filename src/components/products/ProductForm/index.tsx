import { useState, type FormEvent } from "react";
import { z } from "zod";
import styles from "./productform.module.scss";

export interface Product {
  id: number;
  name: string;
  price: number;
  old_price: number;
  discount: string;
  rating: number;
  reviews: number;
  description?: string;
  image: string;
}

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
}

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be greater than 0"),
  old_price: z.number().positive("Old price must be greater than 0"),
  discount: z.string().min(1, "Discount is required"),
  rating: z.number().min(1).max(5),
  reviews: z.number().min(0),
  image: z.string().url("Image must be a valid URL"),
  description: z.string().optional(),
});

export default function ProductForm({
  initialData,
  onSubmit,
}: ProductFormProps) {
  const [form, setForm] = useState<Product>({
    id: initialData?.id || 0,
    name: initialData?.name || "",
    price: initialData?.price || 0,
    old_price: initialData?.old_price || 0,
    discount: initialData?.discount || "0%",
    rating: initialData?.rating || 5,
    reviews: initialData?.reviews || 0,
    description: initialData?.description || "",
    image: initialData?.image || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = ["price", "old_price", "rating", "reviews"];

    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = productSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["product-form"]}>
      <h2>{initialData ? "Edit Product" : "Add Product"}</h2>

      {/* Name */}
      <div className={styles["form-group"]}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      {/* Image URL */}
      <div className={styles["form-group"]}>
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        {errors.image && <span className={styles.error}>{errors.image}</span>}
      </div>

      {/* Price */}
      <div className={styles["form-group"]}>
        <label>Price ($)</label>
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          min={1}
        />
        {errors.price && <span className={styles.error}>{errors.price}</span>}
      </div>

      {/* Old Price */}
      <div className={styles["form-group"]}>
        <label>Old Price ($)</label>
        <input
          type="text"
          name="old_price"
          value={form.old_price}
          onChange={handleChange}
          min={1}
        />
        {errors.old_price && (
          <span className={styles.error}>{errors.old_price}</span>
        )}
      </div>

      {/* Discount */}
      <div className={styles["form-group"]}>
        <label>Discount (%)</label>
        <input
          type="text"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="10%"
        />
        {errors.discount && (
          <span className={styles.error}>{errors.discount}</span>
        )}
      </div>

      {/* Rating */}
      <div className={styles["form-group"]}>
        <label>Rating (1–5)</label>
        <input
          type="text"
          name="rating"
          min={1}
          max={5}
          value={form.rating}
          onChange={handleChange}
        />
        {errors.rating && <span className={styles.error}>{errors.rating}</span>}
      </div>

      {/* Reviews */}
      <div className={styles["form-group"]}>
        <label>Total Reviews</label>
        <input
          type="text"
          name="reviews"
          min={0}
          value={form.reviews}
          onChange={handleChange}
        />
        {errors.reviews && (
          <span className={styles.error}>{errors.reviews}</span>
        )}
      </div>

      {/* Description */}
      <div className={styles["form-group"]}>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter product description"
        />
        {errors.description && (
          <span className={styles.error}>{errors.description}</span>
        )}
      </div>

      <button type="submit" className={styles["btn-submit"]}>
        {initialData ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
