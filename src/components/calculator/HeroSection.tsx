'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  icon?: string;
  breadcrumbs?: BreadcrumbItem[];
  rating?: {
    average: number;
    count: number;
  };
}

function Breadcrumb({ items }: { items?: BreadcrumbItem[] }) {
  const locale = useLocale();
  
  const defaultItems: BreadcrumbItem[] = [
    { label: 'Home', href: `/${locale}` },
    { label: 'Calculators', href: `/${locale}/calculators` },
  ];
  
  const breadcrumbItems = items && items.length > 0 ? items : defaultItems;
  
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href && index !== breadcrumbItems.length - 1 ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={index === breadcrumbItems.length - 1 ? 'text-slate-700 font-medium' : ''}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < fullStars
                ? 'text-yellow-400 fill-current'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-current'
                : 'text-slate-300'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-slate-500">
        {rating.toFixed(1)} ({count.toLocaleString()} calculations)
      </span>
    </div>
  );
}

export function HeroSection({
  title,
  subtitle,
  badge,
  badgeColor = 'blue',
  icon,
  breadcrumbs,
  rating,
}: HeroSectionProps) {
  const badgeColors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    emerald: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container relative py-8 md:py-12">
        <Breadcrumb items={breadcrumbs} />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              {icon && (
                <span className="text-4xl" role="img" aria-hidden="true">
                  {icon}
                </span>
              )}
              {badge && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColors[badgeColor] || badgeColors.blue}`}>
                  {badge}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
                {subtitle}
              </p>
            )}
            
            {rating && (
              <div className="mt-4">
                <StarRating rating={rating.average} count={rating.count} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
