import { HiOutlineTag } from "react-icons/hi2";
import { useEditStore } from "../stores/editStore";
import { useMapStore } from "../stores/mapStore";
import { Card } from "./Card";
import { EmptyPanel } from "./EmptyPanel";
import { ToolSelector } from "./ToolSelector";

export const EditPanel = () => {
  const { grid } = useMapStore();
  const { editMode, setEditMode } = useEditStore();

  if (!grid) return <EmptyPanel />;

  return (
    <Card title="Edit tools" icon={HiOutlineTag} className="min-w-[19rem]">
      {/* セレクタ */}
      <ToolSelector editMode={editMode} setEditMode={setEditMode} />
    </Card>
  );
};
