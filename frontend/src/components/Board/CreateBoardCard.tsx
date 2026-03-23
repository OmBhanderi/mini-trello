import { Card, CardContent } from "@/src/components/ui/card";
import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

const CreateBoardCard = ({ onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer border-dashed flex items-center justify-center hover:bg-gray-50"
    >
      <CardContent className="flex items-center gap-2 p-6 text-gray-600">
        <Plus size={18} />
        Create Board
      </CardContent>
    </Card>
  );
};

export default CreateBoardCard;