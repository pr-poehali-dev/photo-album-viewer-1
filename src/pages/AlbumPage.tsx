
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Photo {
  id: number;
  url: string;
  title: string;
}

const AlbumPage = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Имитация загрузки данных
    setLoading(true);
    
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
      const mockPhotos = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        url: `https://source.unsplash.com/random/300x300?sig=${i}`,
        title: `Фото ${i + 1}`
      }));
      
      setPhotos(mockPhotos);
      setLoading(false);
    }, 800);
  }, [albumId]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="p-2">
              <Icon name="ArrowLeft" className="mr-2" />
              На главную
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Альбом #{albumId}</h1>
        </div>
        <Separator className="my-4" />
      </header>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="aspect-square bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="relative group">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                  <div className="p-3 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-medium truncate">{photo.title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
