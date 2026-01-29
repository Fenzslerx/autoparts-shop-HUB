'use client'

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"


export const dynamic = 'force-dynamic'
import { categories, carBrands } from "@/lib/data"

interface EditProductPageProps {
    params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingProduct, setIsLoadingProduct] = useState(true)
    const [selectedBrand, setSelectedBrand] = useState('')
    const [customBrand, setCustomBrand] = useState('')
    const [customModel, setCustomModel] = useState('')
    const [customCategory, setCustomCategory] = useState('')
    const [useCustomBrand, setUseCustomBrand] = useState(false)
    const [useCustomModel, setUseCustomModel] = useState(false)
    const [useCustomCategory, setUseCustomCategory] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [uploadingImage, setUploadingImage] = useState(false)
    const [productId, setProductId] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        carModel: '',
        carYear: '',
    })

    useEffect(() => {
        async function loadProduct() {
            const { id } = await params
            setProductId(id)

            try {
                const res = await fetch(`/api/products/${id}`)
                const data = await res.json() as any

                if (data.product) {
                    const p = data.product
                    setFormData({
                        name: p.name || '',
                        description: p.description || '',
                        price: String(p.price || ''),
                        stock: String(p.stock || ''),
                        category: p.category || '',
                        carModel: p.carModel || '',
                        carYear: p.carYear || '',
                    })

                    // Check if category is in predefined list
                    const catExists = categories.some(c => c.id === p.category)
                    if (!catExists && p.category) {
                        setUseCustomCategory(true)
                        setCustomCategory(p.category)
                    }

                    // Check if brand is in predefined list
                    const brand = carBrands.find(b => b.name === p.carBrand)
                    if (brand) {
                        setSelectedBrand(brand.id)
                        // Check if model is in predefined list
                        const modelExists = brand.models.some(m => m.name === p.carModel)
                        if (!modelExists && p.carModel) {
                            setUseCustomModel(true)
                            setCustomModel(p.carModel)
                        }
                    } else if (p.carBrand) {
                        setUseCustomBrand(true)
                        setCustomBrand(p.carBrand)
                        setUseCustomModel(true)
                        setCustomModel(p.carModel || '')
                    }

                    if (p.images && p.images.length > 0) {
                        setImages(p.images)
                        setImagePreviews(p.images)
                    } else if (p.imageUrl) {
                        setImages([p.imageUrl])
                        setImagePreviews([p.imageUrl])
                    }
                }
            } catch (error) {
                console.error('Error loading product:', error)
                alert('ไม่พบสินค้านี้')
                router.push('/admin/products')
            } finally {
                setIsLoadingProduct(false)
            }
        }

        loadProduct()
    }, [params, router])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploadingImage(true)

        for (let i = 0; i < files.length; i++) {
            const file = files[i]

            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreviews(prev => [...prev, e.target?.result as string])
            }
            reader.readAsDataURL(file)

            const formData = new FormData()
            formData.append('file', file)

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })
                const data = await res.json() as any
                if (data.success) {
                    setImages(prev => [...prev, data.imageUrl])
                }
            } catch {
                alert('เกิดข้อผิดพลาดในการอัปโหลด')
            }
        }

        setUploadingImage(false)
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const selectedBrandData = carBrands.find(b => b.id === selectedBrand)
        const finalBrand = useCustomBrand ? customBrand : (selectedBrandData?.name || '')
        const finalModel = useCustomModel ? customModel : formData.carModel
        const finalCategory = useCustomCategory ? customCategory : formData.category

        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    carBrand: finalBrand,
                    carModel: finalModel,
                    category: finalCategory,
                    imageUrl: images[0] || '',
                    images: images,
                }),
            })

            const data = await res.json() as any
            if (data.success) {
                alert('บันทึกเรียบร้อยแล้ว!')
                router.push('/admin')
                router.refresh()
            } else {
                alert('เกิดข้อผิดพลาด: ' + data.error)
            }
        } catch {
            alert('เกิดข้อผิดพลาด กรุณาลองใหม่')
        } finally {
            setIsLoading(false)
        }
    }

    const selectedBrandData = carBrands.find(b => b.id === selectedBrand)

    if (isLoadingProduct) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8 text-center">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="h-64 bg-gray-100 rounded-2xl"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">แก้ไขสินค้า</h1>
                <p className="text-[var(--text-secondary)] mt-1">ID: {productId}</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[var(--border)] p-6 md:p-8">

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        รูปภาพสินค้า
                    </label>

                    <div className="flex flex-wrap gap-3 mb-3">
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-[var(--border)]">
                                <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-24 h-24 rounded-xl border-2 border-dashed border-[var(--border)] flex items-center justify-center cursor-pointer hover:border-[var(--primary)] transition-colors bg-gray-50"
                        >
                            <div className="text-center">
                                <span className="text-2xl">➕</span>
                                <p className="text-xs text-[var(--text-muted)]">เพิ่มรูป</p>
                            </div>
                        </div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    {uploadingImage && (
                        <p className="text-sm text-[var(--primary)]">⏳ กำลังอัปโหลด...</p>
                    )}
                </div>

                {/* Product Name */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        ชื่อสินค้า *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        รายละเอียด
                    </label>
                    <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="input-field resize-none"
                    />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            ราคา (บาท) *
                        </label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            จำนวนสต็อก
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className="input-field"
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        หมวดหมู่ *
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            id="customCategory"
                            checked={useCustomCategory}
                            onChange={(e) => setUseCustomCategory(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="customCategory" className="text-sm text-[var(--text-secondary)]">
                            พิมพ์หมวดหมู่เอง
                        </label>
                    </div>
                    {useCustomCategory ? (
                        <input
                            type="text"
                            required
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            className="input-field"
                            placeholder="พิมพ์หมวดหมู่ใหม่..."
                        />
                    ) : (
                        <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="input-field"
                        >
                            <option value="">เลือกหมวดหมู่</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Car Brand */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        ยี่ห้อรถ *
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            id="customBrand"
                            checked={useCustomBrand}
                            onChange={(e) => {
                                setUseCustomBrand(e.target.checked)
                                if (e.target.checked) setUseCustomModel(true)
                            }}
                            className="w-4 h-4"
                        />
                        <label htmlFor="customBrand" className="text-sm text-[var(--text-secondary)]">
                            พิมพ์ยี่ห้อเอง
                        </label>
                    </div>
                    {useCustomBrand ? (
                        <input
                            type="text"
                            required
                            value={customBrand}
                            onChange={(e) => setCustomBrand(e.target.value)}
                            className="input-field"
                            placeholder="พิมพ์ยี่ห้อรถใหม่..."
                        />
                    ) : (
                        <select
                            required
                            className="input-field"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            <option value="">เลือกยี่ห้อ</option>
                            {carBrands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Car Model */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        รุ่นรถ *
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            id="customModel"
                            checked={useCustomModel}
                            onChange={(e) => setUseCustomModel(e.target.checked)}
                            className="w-4 h-4"
                            disabled={useCustomBrand}
                        />
                        <label htmlFor="customModel" className="text-sm text-[var(--text-secondary)]">
                            พิมพ์รุ่นเอง
                        </label>
                    </div>
                    {useCustomModel ? (
                        <input
                            type="text"
                            required
                            value={customModel}
                            onChange={(e) => setCustomModel(e.target.value)}
                            className="input-field"
                            placeholder="พิมพ์รุ่นรถใหม่..."
                        />
                    ) : (
                        <select
                            required
                            value={formData.carModel}
                            onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                            className="input-field"
                            disabled={!selectedBrand}
                        >
                            <option value="">เลือกรุ่น</option>
                            {selectedBrandData?.models.map(model => (
                                <option key={model.id} value={model.name}>{model.name}</option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Car Year */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        ปีรถ
                    </label>
                    <input
                        type="text"
                        value={formData.carYear}
                        onChange={(e) => setFormData({ ...formData, carYear: e.target.value })}
                        className="input-field"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 rounded-xl border-2 border-[var(--border)] text-[var(--text-secondary)] hover:bg-gray-50 transition-colors"
                    >
                        ยกเลิก
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || uploadingImage}
                        className="flex-1 btn-primary disabled:opacity-50"
                    >
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                    </button>
                </div>
            </form>
        </div>
    )
}
