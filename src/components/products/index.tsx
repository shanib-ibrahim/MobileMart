import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../services/productApi";
import type { Product } from "../../types/product.type";
import styles from "./products.module.scss";
import Loader from "../common/loader/GlobalLoader";

const Products: React.FC = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id?: number) => {
    if (id && window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  const handleAdd = () => {
    setSelectedProduct(undefined);
    setModalOpen(true);
  };

  const handleSubmit = async (product: Product) => {
    if (selectedProduct) {
      await updateProduct(product);
    } else {
      await addProduct(product);
    }
    setModalOpen(false);
  };

  return (
    <div className={styles["products-container"]}>
      <div className={styles["top-bar"]}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles["btn-add"]} onClick={handleAdd}>
          Add Product
        </button>
      </div>

      {isLoading ? (
        <Loader size={50} />
      ) : (
        <div className={styles["products-grid"]}>
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-content"]}>
            <ProductForm
              initialData={selectedProduct}
              onSubmit={handleSubmit}
            />
            <button
              className={styles["btn-close"]}
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
