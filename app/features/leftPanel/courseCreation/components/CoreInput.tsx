import { KeyboardEvent } from "react";

interface CoreInputProps {
  currentCore: string;
  setCurrentCore: (value: string) => void;
  selectedCores: string[];
  setSelectedCores: (cores: string[]) => void;
  globalCores: Set<string>;
}

export default function CoreInput({
  currentCore,
  setCurrentCore,
  selectedCores,
  setSelectedCores,
  globalCores,
}: CoreInputProps) {
  const handleCoreKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCore.trim()) {
      e.preventDefault();
      const newCore = currentCore.trim().toUpperCase();
      if (!selectedCores.includes(newCore)) {
        setSelectedCores([...selectedCores, newCore]);
      }
      setCurrentCore("");
    }
  };

  const removeCore = (coreToRemove: string) => {
    setSelectedCores(selectedCores.filter(core => core !== coreToRemove));
  };

  // Split cores into existing and new
  const existingCores = selectedCores.filter(core => globalCores.has(core));
  const newCores = selectedCores.filter(core => !globalCores.has(core));

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Cores:
        <input
          type="text"
          value={currentCore}
          onChange={(e) => setCurrentCore(e.target.value)}
          onKeyDown={handleCoreKeyDown}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Type a core and press Enter"
        />
      </label>

      {existingCores.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Existing Cores:</p>
          <div className="flex flex-wrap gap-2">
            {existingCores.map((core) => (
              <span
                key={core}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {core}
                <button
                  type="button"
                  onClick={() => removeCore(core)}
                  className="ml-1 text-blue-400 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {newCores.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">New Cores:</p>
          <div className="flex flex-wrap gap-2">
            {newCores.map((core) => (
              <span
                key={core}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {core}
                <button
                  type="button"
                  onClick={() => removeCore(core)}
                  className="ml-1 text-green-400 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}