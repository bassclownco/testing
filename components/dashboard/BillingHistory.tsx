'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Receipt } from 'lucide-react';

export const BillingHistory: React.FC = () => {
  const billingHistory = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 29.99,
      currency: 'USD',
      status: 'Paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '/invoices/INV-2024-001.pdf',
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: 29.99,
      currency: 'USD',
      status: 'Paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '/invoices/INV-2023-012.pdf',
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: 29.99,
      currency: 'USD',
      status: 'Paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '/invoices/INV-2023-011.pdf',
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-15',
      amount: 29.99,
      currency: 'USD',
      status: 'Failed',
      description: 'Pro Plan - Monthly',
      downloadUrl: null,
    },
  ];

  const handleDownloadInvoice = (invoiceId: string, downloadUrl: string) => {
    // Handle invoice download
    console.log('Downloading invoice:', invoiceId);
    // window.open(downloadUrl, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-600';
      case 'Failed':
        return 'bg-red-600';
      case 'Pending':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Billing History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {billingHistory.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg border border-gray-600"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-white font-semibold">{invoice.id}</p>
                  <p className="text-sm text-gray-400">{invoice.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white">{invoice.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-semibold">
                    ${invoice.amount.toFixed(2)} {invoice.currency}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(invoice.status)} text-white`}
                  >
                    {invoice.status}
                  </Badge>
                </div>
                
                {invoice.downloadUrl && invoice.status === 'Paid' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadInvoice(invoice.id, invoice.downloadUrl)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            View All Invoices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 