import {
  Hand,
  Sunrise,
  Sun,
  Sunset,
  HeartHandshake,
  Contact,
  MapPin,
  Cake,
  Briefcase,
  HelpCircle,
  ClipboardList,
  Receipt,
  Star,
  UtensilsCrossed,
  Ticket,
  Compass,
  CornerUpLeft,
  Plane,
  Tag,
  Ruler,
  Eye,
  Shirt,
  ShoppingBag,
  MessageCircle,
  CloudSun,
  ThumbsUp,
  Ear,
  CheckCircle2,
  BookOpen,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  hand: Hand,
  sunrise: Sunrise,
  sun: Sun,
  sunset: Sunset,
  handshake: HeartHandshake,
  idcard: Contact,
  mappin: MapPin,
  cake: Cake,
  briefcase: Briefcase,
  help: HelpCircle,
  menu: ClipboardList,
  receipt: Receipt,
  star: Star,
  hungry: UtensilsCrossed,
  ticket: Ticket,
  compass: Compass,
  turn: CornerUpLeft,
  plane: Plane,
  tag: Tag,
  ruler: Ruler,
  eye: Eye,
  shirt: Shirt,
  bag: ShoppingBag,
  chat: MessageCircle,
  weather: CloudSun,
  thumbsup: ThumbsUp,
  ear: Ear,
  agree: CheckCircle2,
};

export default function VocabularyIcon({
  iconKey,
  className = "h-6 w-6",
}: {
  iconKey: string;
  className?: string;
}) {
  const Icon = iconMap[iconKey] ?? BookOpen;
  return <Icon className={className} />;
}
