import React from 'react';
import { Card } from '@/components/ui/card';
import { Building, ArrowRight } from 'lucide-react';

const EmptyListings = ({ onAddListing }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 rounded-xl p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Icon */}
          <div className="rounded-full bg-white p-4 shadow-md">
            <Building className="w-12 h-12 text-gray-400" />
          </div>
          
          {/* Text Content */}
          <div className="space-y-2 max-w-md">
            <h3 className="text-2xl font-semibold text-gray-800">
              Start Your Hosting Journey
            </h3>
            <p className="text-gray-600">
              Ready to become a host? Add your first property listing and join our community of successful property owners.
            </p>
          </div>
          
          {/* CTA Button */}
          <button
            onClick={onAddListing}
            className="group flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>Add Your First Property</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          {/* Additional Info */}
          <div className="text-sm text-gray-500 max-w-sm">
            Get started in minutes with our simple listing process. We'll guide you through each step.
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmptyListings;