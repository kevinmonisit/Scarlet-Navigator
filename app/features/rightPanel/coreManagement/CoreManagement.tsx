'use client';

import { useState } from 'react';
import { useCoreRequirementsStore } from '@/lib/hooks/stores/useCoreRequirementsStore';
import { useCoreRequirements } from '@/lib/hooks/useCoreRequirements';
import { CoreCategory } from '@/types/models';

interface AddCategoryFormProps {
  onSubmit: (name: string, requiredCores: number) => void;
}

function AddCategoryForm({ onSubmit }: AddCategoryFormProps) {
  const [name, setName] = useState('');
  const [requiredCores, setRequiredCores] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    onSubmit(name, requiredCores);
    setName('');
    setRequiredCores(1);
  };

  const isFormValid = () => {
    return name.trim() !== '' && requiredCores > 0;
  };

  const getMissingFields = () => {
    const missing = [];
    if (!name.trim()) missing.push('Category Name');
    if (!(requiredCores > 0)) missing.push('Required Cores');
    return missing;
  };

  const getTooltipText = () => {
    const missing = getMissingFields();
    if (missing.length === 0) return '';
    return `Please fill out: ${missing.join(', ')}`;
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Required Cores</label>
        <input
          type="number"
          min="1"
          value={requiredCores}
          onChange={(e) => setRequiredCores(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="relative">
        <button
          type="submit"
          disabled={!isFormValid()}
          onMouseEnter={() => !isFormValid() && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isFormValid()
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Add Category
        </button>
        {showTooltip && !isFormValid() && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap">
            {getTooltipText()}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="border-8 border-transparent border-t-gray-900" />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

interface AddCoreFormProps {
  categoryId: string;
  onSubmit: (categoryId: string, name: string, requiredCredits: number) => void;
}

function AddCoreForm({ categoryId, onSubmit }: AddCoreFormProps) {
  const [name, setName] = useState('');
  const [requiredCredits, setRequiredCredits] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(categoryId, name.trim().toUpperCase(), requiredCredits);
    setName('');
    setRequiredCredits(3);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 p-4 bg-gray-50 rounded-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Core Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Required Credits</label>
        <input
          type="number"
          min="1"
          value={requiredCredits}
          onChange={(e) => setRequiredCredits(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Core
      </button>
    </form>
  );
}

interface CategoryItemProps {
  category: CoreCategory;
  progress: {
    satisfiedCores: number;
    requiredCores: number;
    cores: Record<string, { currentCredits: number; requiredCredits: number }>;
  };
  onAddCore: (categoryId: string, name: string, requiredCredits: number) => void;
  onRemoveCategory: (id: string) => void;
  onRemoveCore: (categoryId: string, coreId: string) => void;
}

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
}

function EditableText({ value, onSave, className = "" }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editValue.trim()) {
        onSave(editValue);
        setIsEditing(false);
      }
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (editValue.trim()) {
      onSave(editValue);
    } else {
      setEditValue(value);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 ${className}`}
        autoFocus
        size={6}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer hover:bg-gray-100 rounded px-2 py-1 inline-block w-14 truncate ${className}`}
    >
      {value}
    </span>
  );
}

function CategoryItem({ category, progress, onAddCore, onRemoveCategory, onRemoveCore }: CategoryItemProps) {
  const [isAddingCore, setIsAddingCore] = useState(false);
  const updateCategory = useCoreRequirementsStore((state) => state.updateCategory);
  const updateCoreRequirement = useCoreRequirementsStore((state) => state.updateCoreRequirement);

  const handleCategoryNameChange = (newName: string) => {
    updateCategory(category.id, { name: newName });
  };

  const handleCoreNameChange = (coreId: string, newName: string) => {
    updateCoreRequirement(category.id, coreId, { name: newName.trim().toUpperCase() });
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveCategory(category.id);
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 mb-4">
      <input type="checkbox" className="w-auto h-auto" defaultChecked />
      <div className="collapse-title relative">
        <div className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-medium flex items-center">
            <EditableText
              value={category.name}
              onSave={handleCategoryNameChange}
              className="text-lg font-medium"
            />
            <span className="ml-2">
              ({progress.satisfiedCores}/{progress.requiredCores} satisfied)
            </span>
          </h3>
        </div>
        <button
          onClick={handleRemoveClick}
          className="btn btn-ghost btn-sm text-error absolute right-8 top-1/2 -translate-y-1/2 z-10"
        >
          Remove
        </button>
      </div>
      <div className="collapse-content">
        <div className="space-y-2 pt-2">
          {category.cores.map((core) => (
            <div key={core.id} className="flex justify-between items-center p-2 bg-base-100 rounded-lg">
              <span className="flex-1">
                <EditableText
                  value={core.name}
                  onSave={(newName) => handleCoreNameChange(core.id, newName)}
                />
                <span className="ml-2">
                  ({progress.cores[core.id]?.currentCredits ?? 0}/{core.requiredCredits} credits)
                </span>
              </span>
              <button
                onClick={() => onRemoveCore(category.id, core.id)}
                className="btn btn-ghost btn-sm text-error"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {isAddingCore ? (
          <AddCoreForm
            categoryId={category.id}
            onSubmit={(categoryId, name, credits) => {
              onAddCore(categoryId, name, credits);
              setIsAddingCore(false);
            }}
          />
        ) : (
          <button
            onClick={() => setIsAddingCore(true)}
            className="btn btn-ghost btn-block mt-4"
          >
            Add Core
          </button>
        )}
      </div>
    </div>
  );
}

export default function CoreManagement() {
  const {
    categories,
    addCategory,
    removeCategory,
    addCoreToCategory,
    removeCoreFromCategory
  } = useCoreRequirementsStore();

  const { calculateAllProgress } = useCoreRequirements();
  const progress = calculateAllProgress();

  return (
    <div className="h-full overflow-y-auto">
      <AddCategoryForm onSubmit={addCategory} />
      <div className="p-4 space-y-4">
        {Object.values(categories).map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            progress={progress[category.id]}
            onAddCore={addCoreToCategory}
            onRemoveCategory={removeCategory}
            onRemoveCore={removeCoreFromCategory}
          />
        ))}
      </div>
    </div>
  );
}