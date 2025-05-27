
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Developer Portfolio</h1>
          <p className="text-xl text-slate-300">Multi-theme showcase of full-stack mastery</p>
          <p className="text-sm text-slate-400 mt-4">Navigate using the menu above</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
