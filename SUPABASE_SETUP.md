# Supabase Setup Guide for Rakan Clinic Contact Form

## Overview
This guide will walk you through setting up Supabase to store contact form submissions from the Rakan Clinic website.

## Step 1: Create Supabase Account and Project

1. **Go to Supabase**: Visit [https://supabase.com](https://supabase.com)
2. **Sign Up/Login**: Create an account or log in
3. **Create New Project**:
   - Click "New Project"
   - Choose your organization
   - Project name: `rakan-clinic-global`
   - Database password: Generate a strong password (save this!)
   - Region: Choose closest to your users (e.g., Asia Pacific for Japan)
   - Click "Create new project"

## Step 2: Get Project Credentials

1. **Go to Project Settings**:
   - In your project dashboard, click the gear icon (Settings)
   - Go to "API" section
2. **Copy Credentials**:
   - Project URL (e.g., `https://your-project-id.supabase.co`)
   - Anon public key (starts with `eyJ...`)
   - Service role key (starts with `eyJ...`) - Keep this secret!

## Step 3: Create Database Table

1. **Go to SQL Editor**:
   - In your project dashboard, click "SQL Editor"
   - Click "New query"

2. **Run this SQL to create the table**:
```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  country_code VARCHAR(10),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Create an index on submitted_at for sorting
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for form submissions)
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows authenticated users to read (for admin access)
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```

3. **Click "Run"** to execute the SQL

## Step 4: Install Supabase Client

1. **Install the Supabase client**:
```bash
npm install @supabase/supabase-js
```

2. **Create environment variables**:
   - Create `.env.local` file in your project root
   - Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 5: Create Supabase Client Configuration

1. **Create `lib/supabase.ts`**:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations (API routes)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

## Step 6: Update API Route

1. **Update `app/api/contact/route.ts`**:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([{
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone,
        message: body.message,
        country_code: body.countryCode,
        submitted_at: body.submittedAt
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    console.log('Contact form saved:', data);

    return NextResponse.json(
      { message: 'Form submitted successfully', id: data[0].id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Step 7: Test the Integration

1. **Start your development server**:
```bash
npm run dev
```

2. **Test the form**:
   - Go to your contact form
   - Fill out all fields
   - Select a country code
   - Submit the form
   - Check the Supabase dashboard to see the data

## Step 8: Optional - Create Admin Dashboard

You can create a simple admin page to view submissions:

1. **Create `app/admin/page.tsx`**:
```typescript
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Submission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  country_code: string;
  submitted_at: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Form Submissions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Submitted</th>
              <th className="px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-t">
                <td className="px-4 py-2">
                  {submission.first_name} {submission.last_name}
                </td>
                <td className="px-4 py-2">{submission.email}</td>
                <td className="px-4 py-2">{submission.phone}</td>
                <td className="px-4 py-2">
                  {new Date(submission.submitted_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 max-w-xs truncate">
                  {submission.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

## Step 9: Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **Email Validation**: The form already validates email format
3. **Input Sanitization**: Supabase automatically sanitizes inputs
4. **CORS**: Supabase handles CORS for you
5. **Environment Variables**: Never commit `.env.local` to version control

## Step 10: Production Deployment

1. **Add environment variables to your hosting platform**:
   - Vercel: Go to Project Settings > Environment Variables
   - Netlify: Go to Site Settings > Environment Variables
   - Add all three Supabase environment variables

2. **Test in production**:
   - Deploy your site
   - Test the contact form
   - Verify data appears in Supabase

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your environment variables
2. **"Table doesn't exist"**: Make sure you ran the SQL to create the table
3. **CORS errors**: Check your Supabase project settings
4. **Form not submitting**: Check browser console for errors

### Useful Commands:

```bash
# Check if Supabase is working
npm run dev
# Then check browser console and network tab

# View Supabase logs
# Go to your Supabase dashboard > Logs
```

## Next Steps

1. **Email Notifications**: Set up email alerts for new submissions
2. **Data Export**: Add CSV export functionality
3. **Analytics**: Track form conversion rates
4. **Backup**: Set up regular database backups

---

## Summary

You now have:
- ✅ Enhanced contact form with international area codes
- ✅ Supabase database setup
- ✅ API route for form submissions
- ✅ Data validation and error handling
- ✅ Optional admin dashboard

The contact form will now store all submissions in your Supabase database, making it easy to manage and respond to patient inquiries!
