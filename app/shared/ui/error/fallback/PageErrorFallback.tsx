'use client'

import { ArrowLeft, Home, HomeIcon, RotateCcw } from "lucide-react"
import Button from "../../button"

interface PageErrorFallbackProps {
    pageName: string
    onRetry?: () => void
}

export const PageErrorFallback = ({ pageName, onRetry }: PageErrorFallbackProps) => {



    return (



        <div
            className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
        >
            <div
                className="text-8xl mb-6"
            >
                <Home />
            </div>
            <h1
                className="font-semibold text-2xl text-default-font mb-4"
            >
                {pageName} Unavailable
            </h1>
            <p
                className="text-base text-subtext-color mb-8 max-w-lg"
            >
                We are experiencing issues loading this page. This might be a temporary issue.
            </p>

            <div
                className="flex flex-col sm:flex-row gap-4"
            >
                {onRetry && (
                    <Button
                        onClick={onRetry}
                        size={"default"}
                    >
                        <RotateCcw /> Try Again
                    </Button>
                )}


                <Button
                    onClick={() => {
                        window.history.back()
                    }}
                    className="space-x-2"
                    size={"default"}
                >
                    <ArrowLeft size={20} />  <span>Go Back</span>
                </Button>


                <Button
                    onClick={() => {
                        window.location.href = '/'
                    }}
                    className="space-x-2"
                >
                    <HomeIcon size={20} />
                    <span>
                        Home
                    </span>
                </Button>

            </div>
        </div>
    )
}