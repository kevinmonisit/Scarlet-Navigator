'use client';

import { useState } from 'react';
import { useCoreRequirementsStore } from '@/lib/hooks/stores/useCoreRequirementsStore';
import { useCoreRequirements } from '@/lib/hooks/useCoreRequirements';
import { CoreCategory } from '@/types/models';

interface AddCategoryFormProps {
  onSubmit: (name: string) => void;
}

function AddCategoryForm({ onSubmit }: AddCategoryFormProps) {
  const [name, setName] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    onSubmit(name);
    setName('');
  };

  const isFormValid = () => {
    return name.trim() !== '';
  };

  const getMissingFields = () => {
    const missing = [];
    if (!name.trim()) missing.push('Category Name');
    return missing;
  };

  const getTooltipText = () => {
    const missing = getMissingFields();
    if (missing.length === 0) return '';
    return `Please fill out: ${missing.join(', ')}`;
  };

  return (
    <form onSubmit={handleSubmit} className='border-b border-gray-200 p-4'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Category Name
        </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          required
        />
      </div>
      <div className='relative'>
        <button
          type='submit'
          disabled={!isFormValid()}
          onMouseEnter={() => !isFormValid() && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isFormValid()
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
        >
          Add Category
        </button>
        {showTooltip && !isFormValid() && (
          <div className='absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-sm text-white'>
            {getTooltipText()}
            <div className='absolute left-1/2 top-full -mt-1 -translate-x-1/2 transform'>
              <div className='border-8 border-transparent border-t-gray-900' />
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
    <form onSubmit={handleSubmit} className='mt-2 rounded-md bg-gray-50 p-4'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Core Name
        </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Required Credits
        </label>
        <input
          type='number'
          min='1'
          value={requiredCredits}
          onChange={(e) => setRequiredCredits(parseInt(e.target.value))}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          required
        />
      </div>
      <button
        type='submit'
        className='w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
  onAddCore: (
    categoryId: string,
    name: string,
    requiredCredits: number
  ) => void;
  onRemoveCategory: (id: string) => void;
  onRemoveCore: (categoryId: string, coreId: string) => void;
}

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
}

function EditableText({ value, onSave, className = '' }: EditableTextProps) {
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
        type='text'
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onClick={(e) => e.stopPropagation()}
        className={`w-24 rounded border border-blue-500 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        autoFocus
        size={6}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`inline-block w-14 cursor-pointer truncate rounded px-2 py-1 hover:bg-gray-100 ${className}`}
    >
      {value}
    </span>
  );
}

function CategoryItem({
  category,
  progress,
  onAddCore,
  onRemoveCategory,
  onRemoveCore,
}: CategoryItemProps) {
  const [isAddingCore, setIsAddingCore] = useState(false);
  const updateCategory = useCoreRequirementsStore(
    (state) => state.updateCategory
  );
  const updateCoreRequirement = useCoreRequirementsStore(
    (state) => state.updateCoreRequirement
  );

  const handleCategoryNameChange = (newName: string) => {
    updateCategory(category.id, { name: newName });
  };

  const handleCoreNameChange = (coreId: string, newName: string) => {
    updateCoreRequirement(category.id, coreId, {
      name: newName.trim().toUpperCase(),
    });
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveCategory(category.id);
  };

  return (
    <div className='collapse collapse-arrow mb-4 bg-base-200'>
      <input type='checkbox' className='h-auto w-auto' defaultChecked />
      <div className='collapse-title relative'>
        <div
          className='flex items-center justify-between'
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className='flex items-center text-lg font-medium'>
            <EditableText
              value={category.name}
              onSave={handleCategoryNameChange}
              className='text-lg font-medium'
            />
            <span className='ml-2'>
              ({progress.satisfiedCores}/{progress.requiredCores} satisfied)
            </span>
          </h3>
        </div>
        <button
          onClick={handleRemoveClick}
          className='btn btn-ghost btn-sm absolute right-8 top-1/2 z-10 -translate-y-1/2 text-error'
        >
          Remove
        </button>
      </div>
      <div className='collapse-content'>
        <div className='space-y-2 pt-2'>
          {category.cores.map((core) => (
            <div
              key={core.id}
              className='flex items-center justify-between rounded-lg bg-base-100 p-2'
            >
              <span className='flex-1'>
                <EditableText
                  value={core.name}
                  onSave={(newName) => handleCoreNameChange(core.id, newName)}
                />
                <span className='ml-2'>
                  ({progress.cores[core.id]?.currentCredits ?? 0}/
                  {core.requiredCredits} credits)
                </span>
              </span>
              <button
                onClick={() => onRemoveCore(category.id, core.id)}
                className='btn btn-ghost btn-sm text-error'
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
            className='btn btn-ghost btn-block mt-4'
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
    removeCoreFromCategory,
  } = useCoreRequirementsStore();

  const { calculateAllProgress } = useCoreRequirements();
  const progress = calculateAllProgress();

  const handleAddCategory = (name: string) => {
    addCategory(name);
  };

  return (
    <div className='h-full overflow-y-auto'>
      <AddCategoryForm onSubmit={handleAddCategory} />
      <div className='space-y-4 p-4'>
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
