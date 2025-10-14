# Error Boundary Per Route - Next.js App Router

## 📋 Tổng quan

Dự án này demo cách implement Error Boundary per route trong Next.js App Router sử dụng các component của shadcn/ui.

## 🏗️ Cấu trúc File

```
app/
├── error.tsx                    # Global route error boundary
├── global-error.tsx            # Root application error boundary  
├── loading.tsx                 # Global loading component
├── page.tsx                    # Home page with navigation
├── demo/
│   ├── page.tsx               # Demo route page
│   ├── error.tsx              # Demo route error boundary
│   ├── loading.tsx            # Demo route loading
│   └── nested/
│       └── page.tsx           # Nested route (inherits parent error boundary)
└── error-boundary-test/
    ├── page.tsx               # Error boundary test page  
    └── error.tsx              # Test route error boundary
```

## 🎯 Error Boundary Hierarchy

### 1. **Root Level** (`global-error.tsx`)
- Handles critical errors that crash the entire app
- Replaces the entire HTML document
- Used for server-side rendering errors

### 2. **App Level** (`app/error.tsx`) 
- Handles errors in any route that doesn't have specific error boundary
- Fallback for routes without custom error.tsx

### 3. **Route Level** (`app/[route]/error.tsx`)
- Handles errors specific to that route
- Custom UI and messaging per route
- Takes precedence over app-level error boundary

### 4. **Nested Routes**
- Inherit error boundary from nearest parent with error.tsx
- Example: `/demo/nested` uses `/demo/error.tsx`

## 🚀 Features

### ✅ **Error Boundary Components**
- Sử dụng 100% shadcn/ui components (Card, Alert, Button, etc.)
- Responsive design với dark/light mode support
- Thông tin lỗi user-friendly
- Stack trace trong development mode
- Error digest tracking

### ✅ **Route-Specific Error Handling**
- `/error-boundary-test` → Custom error UI cho testing
- `/demo` → Custom error UI với theme vàng 
- `/demo/nested` → Inherit error từ parent route
- Global fallback cho routes khác

### ✅ **Error Actions**
- **Reset**: Thử render lại component
- **Reload**: Tải lại toàn bộ trang  
- **Home**: Về trang chủ
- **Back**: Quay lại trang trước

## 🧪 Testing Error Boundaries

### **1. Route-specific Errors**
```bash
# Test demo route error
http://localhost:3000/demo
→ Click "Trigger Route Error" 
→ Shows demo/error.tsx UI

# Test nested route error  
http://localhost:3000/demo/nested
→ Click "Trigger Nested Route Error"
→ Shows demo/error.tsx UI (inherited)

# Test error boundary test
http://localhost:3000/error-boundary-test  
→ Click error buttons
→ Shows error-boundary-test/error.tsx UI
```

### **2. Different Error Types**
- **Render Error**: Component throw trong render
- **Async Error**: Promise rejection được catch
- **API Error**: Fetch request failures
- **Runtime Error**: Logic errors trong code

## 💡 Best Practices

### **1. Error UI Design**
```tsx
// ✅ Good: Informative and actionable
<Alert variant="destructive">
  <AlertTitle>Có lỗi xảy ra</AlertTitle>
  <AlertDescription>
    Vui lòng thử lại hoặc liên hệ support nếu vấn đề vẫn tiếp tục
  </AlertDescription>
</Alert>

// ❌ Bad: Generic and unhelpful  
<div>Something went wrong</div>
```

### **2. Error Logging**
```tsx
useEffect(() => {
  // Log để monitoring/debugging
  console.error('Route Error:', error)
  
  // Send to error tracking service
  // logErrorToService(error, route)
}, [error])
```

### **3. Route Naming Convention**
- `error.tsx` - Route error boundary
- `loading.tsx` - Route loading UI  
- `not-found.tsx` - 404 page
- `page.tsx` - Route content

## 🔧 Implementation Details

### **Error.tsx Structure**
```tsx
"use client" // Required for error boundaries

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  // Error logging
  useEffect(() => {
    console.error('Error caught:', error)
  }, [error])

  // Custom UI using shadcn/ui
  return (
    <Card>
      <CardHeader>
        <AlertTriangle />
        <CardTitle>Error Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          {error.message}
        </Alert>
      </CardContent>
      <CardFooter>
        <Button onClick={reset}>Try Again</Button>
      </CardFooter>
    </Card>
  )
}
```

### **Global-error.tsx Structure**  
```tsx
"use client"

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        {/* Full page error UI */}
        <ErrorComponent error={error} reset={reset} />
      </body>
    </html>
  )
}
```

## 📚 Resources

- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Shadcn/ui Components](https://ui.shadcn.com/)

## 🎨 Customization

Mỗi route có thể có error UI riêng biệt:
- Custom colors/themes per route
- Route-specific error messages
- Different action buttons
- Branded error pages
- Error analytics per route