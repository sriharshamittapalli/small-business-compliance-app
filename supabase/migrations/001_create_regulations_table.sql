-- Create regulations table
CREATE TABLE IF NOT EXISTS regulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  regulatory_body TEXT NOT NULL,
  applicable_states TEXT[] NOT NULL DEFAULT '{}',
  applicable_industries TEXT[] NOT NULL DEFAULT '{}',
  business_size_min INTEGER,
  business_size_max INTEGER,
  employee_count_min INTEGER,
  employee_count_max INTEGER,
  revenue_min BIGINT,
  revenue_max BIGINT,
  business_type TEXT[] NOT NULL DEFAULT '{}',
  compliance_requirements TEXT[] NOT NULL DEFAULT '{}',
  penalties TEXT NOT NULL,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_profiles table
CREATE TABLE IF NOT EXISTS business_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  state TEXT NOT NULL,
  industry TEXT NOT NULL,
  business_type TEXT NOT NULL,
  employee_count INTEGER NOT NULL,
  annual_revenue BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_regulations_states ON regulations USING GIN (applicable_states);
CREATE INDEX IF NOT EXISTS idx_regulations_industries ON regulations USING GIN (applicable_industries);
CREATE INDEX IF NOT EXISTS idx_regulations_business_type ON regulations USING GIN (business_type);
CREATE INDEX IF NOT EXISTS idx_regulations_employee_count ON regulations (employee_count_min, employee_count_max);
CREATE INDEX IF NOT EXISTS idx_regulations_revenue ON regulations (revenue_min, revenue_max);

-- Enable Row Level Security
ALTER TABLE regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public tool)
CREATE POLICY "Public read access for regulations" ON regulations FOR SELECT USING (true);
CREATE POLICY "Public insert access for regulations" ON regulations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for business_profiles" ON business_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read access for business_profiles" ON business_profiles FOR SELECT USING (true);