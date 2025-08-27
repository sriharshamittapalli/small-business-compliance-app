import { supabase } from './supabase'

export interface BusinessData {
  businessName: string
  state: string
  industry: string
  businessType: string
  employeeCount: number
  annualRevenue: number
}

export interface Regulation {
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

export async function findApplicableRegulations(businessData: BusinessData): Promise<Regulation[]> {
  try {
    // Build the query with multiple conditions
    let query = supabase
      .from('regulations')
      .select('*')

    // Filter by state (if regulation applies to specific states)
    query = query.or(
      `applicable_states.cs.{${businessData.state}},applicable_states.eq.{}`
    )

    // Filter by industry (if regulation applies to specific industries)
    query = query.or(
      `applicable_industries.cs.{${businessData.industry}},applicable_industries.eq.{}`
    )

    // Filter by business type (if regulation applies to specific business types)
    query = query.or(
      `business_type.cs.{${businessData.businessType}},business_type.eq.{}`
    )

    const { data: allRegulations, error } = await query

    if (error) {
      console.error('Error fetching regulations:', error)
      throw error
    }

    if (!allRegulations) return []

    // Additional filtering for employee count and revenue ranges
    const filteredRegulations = allRegulations.filter((regulation) => {
      // Check employee count range
      if (regulation.employee_count_min !== null && regulation.employee_count_min !== undefined) {
        if (businessData.employeeCount < regulation.employee_count_min) return false
      }
      if (regulation.employee_count_max !== null && regulation.employee_count_max !== undefined) {
        if (businessData.employeeCount > regulation.employee_count_max) return false
      }

      // Check revenue range
      if (regulation.revenue_min !== null && regulation.revenue_min !== undefined) {
        if (businessData.annualRevenue < regulation.revenue_min) return false
      }
      if (regulation.revenue_max !== null && regulation.revenue_max !== undefined) {
        if (businessData.annualRevenue > regulation.revenue_max) return false
      }

      // Additional checks for array fields
      const stateMatches = regulation.applicable_states.length === 0 || 
                          regulation.applicable_states.includes(businessData.state)
      
      const industryMatches = regulation.applicable_industries.length === 0 || 
                             regulation.applicable_industries.includes(businessData.industry)
      
      const businessTypeMatches = regulation.business_type.length === 0 || 
                                 regulation.business_type.includes(businessData.businessType)

      return stateMatches && industryMatches && businessTypeMatches
    })

    return filteredRegulations
  } catch (error) {
    console.error('Error in findApplicableRegulations:', error)
    throw error
  }
}

export async function saveBusinessProfile(businessData: BusinessData) {
  try {
    const { data, error } = await supabase
      .from('business_profiles')
      .insert({
        business_name: businessData.businessName,
        state: businessData.state,
        industry: businessData.industry,
        business_type: businessData.businessType,
        employee_count: businessData.employeeCount,
        annual_revenue: businessData.annualRevenue
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving business profile:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in saveBusinessProfile:', error)
    throw error
  }
}

// Sample data seeding function
export async function seedRegulations() {
  const sampleRegulations = [
    {
      title: "Fair Labor Standards Act (FLSA)",
      description: "Federal law establishing minimum wage, overtime pay, recordkeeping, and child labor standards for employees in both private sector and government.",
      regulatory_body: "U.S. Department of Labor",
      applicable_states: [], // Applies to all states
      applicable_industries: [], // Applies to all industries
      employee_count_min: 1,
      business_type: [],
      compliance_requirements: [
        "Pay minimum wage ($7.25/hour federal, higher in some states)",
        "Pay overtime (1.5x regular rate) for hours over 40 per week",
        "Maintain accurate records of hours worked and wages paid",
        "Comply with child labor restrictions"
      ],
      penalties: "Back wages, liquidated damages, civil monetary penalties up to $2,074 per violation, and potential criminal prosecution for willful violations."
    },
    {
      title: "Occupational Safety and Health Act (OSHA)",
      description: "Federal law requiring employers to provide a workplace free from serious recognized hazards and comply with occupational safety and health standards.",
      regulatory_body: "Occupational Safety and Health Administration",
      applicable_states: [],
      applicable_industries: [],
      employee_count_min: 1,
      business_type: [],
      compliance_requirements: [
        "Provide a workplace free from serious hazards",
        "Follow all relevant OSHA safety standards",
        "Provide safety training to employees",
        "Keep records of work-related injuries and illnesses",
        "Post OSHA notices and summaries"
      ],
      penalties: "Fines ranging from $15,625 per violation for serious violations to $156,259 per violation for willful or repeated violations."
    },
    {
      title: "Americans with Disabilities Act (ADA)",
      description: "Civil rights law prohibiting discrimination based on disability in employment, public accommodations, transportation, and telecommunications.",
      regulatory_body: "Equal Employment Opportunity Commission",
      applicable_states: [],
      applicable_industries: [],
      employee_count_min: 15,
      business_type: [],
      compliance_requirements: [
        "Provide reasonable accommodations for employees with disabilities",
        "Ensure workplace accessibility",
        "Prohibit discrimination in hiring, promotion, and other employment practices",
        "Provide accessible public accommodations (if applicable)"
      ],
      penalties: "Compensatory and punitive damages, attorney fees, and civil penalties up to $75,000 for first violations and $150,000 for subsequent violations."
    },
    {
      title: "California Consumer Privacy Act (CCPA)",
      description: "State law granting California residents rights over their personal information collected by businesses.",
      regulatory_body: "California Attorney General",
      applicable_states: ["California"],
      applicable_industries: [],
      revenue_min: 25000000,
      business_type: [],
      compliance_requirements: [
        "Provide privacy notice to consumers",
        "Allow consumers to request deletion of personal information",
        "Allow consumers to opt-out of sale of personal information",
        "Implement data security measures",
        "Respond to consumer requests within 45 days"
      ],
      penalties: "Civil penalties of up to $2,500 per violation, or $7,500 per intentional violation, plus potential statutory damages in private lawsuits."
    },
    {
      title: "Food Safety Modernization Act (FSMA)",
      description: "Federal law focusing on preventing foodborne illness through modern food safety practices and enhanced FDA authority.",
      regulatory_body: "Food and Drug Administration",
      applicable_states: [],
      applicable_industries: ["Food & Beverage"],
      business_type: [],
      compliance_requirements: [
        "Implement food safety plan based on hazard analysis",
        "Conduct regular monitoring and verification activities",
        "Maintain detailed records of food safety activities",
        "Register food facilities with FDA",
        "Comply with supplier verification requirements"
      ],
      penalties: "Warning letters, import alerts, consent decrees, seizure of products, injunctions, and criminal prosecution with fines up to $500,000 per individual violation."
    },
    {
      title: "Sarbanes-Oxley Act (SOX)",
      description: "Federal law establishing enhanced standards for public company boards, management, and accounting firms to protect shareholders and the general public from accounting errors and fraudulent practices.",
      regulatory_body: "Securities and Exchange Commission",
      applicable_states: [],
      applicable_industries: ["Banking & Finance"],
      business_type: ["Corporation"],
      compliance_requirements: [
        "Establish internal controls over financial reporting",
        "CEO and CFO must certify financial statements",
        "Maintain audit committee independence",
        "Implement whistleblower protections",
        "Retain audit records for 7 years"
      ],
      penalties: "Fines up to $5 million and imprisonment up to 20 years for knowingly certifying false financial reports."
    }
  ]

  try {
    const { data, error } = await supabase
      .from('regulations')
      .insert(sampleRegulations)
      .select()

    if (error) {
      console.error('Error seeding regulations:', error)
      throw error
    }

    console.log('Successfully seeded regulations:', data?.length)
    return data
  } catch (error) {
    console.error('Error in seedRegulations:', error)
    throw error
  }
}