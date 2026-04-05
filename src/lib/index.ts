// Re-export all types
export * from './types';

// Re-export data helpers
export {
    categories,
    carBrands,
    products,
    getProductById as getProductByIdLocal,
    getProductsByCategory,
    getProductsByBrand,
    searchProducts,
    getCategoryById,
    getBrandById,
    formatPrice
} from './data';

// Re-export database functions
export {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from './db';

// Re-export auth
export { isAuthenticated } from './auth';

// Re-export constants
export * from './constants';
