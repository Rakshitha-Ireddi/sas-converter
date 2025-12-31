import { NextRequest, NextResponse } from 'next/server';
import { convert } from '@/lib/converter';
import JSZip from 'jszip';

export async function POST(req: NextRequest) {
    try {
        const { sasCode, target } = await req.json();
        const result = await convert({ sasCode, target });

        const zip = new JSZip();
        result.files.forEach(file => {
            zip.file(file.path, file.content);
        });

        const buffer = await zip.generateAsync({ type: 'nodebuffer' });

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${result.zipName}"`
            }
        });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
