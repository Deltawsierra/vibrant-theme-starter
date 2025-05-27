
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CameraPosition {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
}

export interface InteractiveObject {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  isHighlighted: boolean;
  isVisible: boolean;
}

interface ThreeDContextType {
  cameraPosition: CameraPosition;
  interactiveObjects: InteractiveObject[];
  isMinimapVisible: boolean;
  selectedObjectId: string | null;
  setCameraPosition: (position: Partial<CameraPosition>) => void;
  resetCamera: () => void;
  toggleMinimap: () => void;
  highlightObject: (objectId: string) => void;
  selectObject: (objectId: string | null) => void;
  addInteractiveObject: (object: Omit<InteractiveObject, 'isHighlighted' | 'isVisible'>) => void;
  removeInteractiveObject: (objectId: string) => void;
}

const ThreeDContext = createContext<ThreeDContextType | undefined>(undefined);

const DEFAULT_CAMERA_POSITION: CameraPosition = {
  x: 0,
  y: 0,
  z: 5,
  rotationX: 0,
  rotationY: 0
};

interface ThreeDProviderProps {
  children: React.ReactNode;
}

export const ThreeDProvider: React.FC<ThreeDProviderProps> = ({ children }) => {
  const [cameraPosition, setCameraPositionState] = useState<CameraPosition>(DEFAULT_CAMERA_POSITION);
  const [interactiveObjects, setInteractiveObjects] = useState<InteractiveObject[]>([]);
  const [isMinimapVisible, setIsMinimapVisible] = useState(true);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const setCameraPosition = useCallback((position: Partial<CameraPosition>) => {
    setCameraPositionState(prev => ({ ...prev, ...position }));
  }, []);

  const resetCamera = useCallback(() => {
    setCameraPositionState(DEFAULT_CAMERA_POSITION);
    setSelectedObjectId(null);
  }, []);

  const toggleMinimap = useCallback(() => {
    setIsMinimapVisible(prev => !prev);
  }, []);

  const highlightObject = useCallback((objectId: string) => {
    setInteractiveObjects(prev => 
      prev.map(obj => ({
        ...obj,
        isHighlighted: obj.id === objectId
      }))
    );
  }, []);

  const selectObject = useCallback((objectId: string | null) => {
    setSelectedObjectId(objectId);
  }, []);

  const addInteractiveObject = useCallback((object: Omit<InteractiveObject, 'isHighlighted' | 'isVisible'>) => {
    const newObject: InteractiveObject = {
      ...object,
      isHighlighted: false,
      isVisible: true
    };
    setInteractiveObjects(prev => [...prev, newObject]);
  }, []);

  const removeInteractiveObject = useCallback((objectId: string) => {
    setInteractiveObjects(prev => prev.filter(obj => obj.id !== objectId));
  }, []);

  const contextValue: ThreeDContextType = {
    cameraPosition,
    interactiveObjects,
    isMinimapVisible,
    selectedObjectId,
    setCameraPosition,
    resetCamera,
    toggleMinimap,
    highlightObject,
    selectObject,
    addInteractiveObject,
    removeInteractiveObject
  };

  return (
    <ThreeDContext.Provider value={contextValue}>
      {children}
    </ThreeDContext.Provider>
  );
};

export const useThreeD = (): ThreeDContextType => {
  const context = useContext(ThreeDContext);
  if (!context) {
    throw new Error('useThreeD must be used within a ThreeDProvider');
  }
  return context;
};
