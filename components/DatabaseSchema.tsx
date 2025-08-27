'use client'

import { Database } from 'lucide-react'

export default function DatabaseSchema() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-800">Database Structure</h3>
      </div>
      
      <div className="space-y-6">
        {/* Regulations Table */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-lg mb-3 text-blue-700">regulations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">id</span> <span className="text-gray-500">UUID (PK)</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">title</span> <span className="text-gray-500">TEXT</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">description</span> <span className="text-gray-500">TEXT</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">regulatory_body</span> <span className="text-gray-500">TEXT</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">applicable_states</span> <span className="text-gray-500">TEXT[]</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">applicable_industries</span> <span className="text-gray-500">TEXT[]</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">employee_count_min/max</span> <span className="text-gray-500">INTEGER</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">revenue_min/max</span> <span className="text-gray-500">BIGINT</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">business_type</span> <span className="text-gray-500">TEXT[]</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-blue-600">compliance_requirements</span> <span className="text-gray-500">TEXT[]</span>
            </div>
          </div>
        </div>

        {/* Business Profiles Table */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-lg mb-3 text-green-700">business_profiles</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-green-600">id</span> <span className="text-gray-500">UUID (PK)</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-green-600">business_name</span> <span className="text-gray-500">TEXT</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-green-600">state</span> <span className="text-gray-500">TEXT</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-green-600">industry</span> <span className="text-gray-500">TEXT</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-green-600">business_type</span> <span className="text-gray-500">TEXT</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-green-600">employee_count</span> <span className="text-gray-500">INTEGER</span>
            </div>
            <div className="font-mono bg-gray-50 p-2 rounded">
              <span className="text-green-600">annual_revenue</span> <span className="text-gray-500">BIGINT</span>
            </div>
          </div>
        </div>

        {/* Query Optimization */}
        <div className="border rounded-lg p-4 bg-yellow-50">
          <h4 className="font-semibold text-lg mb-3 text-yellow-800">Query Optimization</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• GIN indexes on array fields (states, industries, business_type)</li>
            <li>• Range indexes on employee_count and revenue fields</li>
            <li>• Efficient filtering for scalable regulation matching</li>
            <li>• Row Level Security enabled for data protection</li>
          </ul>
        </div>
      </div>
    </div>
  )
}