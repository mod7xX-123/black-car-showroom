import { Helmet } from 'react-helmet-async';

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "السيارة السوداء",
    "description": "معرض سيارات فاخر في الرياض - نوفر أحدث الموديلات بأفضل الأسعار",
    "url": "https://www.nicecarksa.com",
    "logo": "https://www.nicecarksa.com/logo.png",
    "image": "https://www.nicecarksa.com/showroom.jpg",
    "telephone": "+966 50 970 0715",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "طريق مكة المكرمة، العليا",
      "addressLocality": "الرياض",
      "postalCode": "12311",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.676995",
      "longitude": "46.682384"
    },
    "openingHours": "Sa-Th 09:00-21:00",
    "priceRange": "$$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.3",
      "reviewCount": "383"
    },
    "sameAs": [
      "https://maps.app.goo.gl/EVt9xfgj8JixKqqm7",
      "https://www.instagram.com/nicecar_ksa"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}