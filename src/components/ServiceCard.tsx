'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
}

export default function ServiceCard({ id, name, shortDescription, image }: ServiceCardProps) {
  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Link href={`/services/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-blue-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {getInitials(name)}
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600">{shortDescription}</p>
        </div>
      </div>
    </Link>
  );
} 