"use client";

import { useEffect, useState } from "react";

interface ScanProgressProps {
  scanId: string;
  onComplete: (scan: any) => void;
  onError: (error: Error) => void;
}

type ProgressMessage = {
  id: string;
  message: string;
  timestamp: Date;
  status: 'info' | 'success' | 'warning' | 'error';
};

export default function ScanProgress({ scanId, onComplete, onError }: ScanProgressProps) {
  const [progressMessages, setProgressMessages] = useState<ProgressMessage[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>('queued');

  const addMessage = (message: string, status: ProgressMessage['status']) => {
    setProgressMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        message,
        timestamp: new Date(),
        status,
      },
    ]);
  };

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    const messagesSeen = new Set<string>();

    const poll = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/scan/${scanId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch scan status');
        }
        const scan = await response.json();

        setCurrentStatus(scan.status);

        // Add progress messages based on status
        if (scan.status === 'queued' && !messagesSeen.has('queued')) {
          messagesSeen.add('queued');
          addMessage('Scan initiated and queued', 'info');
        } else if (scan.status === 'processing') {
          if (!messagesSeen.has('processing')) {
            messagesSeen.add('processing');
            addMessage('Processing scan...', 'info');
          }
          if (!messagesSeen.has('axe-scan')) {
            messagesSeen.add('axe-scan');
            addMessage('Running Axe-core accessibility scan...', 'info');
          }
        } else if (scan.status === 'completed') {
          if (!messagesSeen.has('axe-completed')) {
            messagesSeen.add('axe-completed');
            addMessage('Axe scan completed', 'success');
          }
          if (!messagesSeen.has('lighthouse-start')) {
            messagesSeen.add('lighthouse-start');
            addMessage('Lighthouse scan started...', 'info');
          }
          if (!messagesSeen.has('generating')) {
            messagesSeen.add('generating');
            addMessage('Generating accessibility report...', 'info');
          }
          if (!messagesSeen.has('final-success')) {
            messagesSeen.add('final-success');
            setTimeout(() => {
              addMessage('Scan completed successfully!', 'success');
              clearInterval(pollInterval);
              onComplete(scan);
            }, 1000);
          }
        } else if (scan.status === 'failed') {
          if (!messagesSeen.has('failed')) {
            messagesSeen.add('failed');
            addMessage('Scan failed', 'error');
            clearInterval(pollInterval);
            onError(new Error('Scan failed'));
          }
        }
      } catch (error) {
        clearInterval(pollInterval);
        onError(error as Error);
      }
    };

    // Initial poll
    poll();
    
    // Set up polling interval
    pollInterval = setInterval(poll, 2000);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [scanId, onComplete, onError]);

  const getStatusIcon = (status: ProgressMessage['status']) => {
    switch (status) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          {currentStatus === 'completed' ? (
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            {currentStatus === 'completed' ? 'Scan Complete' : 'Scanning in Progress'}
          </h3>
          <p className="text-sm text-gray-600">Please wait while we analyze your website</p>
        </div>
      </div>

      <div className="space-y-3">
        {progressMessages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 transition-all duration-300"
          >
            <div className="flex-shrink-0">{getStatusIcon(msg.status)}</div>
            <p className="text-sm text-text-primary flex-1">{msg.message}</p>
            <span className="text-xs text-gray-500">
              {msg.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

