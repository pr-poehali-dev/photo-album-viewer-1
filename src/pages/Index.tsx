
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const albums = [
  { id: 1746096570286, title: "Отпуск 2025", count: 24 },
  { id: 1746096570287, title: "Дни рождения", count: 18 },
  { id: 1746096570288, title: "Природа", count: 32 }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Фотоальбомы</h1>
        <p className="text-gray-600">Выберите альбом для просмотра</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <Link to={`/album/${album.id}`} key={album.id}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
              <div className="p-5 flex flex-col h-full">
                <div className="aspect-video bg-gray-200 rounded-md mb-4 overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/400x300?sig=${album.id}`} 
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{album.title}</h2>
                <div className="flex items-center mt-auto text-gray-500">
                  <Icon name="Image" className="mr-2" size={16} />
                  <span>{album.count} фото</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
