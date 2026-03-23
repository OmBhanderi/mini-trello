import { Card, CardContent } from "@src/components/ui/card";

type Props = {
  title: string;
  onClick: () => void;
};

const BoardCard = ({ title, onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition"
    >
      <CardContent className="p-4 font-medium">
        {title}
      </CardContent>
    </Card>
  );
};

export default BoardCard;