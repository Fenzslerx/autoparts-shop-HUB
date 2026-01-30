'use client'

import { useRouter } from 'next/navigation'

export default function DeleteProductButton({ productId }: { productId: string }) {
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('ต้องการลบสินค้านี้?')) return

        const res = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            router.refresh()
        } else {
            alert('ลบไม่สำเร็จ')
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
            title="ลบ"
        >
            🗑️
        </button>
    )
}
