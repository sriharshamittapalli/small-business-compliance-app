'use client'

import { useState } from 'react'
import { Building2, MapPin, Users, DollarSign, Briefcase } from 'lucide-react'

interface BusinessData {
  businessName: string
  state: string
  industry: string
  businessType: string
  employeeCount: number
  annualRevenue: number
}

interface BusinessFormProps {
  onSubmit: (data: BusinessData) => void
  loading?: boolean
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

const INDUSTRIES = [
  'Agriculture', 'Automotive', 'Banking & Finance', 'Construction', 'Consulting',
  'Education', 'Energy & Utilities', 'Entertainment', 'Food & Beverage', 'Government',
  'Healthcare', 'Hospitality', 'Information Technology', 'Insurance', 'Legal',
  'Manufacturing', 'Marketing & Advertising', 'Non-profit', 'Real Estate', 'Retail',
  'Technology', 'Telecommunications', 'Transportation', 'Other'
]

const BUSINESS_TYPES = [
  'Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'S-Corporation',
  'Non-profit', 'Other'
]

export default function BusinessForm({ onSubmit, loading = false }: BusinessFormProps) {
  const [formData, setFormData] = useState<BusinessData>({
    businessName: '',
    state: '',
    industry: '',
    businessType: '',
    employeeCount: 0,
    annualRevenue: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof BusinessData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.businessName && formData.state && formData.industry && 
                     formData.businessType && formData.employeeCount > 0 && formData.annualRevenue >= 0

  return (
    <div className="bg-white rounded-lg shadow-lg border p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-800">Business Compliance Checker</h2>
        <p className="text-gray-600 mt-2">Enter your business details to find applicable regulations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building2 className="w-4 h-4 inline mr-1" />
            Business Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your business name"
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            State
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select your state</option>
            {US_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="w-4 h-4 inline mr-1" />
            Industry
          </label>
          <select
            value={formData.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select your industry</option>
            {INDUSTRIES.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type
          </label>
          <select
            value={formData.businessType}
            onChange={(e) => handleChange('businessType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select business type</option>
            {BUSINESS_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Employee Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Number of Employees
          </label>
          <input
            type="number"
            min="1"
            value={formData.employeeCount || ''}
            onChange={(e) => handleChange('employeeCount', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter number of employees"
            required
          />
        </div>

        {/* Annual Revenue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Annual Revenue (USD)
          </label>
          <input
            type="number"
            min="0"
            value={formData.annualRevenue || ''}
            onChange={(e) => handleChange('annualRevenue', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter annual revenue"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? 'Finding Regulations...' : 'Find Applicable Regulations'}
        </button>
      </form>
    </div>
  )
}