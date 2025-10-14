import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/mock-data'

export async function GET() {
  try {
    const categories = getCategories()
    
    return NextResponse.json(categories)
    
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}