'use client'

import React, { Component, ReactNode } from 'react'
import DefaultErrorFallback from './fallback/DefaultErrorFallback'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
    name?: string
}

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.props.onError?.(error, errorInfo)

        // Logging for monitoroing
        console.error('ErrorBoundary caught an error : ', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <DefaultErrorFallback error={this.state.error} />
        }

        return this.props.children
    }
};

export default ErrorBoundary;