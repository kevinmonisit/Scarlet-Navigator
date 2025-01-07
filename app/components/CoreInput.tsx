import { KeyboardEvent } from 'react';

interface CoreInputProps {
  currentCore: string;
  setCurrentCore: (value: string) => void;
  selectedCores: string[];
  setSelectedCores: (cores: string[]) => void;
  globalCores: Set<string>;
  placeholder?: string;
  label?: string;
}

export default function CoreInput({
  currentCore,
  setCurrentCore,
  selectedCores,
  setSelectedCores,
  globalCores,
  placeholder = 'Type a core and press Enter',
  label = 'Cores:',
}: CoreInputProps) {
  const handleCoreKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCore.trim()) {
      e.preventDefault();
      const newCore = currentCore.trim().toUpperCase();
      if (!selectedCores.includes(newCore)) {
        setSelectedCores([...selectedCores, newCore]);
      }
      setCurrentCore('');
    }
  };

  const removeCore = (coreToRemove: string) => {
    setSelectedCores(selectedCores.filter((core) => core !== coreToRemove));
  };

  const addCore = (core: string) => {
    if (!selectedCores.includes(core)) {
      setSelectedCores([...selectedCores, core]);
    }
  };

  // Get all available cores that aren't selected
  const availableCores = Array.from(globalCores).filter(
    (core) => !selectedCores.includes(core)
  );

  return (
    <div className='space-y-4'>
      <div>
        <label className='mb-1 block text-sm font-medium'>
          {label}
          <div className='flex gap-2'>
            <input
              type='text'
              value={currentCore}
              onChange={(e) => setCurrentCore(e.target.value.toUpperCase())}
              onKeyDown={handleCoreKeyDown}
              className='mt-1 w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-center uppercase shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
              placeholder='XXX'
            />
            <button
              type='button'
              onClick={() => {
                if (currentCore.trim()) {
                  const newCore = currentCore.trim().toUpperCase();
                  if (!selectedCores.includes(newCore)) {
                    setSelectedCores([...selectedCores, newCore]);
                  }
                  setCurrentCore('');
                }
              }}
              className='mt-1 rounded-md bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
            >
              Add
            </button>
          </div>
        </label>
      </div>

      {selectedCores.length > 0 && (
        <div>
          <p className='mb-2 text-sm text-gray-600'>Current Cores:</p>
          <div className='flex flex-wrap gap-2'>
            {selectedCores.map((core) => (
              <span
                key={core}
                className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'
              >
                {core}
                <button
                  type='button'
                  onClick={() => removeCore(core)}
                  className='ml-1 text-blue-400 hover:text-blue-600'
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {availableCores.length > 0 && (
        <div>
          <p className='mb-2 text-sm text-gray-600'>
            Other Cores You Could Add:
          </p>
          <div className='flex flex-wrap gap-2'>
            {availableCores.map((core) => (
              <button
                key={core}
                onClick={() => addCore(core)}
                className='inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-200'
              >
                {core}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedCores.some((core) => !globalCores.has(core)) && (
        <div>
          <p className='mb-2 text-sm text-gray-600'>New Cores:</p>
          <div className='flex flex-wrap gap-2'>
            {selectedCores
              .filter((core) => !globalCores.has(core))
              .map((core) => (
                <span
                  key={core}
                  className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'
                >
                  {core}
                  <button
                    type='button'
                    onClick={() => removeCore(core)}
                    className='ml-1 text-green-400 hover:text-green-600'
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
