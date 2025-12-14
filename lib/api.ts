const API_BASE_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')
  : 'http://localhost:4000';

export interface Website {
  id: string;
  url: string;
  name: string | null;
  createdAt: string;
}

export interface Scan {
  id: string;
  websiteId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  score: number | null;
  reportUrl: string | null;
  metaJson: any;
  createdAt: string;
}

export interface Issue {
  id: string;
  help: string;
  description: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  helpUrl: string;
  tags: string[];
  nodes: any[];
}

// Create website
export async function createWebsite(url: string, name?: string): Promise<Website> {
  const response = await fetch(`${API_BASE_URL}/api/v1/website/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, name }),
  });

  if (!response.ok) {
    throw new Error('Failed to create website');
  }

  return response.json();
}

// Create scan
export async function createScan(websiteId: string): Promise<Scan> {
  const response = await fetch(`${API_BASE_URL}/api/v1/scan/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ websiteId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create scan');
  }

  return response.json();
}

// Get scan status
export async function getScan(scanId: string): Promise<Scan> {
  const response = await fetch(`${API_BASE_URL}/api/v1/scan/${scanId}`);

  if (!response.ok) {
    throw new Error('Failed to get scan status');
  }

  return response.json();
}

// Download PDF report
export async function downloadPDF(scanId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/scan/${scanId}/pdf`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('PDF report not found. It may still be generating.');
    }
    throw new Error('Failed to download PDF report');
  }

  // Get the PDF blob
  const blob = await response.blob();
  
  // Create a download link and trigger download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `accessibility-report-${scanId}.pdf`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

