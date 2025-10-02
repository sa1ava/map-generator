import { HiOutlineSparkles } from "react-icons/hi2";
import { Card } from "./Card";

export const EmptyPanel = () => {
  return (
    <Card title="Welcome" icon={HiOutlineSparkles}>
      <p className="text-sm font-medium">Generate a map to start editing</p>
      <p className="text-xs mt-1">
        Use the controls above to create your first map!
      </p>
    </Card>
  );
};
