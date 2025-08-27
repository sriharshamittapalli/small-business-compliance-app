'use client'

import { ExternalLink, AlertTriangle, FileText, Building } from 'lucide-react'

interface Regulation {
  id: string
  title: string
  description: string
  regulatory_body: string
  applicable_states: string[]
  applicable_industries: string[]
  business_type: string[]
  compliance_requirements: string[]
  penalties: string
  url?: string
}

interface RegulationsResultsProps {
  regulations: Regulation[]
  businessName: string
}

export default function RegulationsResults({ regulations, businessName }: RegulationsResultsProps) {
  if (regulations.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 mb-2">
          <FileText className="w-8 h-8 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">No Specific Regulations Found</h3>
        <p className="text-green-700">
          Based on your business profile, we did not find any specific regulations that apply to your business.
          However, we recommend consulting with a legal professional for comprehensive compliance advice.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Compliance Requirements for {businessName}
        </h2>
        <p className="text-gray-600">
          Found {regulations.length} regulation{regulations.length !== 1 ? 's' : ''} that may apply to your business
        </p>
      </div>

      <div className="space-y-4">
        {regulations.map((regulation) => (
          <div key={regulation.id} className="bg-white border rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {regulation.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Building className="w-4 h-4 mr-1" />
                  {regulation.regulatory_body}
                </div>
              </div>
              {regulation.url && (
                <a
                  href={regulation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="View official regulation"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>

            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">
                {regulation.description}
              </p>
            </div>

            {/* Compliance Requirements */}
            {regulation.compliance_requirements.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Compliance Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {regulation.compliance_requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Penalties */}
            {regulation.penalties && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-red-800">Penalties for Non-Compliance:</h4>
                </div>
                <p className="text-red-700">{regulation.penalties}</p>
              </div>
            )}

            {/* Applicable Scope */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {regulation.applicable_states.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">States: </span>
                  <span className="text-gray-600">
                    {regulation.applicable_states.join(', ')}
                  </span>
                </div>
              )}
              {regulation.applicable_industries.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Industries: </span>
                  <span className="text-gray-600">
                    {regulation.applicable_industries.join(', ')}
                  </span>
                </div>
              )}
              {regulation.business_type.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Business Types: </span>
                  <span className="text-gray-600">
                    {regulation.business_type.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <strong>Disclaimer:</strong> This information is provided for general guidance only and should not be considered legal advice. 
          Please consult with qualified legal professionals or regulatory authorities for specific compliance requirements.
        </p>
      </div>
    </div>
  )
}