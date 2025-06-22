'use client'

import { Baby } from "lucide-react"
import Button from "../../button"

interface ErrorFallbackProps {
    error?: Error
    onRetry?: () => void
}

const DefaultErrorFallback = ({ error, onRetry }: ErrorFallbackProps) => (
    <div
        className="flex flex-col items-center justify-center p-8 text-center"
    >
        <div className="text-6xl mb-4 "><Baby /></div>
        <h2 className="text-heading-2 font-semibold mb-2"> Houston we have a problem 🙂</h2>
        <p
            className="text-subtext-color mb-4"
        >
            We're sorry for the inconvenience. Please try again
        </p>
        {onRetry && (
            <Button
                onClick={onRetry}
            >
                Try Again
            </Button>
        )}

        {/* We should show this in dev env only */}
        {error && <details className="mt-4 text-left">
            <summary>Error Details :</summary>
            <pre
                className="text-xs text-red-600"
            >
                {error?.message}
            </pre>
        </details>}
    </div>
)

export default DefaultErrorFallback