
import Navigation from "@/components/Navigation";

const Showcase = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Showcase</h1>
          <p className="text-lg text-gray-600">Showcase page placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
