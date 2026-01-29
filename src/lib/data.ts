import { Product, Category, CarBrand } from './types';

// Demo Categories
export const categories: Category[] = [
    { id: 'engine', name: 'เครื่องยนต์', icon: '⚙️', count: 24 },
    { id: 'electrical', name: 'ระบบไฟฟ้า', icon: '⚡', count: 18 },
    { id: 'suspension', name: 'ช่วงล่าง', icon: '🔧', count: 15 },
    { id: 'brake', name: 'ระบบเบรค', icon: '🛑', count: 12 },
    { id: 'body', name: 'ตัวถังและกระจก', icon: '🚗', count: 20 },
    { id: 'interior', name: 'ภายในห้องโดยสาร', icon: '💺', count: 16 },
    { id: 'cooling', name: 'ระบบระบายความร้อน', icon: '❄️', count: 10 },
    { id: 'transmission', name: 'ระบบส่งกำลัง', icon: '🔩', count: 8 },
];

// Demo Car Brands
export const carBrands: CarBrand[] = [
    {
        id: 'toyota',
        name: 'Toyota',
        models: [
            { id: 'camry', name: 'Camry', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'corolla', name: 'Corolla Altis', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'yaris', name: 'Yaris', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'hilux', name: 'Hilux Revo', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'fortuner', name: 'Fortuner', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
        ],
    },
    {
        id: 'honda',
        name: 'Honda',
        models: [
            { id: 'civic', name: 'Civic', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'accord', name: 'Accord', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'city', name: 'City', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'crv', name: 'CR-V', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'hrv', name: 'HR-V', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
        ],
    },
    {
        id: 'mazda',
        name: 'Mazda',
        models: [
            { id: 'mazda2', name: 'Mazda 2', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'mazda3', name: 'Mazda 3', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'cx3', name: 'CX-3', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'cx5', name: 'CX-5', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
        ],
    },
    {
        id: 'isuzu',
        name: 'Isuzu',
        models: [
            { id: 'dmax', name: 'D-Max', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'mux', name: 'MU-X', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
        ],
    },
    {
        id: 'ford',
        name: 'Ford',
        models: [
            { id: 'ranger', name: 'Ranger', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'everest', name: 'Everest', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
        ],
    },
    {
        id: 'nissan',
        name: 'Nissan',
        models: [
            { id: 'almera', name: 'Almera', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'navara', name: 'Navara', years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
            { id: 'kicks', name: 'Kicks', years: ['2020', '2021', '2022', '2023', '2024'] },
        ],
    },
];

// Demo Products
export const products: Product[] = [
    {
        id: 'prod-001',
        name: 'กรองอากาศ Toyota Camry',
        description: 'กรองอากาศแท้ OEM สำหรับ Toyota Camry รุ่นปี 2018-2024 กรองอากาศได้อย่างมีประสิทธิภาพ ช่วยให้เครื่องยนต์ทำงานดีขึ้น',
        price: 450,
        carBrand: 'Toyota',
        carModel: 'Camry',
        carYear: '2018-2024',
        category: 'engine',
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        images: [],
        stock: 25,
        isActive: true,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15',
    },
    {
        id: 'prod-002',
        name: 'ผ้าเบรคหน้า Honda Civic',
        description: 'ผ้าเบรคหน้าคุณภาพสูง สำหรับ Honda Civic ทุกรุ่น ให้แรงเบรคที่ดีเยี่ยม ปลอดภัยทุกการขับขี่',
        price: 1200,
        carBrand: 'Honda',
        carModel: 'Civic',
        carYear: '2018-2024',
        category: 'brake',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        images: [],
        stock: 18,
        isActive: true,
        createdAt: '2024-01-14',
        updatedAt: '2024-01-14',
    },
    {
        id: 'prod-003',
        name: 'หม้อน้ำ Mazda 3',
        description: 'หม้อน้ำอลูมิเนียมคุณภาพสูง สำหรับ Mazda 3 ระบายความร้อนได้ดีเยี่ยม ทนทานต่อการใช้งาน',
        price: 3500,
        carBrand: 'Mazda',
        carModel: 'Mazda 3',
        carYear: '2019-2024',
        category: 'cooling',
        imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
        images: [],
        stock: 8,
        isActive: true,
        createdAt: '2024-01-13',
        updatedAt: '2024-01-13',
    },
    {
        id: 'prod-004',
        name: 'โช้คอัพหน้า Toyota Fortuner',
        description: 'โช้คอัพหน้าแท้ OEM สำหรับ Toyota Fortuner รับแรงกระแทกได้ดี นุ่มนวลทุกเส้นทาง',
        price: 4800,
        carBrand: 'Toyota',
        carModel: 'Fortuner',
        carYear: '2018-2024',
        category: 'suspension',
        imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
        images: [],
        stock: 12,
        isActive: true,
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12',
    },
    {
        id: 'prod-005',
        name: 'ไดชาร์จ Honda Accord',
        description: 'ไดชาร์จแท้ OEM พร้อมรับประกัน 1 ปี สำหรับ Honda Accord ให้พลังงานไฟฟ้าเต็มประสิทธิภาพ',
        price: 5500,
        carBrand: 'Honda',
        carModel: 'Accord',
        carYear: '2018-2024',
        category: 'electrical',
        imageUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=300&fit=crop',
        images: [],
        stock: 6,
        isActive: true,
        createdAt: '2024-01-11',
        updatedAt: '2024-01-11',
    },
    {
        id: 'prod-006',
        name: 'กระจกมองข้าง Isuzu D-Max',
        description: 'กระจกมองข้างพร้อมไฟเลี้ยว สำหรับ Isuzu D-Max มองเห็นได้ชัดเจน ปลอดภัยทุกการขับขี่',
        price: 2200,
        carBrand: 'Isuzu',
        carModel: 'D-Max',
        carYear: '2020-2024',
        category: 'body',
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
        images: [],
        stock: 14,
        isActive: true,
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10',
    },
    {
        id: 'prod-007',
        name: 'คลัทช์ชุด Ford Ranger',
        description: 'ชุดคลัทช์คุณภาพสูง สำหรับ Ford Ranger รับแรงบิดสูง ทนทานต่อการใช้งานหนัก',
        price: 6800,
        carBrand: 'Ford',
        carModel: 'Ranger',
        carYear: '2018-2024',
        category: 'transmission',
        imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop',
        images: [],
        stock: 5,
        isActive: true,
        createdAt: '2024-01-09',
        updatedAt: '2024-01-09',
    },
    {
        id: 'prod-008',
        name: 'พรมปูพื้น Nissan Kicks',
        description: 'พรมปูพื้นรถยนต์ 3D ตัดเฉพาะรุ่น สำหรับ Nissan Kicks กันน้ำ กันฝุ่น ทำความสะอาดง่าย',
        price: 1800,
        carBrand: 'Nissan',
        carModel: 'Kicks',
        carYear: '2020-2024',
        category: 'interior',
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
        images: [],
        stock: 20,
        isActive: true,
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08',
    },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
    return products.filter(p => p.category === categoryId);
}

export function getProductsByBrand(brand: string): Product[] {
    return products.filter(p => p.carBrand.toLowerCase() === brand.toLowerCase());
}

export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.carBrand.toLowerCase().includes(lowerQuery) ||
        p.carModel.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
}

export function getCategoryById(id: string): Category | undefined {
    return categories.find(c => c.id === id);
}

export function getBrandById(id: string): CarBrand | undefined {
    return carBrands.find(b => b.id === id);
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 0,
    }).format(price);
}
