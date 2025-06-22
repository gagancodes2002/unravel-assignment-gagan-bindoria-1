'use client'

import clsx from "clsx"
import { RotateCcw, TriangleAlert, Wrench } from "lucide-react"
import Button from "../button"
import { useRouter } from "next/navigation"

interface FeatureErrorFallbackProps {
    featureName: string
    critical?: boolean
    onRetry?: () => boolean
}

export const FeatureErrorFallback = ({ featureName, critical = false, onRetry }: FeatureErrorFallbackProps) => {

    const router = useRouter()

    return (
        <div
            className={
                clsx(
                    'rounded-lg p-6 text-center',
                    critical ? 'bg-error-50 border border-error 200' :
                        'bg-neutral-50 border border-neutral-200'
                )
            }
        >
            <div
                className="text-4xl mb-3"
            >
                {critical ? <TriangleAlert /> : <Wrench />}

            </div>

            <h3
                className={clsx("font-semibold text-sm",
                    critical ? "text-error-700" : "text-neutral-700"
                )}
            >
                {critical ? `${featureName} Unavailable ` : `${featureName} Issue`}
            </h3>

            <p
                className={clsx(
                    'text-base mb-4',
                    critical ? 'text-error-600' : 'text-neutral-600'
                )}
            >
                {
                    critical ?
                        `We are having some issues with ${featureName.toLowerCase()}. We are on it`
                        : `${featureName} is temporarily unabailable. You can continue using other features.`
                }
            </p>

            <div
                className="flex justify-center gap-3"
            >
                {onRetry &&
                    <Button
                        className={clsx(
                            "px-4 py-2 rounded text-sm font-medium transition-colors",
                            critical ? "bg-error-500 text-white hover:bg-error-600" : "bg-neutral-500 text-white hover:bg-neutral-600"
                        )}
                        onClick={onRetry}
                    >
                        Retry
                    </Button>
                }

                {critical &&
                    <Button
                        onClick={() => {
                            router.refresh()
                        }}
                    >
                        <RotateCcw />
                        Refresh
                    </Button>
                }

            </div>


        </div>
    )
}