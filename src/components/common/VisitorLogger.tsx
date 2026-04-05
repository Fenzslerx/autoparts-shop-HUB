'use client'

import { useEffect, useRef } from 'react'

interface VisitorLoggerProps {
    page: string
    productId?: string
}

export function VisitorLogger({ page, productId }: VisitorLoggerProps) {
    const logged = useRef(false)

    useEffect(() => {
        if (logged.current) return
        logged.current = true

        // Fire and forget
        fetch('/api/logs/visitor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page, productId }),
        }).catch(err => console.error('Visitor log error:', err))
    }, [page, productId])

    return null
}
