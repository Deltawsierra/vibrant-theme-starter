
import { useTheme } from "@/context/ThemeContext";
import Navigation from "@/components/Navigation";

const About = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">About</h1>
          <p className="text-lg text-gray-600 mb-4">About page placeholder</p>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Current theme:</p>
            <p className="text-lg font-semibold text-gray-800 capitalize">
              {currentTheme.replace('-', ' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
