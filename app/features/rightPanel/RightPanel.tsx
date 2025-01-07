import { useTransition } from "react";
import useAuxiliaryStore from "@/lib/hooks/stores/useAuxiliaryStore";
import InfoDisplay from "./courseInfoDisplay/InfoDisplay";
import CoreManagement from "./coreManagement/CoreManagement";

type Tab = "info" | "core" | "settings";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-4 text-sm font-medium ${isActive
        ? "border-b-2 border-blue-500 text-blue-600"
        : "text-gray-500 hover:text-gray-700"
        }`}
    >
      {children}
    </button>
  );
}

export default function RightPanel() {
  const activeTab = useAuxiliaryStore((state) => state.activeTab);
  const setActiveTab = useAuxiliaryStore((state) => state.setActiveTab);
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: Tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div className="h-full w-full bg-white border-l border-gray-200">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        <TabButton
          isActive={activeTab === "info"}
          onClick={() => handleTabChange("info")}
        >
          Info
        </TabButton>
        <TabButton
          isActive={activeTab === "core"}
          onClick={() => handleTabChange("core")}
        >
          Core
        </TabButton>
        <TabButton
          isActive={activeTab === "settings"}
          onClick={() => handleTabChange("settings")}
        >
          Settings
        </TabButton>
      </div>

      {/* Tab Content */}
      <div className="h-[calc(100%-41px)] overflow-y-auto">
        <div className={`transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          {activeTab === "info" && <InfoDisplay />}
          {activeTab === "core" && <CoreManagement />}
          {activeTab === "settings" && (
            <div className="p-4 text-gray-500">Settings panel coming soon...</div>
          )}
        </div>
      </div>
    </div>
  );
}