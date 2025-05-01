
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Album {
  id: number;
  title: string;
  count: number;
}

const Index = () => {
  const [albums, setAlbums] = useState<Album[]>(() => {
    // Загрузка альбомов из localStorage при инициализации
    const savedAlbums = localStorage.getItem("albums");
    return savedAlbums ? JSON.parse(savedAlbums) : [
      { id: 1746096570286, title: "Отпуск 2025", count: 24 },
      { id: 1746096570287, title: "Дни рождения", count: 18 },
      { id: 1746096570288, title: "Природа", count: 32 }
    ];
  });
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Сохраняем альбомы в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);

  const addAlbum = () => {
    const newAlbum = {
      id: Date.now(),
      title: "new",
      count: 0
    };
    setAlbums([...albums, newAlbum]);
  };

  const deleteAlbum = (id: number, e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке при клике на корзину
    e.stopPropagation(); // Останавливаем всплытие события
    setAlbums(albums.filter(album => album.id !== id));
  };

  const deleteAllAlbums = () => {
    if (window.confirm("Вы уверены, что хотите удалить все альбомы?")) {
      setAlbums([]);
    }
  };

  const startEdit = (album: Album, e: React.MouseEvent) => {
    e.preventDefault();
    setEditingId(album.id);
    setEditTitle(album.title);
  };

  const saveEdit = () => {
    if (editingId) {
      setAlbums(albums.map(album => 
        album.id === editingId ? { ...album, title: editTitle } : album
      ));
      setEditingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Фотоальбомы</h1>
          <div className="flex gap-2">
            <Button onClick={addAlbum} size="sm" className="flex items-center">
              <Icon name="Plus" className="mr-2" size={16} />
              Добавить альбом
            </Button>
            <Button onClick={deleteAllAlbums} variant="destructive" size="sm" className="flex items-center">
              <Icon name="Trash2" className="mr-2" size={16} />
              Удалить все
            </Button>
          </div>
        </div>
        <p className="text-gray-600">Выберите альбом для просмотра</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <Link to={`/album/${album.id}`} key={album.id}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 relative">
              <div className="p-4 flex flex-col h-full">
                <div className="aspect-video bg-gray-200 rounded-md mb-3 overflow-hidden">
                  {album.count > 0 ? (
                    <img 
                      src={`https://source.unsplash.com/random/400x300?sig=${album.id}`} 
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Icon name="Camera" size={32} className="text-gray-400" />
                    </div>
                  )}
                  <Button 
                    variant="destructive" 
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={(e) => deleteAlbum(album.id, e)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
                
                {editingId === album.id ? (
                  <input
                    type="text"
                    className="text-lg font-semibold mb-2 border border-gray-300 rounded p-1"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                ) : (
                  <h2 
                    className="text-lg font-semibold mb-2 cursor-pointer"
                    onDoubleClick={(e) => startEdit(album, e)}
                  >
                    {album.title}
                  </h2>
                )}
                
                <div className="flex items-center mt-auto text-gray-500">
                  <Icon name="Image" className="mr-2" size={14} />
                  <span>{album.count} фото</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
        
        <Card 
          className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 border-dashed border-2 flex items-center justify-center cursor-pointer"
          onClick={addAlbum}
        >
          <div className="p-4 flex flex-col h-full items-center justify-center w-full">
            <div className="rounded-full bg-gray-100 p-3 mb-3">
              <Icon name="Plus" size={24} className="text-gray-500" />
            </div>
            <p className="text-gray-500 font-medium">Добавить альбом</p>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Index;
