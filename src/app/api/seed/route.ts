import { NextResponse } from 'next/server'
import { seedRegulations } from '../../../../lib/regulations'

export async function POST() {
  try {
    const seededData = await seedRegulations()
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${seededData?.length || 0} regulations`,
      data: seededData
    })
  } catch (error) {
    console.error('Seeding error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to seed regulations',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}