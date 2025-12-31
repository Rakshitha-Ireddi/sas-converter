import { NextRequest, NextResponse } from 'next/server';
import { convert } from '@/lib/converter';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await convert(body);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
    }
}
