
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Index = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const themes = [
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'retro-arcade', name: 'Retro Arcade' },
    { id: 'storytelling', name: 'Storytelling' },
    { id: '3d-interactive', name: '3D Interactive' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'videography', name: 'Videography' }
  ] as const;

  const handleThemeSelect = (themeId: typeof themes[number]['id']) => {
    console.log('Setting theme to:', themeId);
    setTheme(themeId);
    navigate('/about');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center text-white max-w-2xl px-4">
          <h1 className="text-5xl font-bold mb-4">Developer Portfolio</h1>
          <p className="text-xl text-slate-300 mb-8">Multi-theme showcase of full-stack mastery</p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Choose a Theme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all"
                >
                  {theme.name}
                </Button>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-slate-400">
            Theme styling will come in later phases. Select a theme to continue exploring.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
