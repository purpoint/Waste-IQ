"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">
              Something went wrong
            </h1>
            <p className="text-slate-400 text-sm mb-2">
              An unexpected error occurred. Our team has been notified.
            </p>
            {this.state.error && (
              <p className="text-slate-600 text-xs font-mono mb-6 bg-slate-900 p-3 rounded-lg border border-slate-800">
                {this.state.error.message}
              </p>
            )}
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "/dashboard"}
                className="border-slate-700 text-slate-300 hover:text-white"
              >
                Go to dashboard
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}