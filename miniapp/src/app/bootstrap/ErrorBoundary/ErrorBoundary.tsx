import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2 px-4 py-16 text-center">
          <h1 className="text-xl font-semibold">Что-то пошло не так</h1>
          <p className="text-muted">Обновите страницу или вернитесь позже.</p>
        </div>
      )
    }

    return this.props.children
  }
}
