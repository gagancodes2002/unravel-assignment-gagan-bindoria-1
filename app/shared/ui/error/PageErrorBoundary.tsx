'use client'

import { ErrorInfo, ReactNode } from "react"
import ErrorBoundary from "./ErrorBoundary"
import { PageErrorFallback } from "./fallback/PageErrorFallback"

interface PageErrorBoundaryProps {
    children: ReactNode
    pageName?: string
    fallback?: ReactNode
}

export const PageErrorBoundary = ({
    children,
    pageName = 'Page',
    fallback
}: PageErrorBoundaryProps) => {

    const handleError = (error: Error, errorInfo: ErrorInfo) => {
        // Consoling for monitoring errors
        console.log(`Page Error in ${pageName}:`, error)
    }

    return (
        <ErrorBoundary
            name={`${pageName} Page`}
            fallback={fallback || <PageErrorFallback pageName={pageName} />}
            onError={handleError}
        >
            {children}
        </ErrorBoundary>
    )
}