import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductById } from '@/lib/db';
import { Product } from '@/lib/types';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, productId } = body;
        const userQuery = message.toLowerCase();

        // 1. If user is asking about a specific product (Context Aware)
        if (productId) {
            const currentProduct = await getProductById(productId);
            if (currentProduct) {
                // Simple logic: Check if user is asking about compatibility with another model
                // We look for other car model keywords in the users query

                // This is a basic implementation. Ideally we would have a mapping of all car models.
                // For now, let's just check if the current product matches the query somewhat.

                const isAskingAboutCompat = userQuery.includes('ใส่') || userQuery.includes('ใช้กับ') || userQuery.includes('ได้ไหม') || userQuery.includes('fit');

                if (isAskingAboutCompat) {
                    // Check if query contains the current product's car model
                    const productModel = currentProduct.carModel.toLowerCase();
                    const productYear = currentProduct.carYear.toLowerCase();

                    // If the query mentions the model of the product
                    if (userQuery.includes(productModel)) {
                        return NextResponse.json({
                            message: `ใช่ครับ! สินค้านี้ (${currentProduct.name}) ตรงรุ่นสำหรับ ${currentProduct.carBrand} ${currentProduct.carModel} ปี ${currentProduct.carYear} ครับ`,
                            products: [currentProduct]
                        });
                    } else {
                        // If query mentions a DIFFERENT model?
                        // Hard to detect "different" model without a dictionary of models.
                        // Let's do a general search to see if we have what they are asking for instead.
                    }
                }
            }
        }

        // 2. General Search Logic
        const allProducts = await getProducts();

        // Split query into keywords
        const keywords = userQuery.split(' ').filter((k: string) => k.length > 1);

        // Filter products based on keywords
        // We want products that match ANY of the significant keywords, but ideally ALL.
        // Let's try to find products that match the most keywords.

        const scoredProducts = allProducts.map(product => {
            let score = 0;
            const info = `${product.name} ${product.carBrand} ${product.carModel} ${product.category} ${product.carYear}`.toLowerCase();

            keywords.forEach((keyword: string) => {
                if (info.includes(keyword)) score += 1;
            });

            return { product, score };
        });

        // Sort by score
        const matchedProducts = scoredProducts
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.product);

        // Take top 3
        const topProducts = matchedProducts.slice(0, 3);

        if (topProducts.length > 0) {
            return NextResponse.json({
                message: `ผมเจอสินค้าที่น่าจะตรงกับที่คุณตามหาครับ ลองดูรายการด้านล่างนี้นะครับ 👇`,
                products: topProducts
            });
        }

        // 3. Fallback
        return NextResponse.json({
            message: 'ขออภัยครับ ผมยังไม่เจอสินค้าที่ตรงกับข้อมูลนี้ในระบบ ลองระบุรุ่นรถ หรือชื่ออะไหล่ให้ชัดเจนขึ้นอีกนิดนะครับ',
            products: []
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { message: 'ขออภัยระบบขัดข้องชั่วคราวครับ', products: [] },
            { status: 500 }
        );
    }
}
