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
  
  
  export interface IProductsSlice {
    products: Product[];
    selectedProduct: Product | null;
  }
  