'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { categories, carBrands } from "@/lib/data"

export default function NewProductPage() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
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

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        carModel: '',
        carYear: '',
    })

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
                } else {
                    alert('อัปโหลดรูปไม่สำเร็จ')
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
            const res = await fetch('/api/products', {
                method: 'POST',
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
                alert('เพิ่มสินค้าเรียบร้อยแล้ว!')
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

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">เพิ่มสินค้าใหม่</h1>
                <p className="text-[var(--text-secondary)] mt-1">กรอกข้อมูลสินค้าด้านล่าง</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[var(--border)] p-6 md:p-8">

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        รูปภาพสินค้า (เลือกได้หลายรูป)
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
                                {images[index] && (
                                    <div className="absolute bottom-1 left-1 w-5 h-5 bg-green-500 text-white rounded-full text-xs flex items-center justify-center">
                                        ✓
                                    </div>
                                )}
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
                        placeholder="เช่น กรองอากาศ Toyota Camry"
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
                        placeholder="รายละเอียดสินค้า..."
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
                            placeholder="0"
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
                            placeholder="0"
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
                                if (e.target.checked) {
                                    setUseCustomModel(true) // Also enable custom model when custom brand
                                }
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
                        placeholder="เช่น 2018-2024"
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
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
                    </button>
                </div>
            </form>
        </div>
    )
}

