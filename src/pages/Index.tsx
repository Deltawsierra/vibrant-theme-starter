
import Navigation from "@/components/Navigation";
import ThemeSelector from "@/components/ThemeSelector";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full">
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
};

export default Index;
