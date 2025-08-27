import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      regulations: {
        Row: {
          id: string
          title: string
          description: string
          regulatory_body: string
          applicable_states: string[]
          applicable_industries: string[]
          business_size_min?: number
          business_size_max?: number
          employee_count_min?: number
          employee_count_max?: number
          revenue_min?: number
          revenue_max?: number
          business_type: string[]
          compliance_requirements: string[]
          penalties: string
          url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          regulatory_body: string
          applicable_states: string[]
          applicable_industries: string[]
          business_size_min?: number
          business_size_max?: number
          employee_count_min?: number
          employee_count_max?: number
          revenue_min?: number
          revenue_max?: number
          business_type: string[]
          compliance_requirements: string[]
          penalties: string
          url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          regulatory_body?: string
          applicable_states?: string[]
          applicable_industries?: string[]
          business_size_min?: number
          business_size_max?: number
          employee_count_min?: number
          employee_count_max?: number
          revenue_min?: number
          revenue_max?: number
          business_type?: string[]
          compliance_requirements?: string[]
          penalties?: string
          url?: string
          created_at?: string
          updated_at?: string
        }
      }
      business_profiles: {
        Row: {
          id: string
          business_name: string
          state: string
          industry: string
          business_type: string
          employee_count: number
          annual_revenue: number
          created_at: string
        }
        Insert: {
          id?: string
          business_name: string
          state: string
          industry: string
          business_type: string
          employee_count: number
          annual_revenue: number
          created_at?: string
        }
        Update: {
          id?: string
          business_name?: string
          state?: string
          industry?: string
          business_type?: string
          employee_count?: number
          annual_revenue?: number
          created_at?: string
        }
      }
    }
  }
}