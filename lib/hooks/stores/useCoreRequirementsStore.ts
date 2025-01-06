'use client';

import { StateCreator, create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { CoreRequirementsState, CoreRequirementsActions, CoreCategory, CoreRequirement } from '@/types/models';

type CoreRequirementsStore = CoreRequirementsState & CoreRequirementsActions;

type CoreRequirementsPersist = (
  config: StateCreator<CoreRequirementsStore>,
  options: PersistOptions<CoreRequirementsStore>
) => StateCreator<CoreRequirementsStore>;

type SetState = (fn: (state: CoreRequirementsStore) => Partial<CoreRequirementsStore>) => void;

// Helper functions for immutable state updates
const updateCategories = (
  categories: Record<string, CoreCategory>,
  categoryId: string,
  updater: (category: CoreCategory) => CoreCategory
): Record<string, CoreCategory> => {
  const category = categories[categoryId];
  if (!category) return categories;

  return {
    ...categories,
    [categoryId]: updater(category)
  };
};

const removeFromRecord = <T>(record: Record<string, T>, keyToRemove: string): Record<string, T> => {
  const { [keyToRemove]: _, ...rest } = record;
  return rest;
};

const createCore = (name: string, requiredCredits: number): CoreRequirement => ({
  id: `core_${Date.now()}`,
  name,
  requiredCredits
});

const createCategory = (name: string, requiredCores: number): CoreCategory => ({
  id: `category_${Date.now()}`,
  name,
  cores: [],
  requiredCores
});

const updateCoreInList = (
  cores: CoreRequirement[],
  coreId: string,
  updates: Partial<CoreRequirement>
): CoreRequirement[] => {
  return cores.map(core => {
    if (core.id !== coreId) return core;
    return { ...core, ...updates };
  });
};

export const useCoreRequirementsStore = create<CoreRequirementsStore>()(
  (persist as unknown as CoreRequirementsPersist)(
    (set: SetState, get: () => CoreRequirementsStore) => {
      const store: CoreRequirementsStore = {
        categories: {},

        addCategory: (name: string, requiredCores: number) => {
          const newCategory = createCategory(name, requiredCores);
          set((state) => ({
            ...state,
            categories: {
              ...state.categories,
              [newCategory.id]: newCategory
            }
          }));
        },

        removeCategory: (id: string) => {
          set((state) => ({
            ...state,
            categories: removeFromRecord(state.categories, id)
          }));
        },

        addCoreToCategory: (categoryId: string, coreName: string, requiredCredits: number) => {
          const newCore = createCore(coreName, requiredCredits);

          set((state) => ({
            ...state,
            categories: updateCategories(state.categories, categoryId, (category) => ({
              ...category,
              cores: [...category.cores, newCore]
            }))
          }));
        },

        removeCoreFromCategory: (categoryId: string, coreId: string) => {
          set((state) => ({
            ...state,
            categories: updateCategories(state.categories, categoryId, (category) => ({
              ...category,
              cores: category.cores.filter(core => core.id !== coreId)
            }))
          }));
        },

        updateCategory: (categoryId: string, updates: Partial<CoreCategory>) => {
          set((state) => ({
            ...state,
            categories: updateCategories(state.categories, categoryId, (category) => ({
              ...category,
              ...updates
            }))
          }));
        },

        updateCoreRequirement: (categoryId: string, coreId: string, updates: Partial<CoreRequirement>) => {
          set((state) => ({
            ...state,
            categories: updateCategories(state.categories, categoryId, (category) => ({
              ...category,
              cores: updateCoreInList(category.cores, coreId, updates)
            }))
          }));
        },
      };

      return store;
    },
    {
      name: 'core-requirements-storage'
    }
  )
);