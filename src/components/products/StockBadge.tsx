interface StockBadgeProps {
    stock: number
    size?: 'sm' | 'md'
}

export default function StockBadge({ stock, size = 'sm' }: StockBadgeProps) {
    const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

    if (stock === 0) {
        return (
            <span className={`${sizeClasses} rounded-full bg-red-100 text-red-600 font-medium`}>
                สินค้าหมด
            </span>
        )
    }

    if (stock <= 3) {
        return (
            <span className={`${sizeClasses} rounded-full bg-orange-100 text-orange-600 font-medium`}>
                เหลือ {stock} ชิ้น
            </span>
        )
    }

    if (stock <= 10) {
        return (
            <span className={`${sizeClasses} rounded-full bg-yellow-100 text-yellow-700 font-medium`}>
                มีสินค้า
            </span>
        )
    }

    return (
        <span className={`${sizeClasses} rounded-full bg-green-100 text-green-600 font-medium`}>
            มีสินค้า
        </span>
    )
}
