'use client'

import { useState } from 'react'
import BusinessForm from '../../components/BusinessForm'
import RegulationsResults from '../../components/RegulationsResults'
import DatabaseSchema from '../../components/DatabaseSchema'
import { findApplicableRegulations, saveBusinessProfile, type BusinessData, type Regulation } from '../../lib/regulations'
import { RefreshCw } from 'lucide-react'

export default function Home() {
  const [regulations, setRegulations] = useState<Regulation[]>([])
  const [loading, setLoading] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showSchema, setShowSchema] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (businessData: BusinessData) => {
    setLoading(true)
    setError('')
    setBusinessName(businessData.businessName)
    
    try {
      // Save business profile and find applicable regulations
      await saveBusinessProfile(businessData)
      const applicableRegulations = await findApplicableRegulations(businessData)
      
      setRegulations(applicableRegulations)
      setShowResults(true)
    } catch (err) {
      console.error('Error processing business data:', err)
      setError('Failed to process your request. Please make sure your database is set up correctly.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setShowResults(false)
    setRegulations([])
    setBusinessName('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Small Business Compliance Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the laws, rules, and regulations that apply to your US-based business
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-800">{error}</p>
            <p className="text-red-600 text-sm mt-2">
              Make sure to set up your Supabase database with the provided schema and environment variables.
            </p>
          </div>
        )}

        {/* Toggle Schema View */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowSchema(!showSchema)}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            {showSchema ? 'Hide' : 'View'} Database Structure
          </button>
        </div>

        {/* Database Schema */}
        {showSchema && (
          <div className="mb-8">
            <DatabaseSchema />
          </div>
        )}

        {/* Main Content */}
        {!showResults ? (
          <BusinessForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <div className="space-y-6">
            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Check Another Business
              </button>
            </div>

            {/* Results */}
            <RegulationsResults regulations={regulations} businessName={businessName} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Small Business Compliance Tool - Built for demonstration purposes</p>
          <p className="mt-1">Always consult with legal professionals for comprehensive compliance advice</p>
        </footer>
      </div>
    </div>
  )
}
