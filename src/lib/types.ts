// Product types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    carBrand: string;
    carModel: string;
    carYear: string;
    category: string;
    imageUrl: string;
    images: string[]; // Multiple images
    stock: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Category types
export interface Category {
    id: string;
    name: string;
    icon: string;
    count?: number;
}

// Car brand types
export interface CarBrand {
    id: string;
    name: string;
    logo?: string;
    models: CarModel[];
}

export interface CarModel {
    id: string;
    name: string;
    years: string[];
}

// Filter types
export interface ProductFilter {
    search?: string;
    category?: string;
    brand?: string;
    model?: string;
    year?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest';
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
