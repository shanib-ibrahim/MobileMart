import React from "react";
import styles from "./productcard.module.scss";
import type { Product } from "../../../types/product.type";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id?: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.card}>
      {/* Product ID */}
      <span className={styles.productId}>id: {product.id}</span>

      {/* Product Image */}
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} />
      </div>

      {/* Product Info */}
      <h3 className={styles.title}>{product.name}</h3>

      {/* Rating */}
      <div className={styles.rating}>
        {"★".repeat(product.rating)}
        {"☆".repeat(5 - product.rating)}
        <span className={styles.reviewCount}>({product.reviews})</span>
      </div>

      {/* Price Section */}
      <div className={styles.priceSection}>
        <span className={styles.oldPrice}>${product.old_price}</span>
        <span className={styles.discount}>{product.discount}</span>
      </div>

      <div className={styles.finalPrice}>${product.price}</div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button onClick={() => onEdit(product)} className={styles.editBtn}>
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
