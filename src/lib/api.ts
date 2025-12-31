export async function convertSasCode(sasCode: string, target: string) {
    const response = await fetch('/api/quick-convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sasCode, target }),
    });

    if (!response.ok) {
        throw new Error('Conversion failed');
    }

    return response.json();
}
