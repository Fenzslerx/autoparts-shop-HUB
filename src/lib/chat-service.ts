import { CHATBOT_CONFIG } from './constants'
import { getProductById, getProducts } from './db'
import { Product } from './types'

interface ChatResponse {
    message: string
    products: Product[]
}

export async function processUserMessage(message: string, productId?: string): Promise<ChatResponse> {
    const userQuery = message.toLowerCase()

    if (productId) {
        const currentProduct = await getProductById(productId)
        if (currentProduct) {
            const isAskingAboutCompat =
                userQuery.includes('ใส่') ||
                userQuery.includes('ใช้กับ') ||
                userQuery.includes('ได้ไหม') ||
                userQuery.includes('fit')

            if (isAskingAboutCompat) {
                const productModel = currentProduct.carModel.toLowerCase()
                if (userQuery.includes(productModel)) {
                    return {
                        message: CHATBOT_CONFIG.COMPATIBLE_MESSAGE(
                            currentProduct.name,
                            currentProduct.carBrand,
                            currentProduct.carModel,
                            currentProduct.carYear
                        ),
                        products: [currentProduct],
                    }
                }
            }
        }
    }

    const allProducts = await getProducts()
    const keywords = userQuery.split(' ').filter((k: string) => k.length > 1)

    const scoredProducts = allProducts.map((product) => {
        let score = 0
        const info = `${product.name} ${product.carBrand} ${product.carModel} ${product.category} ${product.carYear}`.toLowerCase()

        keywords.forEach((keyword: string) => {
            if (info.includes(keyword)) score += 1
        })

        return { product, score }
    })

    const matchedProducts = scoredProducts
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.product)

    const topProducts = matchedProducts.slice(0, 3)

    if (topProducts.length > 0) {
        return {
            message: CHATBOT_CONFIG.FOUND_MESSAGE,
            products: topProducts,
        }
    }

    return {
        message: CHATBOT_CONFIG.FALLBACK_MESSAGE,
        products: [],
    }
}
