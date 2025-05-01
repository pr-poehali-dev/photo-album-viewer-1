
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Photo {

interface Photo {
  id: number;
  url: string;
  title: string;
  file?: File;
  originalName?: string;
  width?: number;
  height?: number;
}

interface Album {
  id: number;
  title: string;
  count: number;
}

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>(() => {
    // Загрузка фотографий из localStorage
    const savedPhotos = localStorage.getItem(`photos_${albumId}`);
    return savedPhotos ? JSON.parse(savedPhotos) : [];
  });
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Загрузка информации об альбоме
    const savedAlbums = localStorage.getItem("albums");
    const albums: Album[] = savedAlbums ? JSON.parse(savedAlbums) : [];
    const currentAlbum = albums.find(a => a.id === Number(albumId));
    
    if (currentAlbum) {
      setAlbum(currentAlbum);
    } else {
      // Если альбом не найден, перенаправляем на главную
      navigate('/');
      return;
    }
    
    // Если у нас нет сохраненных фотографий, генерируем демо-фотографии
    if (photos.length === 0) {
      const mockPhotos = Array.from({ length: currentAlbum.count || 0 }, (_, i) => ({
        id: Date.now() + i,
        url: `https://source.unsplash.com/random/300x300?sig=${i}`,
        title: `Фото ${i + 1}`
      }));
      
      setPhotos(mockPhotos);
      localStorage.setItem(`photos_${albumId}`, JSON.stringify(mockPhotos));
    }
    
    setLoading(false);
  }, [albumId, navigate]);
  
  // Сохраняем фотографии при изменениях
  useEffect(() => {
    if (photos.length > 0) {
      localStorage.setItem(`photos_${albumId}`, JSON.stringify(photos));
      
      // Обновляем количество фотографий в альбоме
      const savedAlbums = localStorage.getItem("albums");
      const albums: Album[] = savedAlbums ? JSON.parse(savedAlbums) : [];
      const updatedAlbums = albums.map(a => 
        a.id === Number(albumId) ? { ...a, count: photos.length } : a
      );
      localStorage.setItem("albums", JSON.stringify(updatedAlbums));
    }
  }, [photos, albumId]);
  
  const addPhoto = () => {
    const newPhoto = {
      id: Date.now(),
      url: `https://source.unsplash.com/random/300x300?sig=${Date.now()}`,
      title: `Новое фото ${photos.length + 1}`
    };
    setPhotos([...photos, newPhoto]);
  };
  
  const deletePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };
  
  const deleteAllPhotos = () => {
    if (window.confirm("Вы уверены, что хотите удалить все фотографии?")) {
      setPhotos([]);
    }
  };

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
          <h1 className="text-2xl font-bold">{album?.title || `Альбом #${albumId}`}</h1>
          <div className="flex gap-2">
            <Button onClick={addPhoto} size="sm" className="flex items-center">
              <Icon name="Plus" className="mr-2" size={16} />
              Добавить фото
            </Button>
            <Button onClick={deleteAllPhotos} variant="destructive" size="sm" className="flex items-center">
              <Icon name="Trash2" className="mr-2" size={16} />
              Удалить все
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
      </header>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="aspect-square bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden relative group">
              <div className="relative">
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
                <Button 
                  variant="destructive" 
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deletePhoto(photo.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </Card>
          ))}
          
          <Card 
            className="overflow-hidden aspect-square border-dashed border-2 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={addPhoto}
          >
            <div className="flex flex-col items-center justify-center">
              <Icon name="Plus" size={32} className="text-gray-500 mb-2" />
              <p className="text-gray-500 font-medium">Добавить фото</p>
            </div>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
          <Icon name="ImageOff" size={48} className="text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">Альбом пуст</h3>
          <p className="text-gray-400 mb-4">Добавьте первую фотографию в этот альбом</p>
          <Button onClick={addPhoto}>
            <Icon name="Plus" className="mr-2" size={16} />
            Добавить фото
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
