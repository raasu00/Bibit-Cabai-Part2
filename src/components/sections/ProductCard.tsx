import React from 'react';
import { ShoppingCart, Info, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardBody } from '../ui/Card';
import { Variety } from '../../types';

interface ProductCardProps {
  variety: Variety;
  showDetails?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  variety,
  showDetails = false,
  className = '',
}) => {
  const whatsappMessage = `Halo BibitCabai, saya tertarik dengan varietas ${encodeURIComponent(variety.name)}. Bisa info lebih detail?`;

  const difficultyColors = {
    Mudah: 'bg-green-100 text-green-800',
    Sedang: 'bg-yellow-100 text-yellow-800',
    Sulit: 'bg-red-100 text-red-800',
  };

  return (
    <Card hover={true} className={`h-full ${className}`}>
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden group">
        <img
          src={variety.image}
          alt={variety.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Icon Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg">
          {variety.icon}
        </div>
        
        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-agriculture-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Rp {variety.price.toLocaleString('id-ID')}/bibit
          </span>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardBody className="flex flex-col h-full">
        {/* Title & Description */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {variety.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            {variety.description}
          </p>

          {/* Details */}
          {showDetails && (
            <div className="space-y-3 mb-4">
              {/* Spiciness */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Kepedasan:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.ceil(variety.spiciness / 2)
                          ? 'fill-chili-500 text-chili-500'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">
                    {variety.spiciness}/10
                  </span>
                </div>
              </div>

              {/* Harvest Time */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Masa Panen:</span>
                <span className="text-sm font-medium">{variety.harvestTime}</span>
              </div>

              {/* Difficulty */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Kesulitan:</span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColors[variety.difficulty]}`}>
                  {variety.difficulty}
                </span>
              </div>

              {/* Sunlight */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Sinar Matahari:</span>
                <span className="text-sm font-medium">{variety.sunlight}</span>
              </div>

              {/* Yield */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Hasil Panen:</span>
                <span className="text-sm font-medium">{variety.yield}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            href={`https://wa.me/628984338479?text=${encodeURIComponent(whatsappMessage)}`}
            external
            className="flex-1"
            size="sm"
            icon={ShoppingCart}
          >
            Pesan
          </Button>
          {!showDetails && (
            <Button
              variant="outline"
              href={`/varieties/${variety.id}`}
              className="flex-1"
              size="sm"
              icon={Info}
            >
              Detail
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
