'use client';

import { useState } from 'react';

export default function CurlKodCevirici() {
  const [curlInput, setCurlInput] = useState(`curl -X POST https://api.example.com/data \
  -H "Content-Type: application/json" \
  -d '{"name": "test"}'`);
  const [targetType, setTargetType] = useState<'fetch' | 'axios'>('fetch');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    if (!curlInput) return;

    // Basit cURL ayrıştırma
    const urlMatch = curlInput.match(/curl\s+(?:-X\s+\w+\s+)?['"]?([^'"\s]+)/);
    const url = urlMatch ? urlMatch[1] : 'https://api.example.com';
    const methodMatch = curlInput.match(/-X\s+([A-Z]+)/);
    const method = methodMatch ? methodMatch[1] : (curlInput.includes('-d') ? 'POST' : 'GET');

    const dataMatch = curlInput.match(/-d\s+['"]([^'"]+)['"]/);
    const bodyData = dataMatch ? dataMatch[1] : null;

    let code = '';
    if (targetType === 'fetch') {
      code = `const response = await fetch('${url}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json'
  },${bodyData ? `\n  body: JSON.stringify(${bodyData})` : ''}
});
const data = await response.json();`;
    } else {
      code = `import axios from 'axios';

const response = await axios({
  method: '${method.toLowerCase()}',
  url: '${url}',
  headers: {
    'Content-Type': 'application/json'
  },${bodyData ? `\n  data: ${bodyData}` : ''}
});
const data = response.data;`;
    }
    setOutput(code);
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => { setTargetType('fetch'); setOutput(''); }}
            className={`flex-1 h-11 rounded-lg font-medium text-sm transition-colors ${targetType === 'fetch' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            Fetch (Native JS)
          </button>
          <button
            type="button"
            onClick={() => { setTargetType('axios'); setOutput(''); }}
            className={`flex-1 h-11 rounded-lg font-medium text-sm transition-colors ${targetType === 'axios' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            Axios
          </button>
        </div>

        <div>
          <label htmlFor="curl" className="block text-sm font-medium text-foreground mb-1">Terminal cURL Komutu</label>
          <textarea
            id="curl"
            rows={5}
            value={curlInput}
            onChange={(e) => setCurlInput(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono"
          />
        </div>

        <button
          type="button"
          onClick={handleConvert}
          className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          JavaScript Koduna Çevir
        </button>

        {output && (
          <div className="mt-8 pt-6 border-t border-border space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Oluşturulan Kod:</span>
            <pre className="p-4 rounded-lg bg-muted/40 border border-border font-mono text-xs overflow-x-auto text-foreground select-all">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
