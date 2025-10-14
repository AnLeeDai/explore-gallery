"use client"

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    // Log critical error for monitoring
    console.error('Critical Global Error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-lg border-destructive">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="text-destructive">Lỗi nghiêm trọng!</CardTitle>
              </div>
              <CardDescription>
                Ứng dụng đã gặp phải một lỗi nghiêm trọng và không thể tiếp tục hoạt động.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Thông báo lỗi</AlertTitle>
                <AlertDescription className="mt-2">
                  {error.message || 'Lỗi hệ thống không xác định'}
                </AlertDescription>
              </Alert>

              {process.env.NODE_ENV === 'development' && error.digest && (
                <div className="text-sm text-muted-foreground">
                  <strong>Error Digest:</strong> 
                  <code className="ml-2 text-xs bg-muted p-1 rounded">{error.digest}</code>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button 
                onClick={reset}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Khởi động lại ứng dụng
              </Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  )
}