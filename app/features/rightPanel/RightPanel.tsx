import useAuxiliaryStore from "@/lib/hooks/stores/useAuxiliaryStore";
import CourseInfoDisplay from "./courseInfoDisplay/CourseInfoDisplay";

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

  return (
    <div className="w-1/4 h-full bg-white border-l border-gray-200">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        <TabButton
          isActive={activeTab === "info"}
          onClick={() => setActiveTab("info")}
        >
          Course Info
        </TabButton>
        <TabButton
          isActive={activeTab === "core"}
          onClick={() => setActiveTab("core")}
        >
          Core
        </TabButton>
        <TabButton
          isActive={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </TabButton>
      </div>

      {/* Tab Content */}
      <div className="h-[calc(100%-41px)] overflow-y-auto">
        {activeTab === "info" && <CourseInfoDisplay />}
        {activeTab === "core" && (
          <div className="p-4 text-gray-500">Core management coming soon...</div>
        )}
        {activeTab === "settings" && (
          <div className="p-4 text-gray-500">Settings panel coming soon...</div>
        )}
      </div>
    </div>
  );
}