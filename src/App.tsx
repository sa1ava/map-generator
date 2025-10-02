import { EditPanel } from "./components/EditPanel";
import { Header } from "./components/Header";
import { MapDisplay } from "./components/MapDisplay";
import { Sidebar } from "./components/Sidebar";
import { useUIStore } from "./stores/uiStore";

function App() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="min-h-screen h-screen bg-gray-100 flex overflow-hidden">
      <Sidebar />

      {/* オーバーレイ */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Open sidebar"
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col min-h-screen">
        <Header />

        {/* マップ表示 */}
        <div className="flex-1 overflow-y-scroll p-6 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0 lg:min-w-[600px]">
              <MapDisplay />
            </div>
            <EditPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
