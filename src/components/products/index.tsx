// Products.tsx
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
import GlobalModal from "../common/modal/GlobalModal";

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

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | undefined>(
    undefined
  );

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const confirmDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (productToDelete?.id) {
      await deleteProduct(productToDelete.id);
      setDeleteModalOpen(false);
      setProductToDelete(undefined);
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
          data-testid="search-input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          data-testid="btn-add-product"
          className={styles["btn-add"]}
          onClick={handleAdd}
        >
          Add Product
        </button>
      </div>

      {isLoading ? (
        <Loader size={50} />
      ) : (
        <div className={styles["products-grid"]}>
          {isLoading ? (
            <Loader size={50} />
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className={styles["products-grid"]}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={() => confirmDelete(product)}
                />
              ))}
            </div>
          ) : (
            <div className={styles["no-products"]}>No products available.</div>
          )}
        </div>
      )}

      {modalOpen && (
        <GlobalModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <ProductForm
            initialData={selectedProduct}
            onSubmit={handleSubmit}
            data-testid="product-form"
          />
        </GlobalModal>
      )}

      {deleteModalOpen && (
        <GlobalModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <div className={styles["modal-content"]} data-testid="delete-modal">
            <h3>Are you sure you want to delete this product?</h3>
            <p>
              <strong>{productToDelete?.name}</strong>
            </p>
            <div className={styles["modal-actions"]}>
              <button
                data-testid="btn-delete-confirm"
                className={styles["btn-delete"]}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                data-testid="btn-delete-cancel"
                className={styles["btn-cancel"]}
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </GlobalModal>
      )}
    </div>
  );
};

export default Products;
