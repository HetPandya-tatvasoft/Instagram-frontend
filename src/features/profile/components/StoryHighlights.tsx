import { Plus } from "lucide-react";

const StoryHighlights: React.FC = () => {
  const stories = [
    {
      id: 1,
      title: "New York",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      title: "Travel",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      title: "Nature",
      image:
        "https://images.unsplash.com/photo-1620842493821-720e48a67852?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGh1bWFuJTIwYmVpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      title: "Tandreams",
      image:
        "https://plus.unsplash.com/premium_photo-1669842504837-ac6c1bad2bcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGh1bWFufGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="mt-6 w-[340px] sm:w-[480px] md:w-[680px] flex gap-6 px-1 overflow-x-auto scrollbar-hidden">
      <div className="flex flex-col gap-2 justify-center items-center">
        <button className="flex justify-center items-center rounded-full w-16 h-16 border-2 border-dashed border-gray-300 cursor-pointer">
          <Plus size={36} color="#5e5e5e" absoluteStrokeWidth />
        </button>
        <span className="text-xs text-gray-600 truncate w-16 text-center">
          New
        </span>
      </div>
      {stories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col gap-2 justify-center items-center"
        >
          <img
            src={story.image}
            alt={story.title}
            className="rounded-full w-16 h-16 border-gray-300 cursor-pointer object-cover"
          />
          <span className="text-xs text-gray-600 truncate w-16 text-center">
            {story.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StoryHighlights;
