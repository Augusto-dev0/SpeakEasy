import { Hand, UserRound, UtensilsCrossed, Plane, ShoppingBag, MessagesSquare, BookOpen, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  greetings: Hand,
  introductions: UserRound,
  food: UtensilsCrossed,
  travel: Plane,
  shopping: ShoppingBag,
  smalltalk: MessagesSquare,
};

export default function LessonIcon({
  lessonId,
  className = "h-5 w-5",
}: {
  lessonId: string;
  className?: string;
}) {
  const Icon = iconMap[lessonId] ?? BookOpen;
  return <Icon className={className} />;
}
