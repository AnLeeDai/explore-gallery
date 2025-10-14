import { useCallback, useState } from 'react'

/**
 * Hook để test Error Boundary trong development
 */
export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null)

  const throwError = useCallback((message: string = 'Test error from useErrorHandler') => {
    const error = new Error(message)
    error.name = 'TestError'
    setError(error)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Throw error if exists (will be caught by Error Boundary)
  if (error) {
    throw error
  }

  return {
    throwError,
    clearError
  }
}

export default useErrorHandler