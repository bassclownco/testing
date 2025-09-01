'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

export const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
      holderName: 'John Doe',
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '2024',
      isDefault: false,
      holderName: 'John Doe',
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  const getCardName = (type: string) => {
    switch (type) {
      case 'visa':
        return 'Visa';
      case 'mastercard':
        return 'Mastercard';
      case 'amex':
        return 'American Express';
      default:
        return 'Credit Card';
    }
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="p-3 bg-[#1A1A1A] rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCardIcon(method.type)}</span>
                  <span className="text-white font-medium">
                    {getCardName(method.type)}
                  </span>
                </div>
                {method.isDefault && (
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    Default
                  </Badge>
                )}
              </div>
              
              <div className="text-sm text-gray-400 mb-2">
                <p>•••• •••• •••• {method.last4}</p>
                <p>Expires {method.expiryMonth}/{method.expiryYear}</p>
                <p>{method.holderName}</p>
              </div>
              
              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs"
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(method.id)}
                  className="text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </CardContent>
    </Card>
  );
}; 