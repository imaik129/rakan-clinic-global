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

        // Save to Supabase (only if environment variables are set)
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
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

            console.log('Contact form saved to Supabase:', data);
        } else {
            // Fallback: just log the data if Supabase is not configured
            console.log('Contact form submission (Supabase not configured):', {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                message: body.message,
                countryCode: body.countryCode,
                submittedAt: body.submittedAt
            });
        }

        return NextResponse.json(
            { message: 'Form submitted successfully' },
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
