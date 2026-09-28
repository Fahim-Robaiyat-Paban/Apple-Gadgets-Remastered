import {
  BatteryCharging,
  Cpu,
  Headphones,
  Laptop,
  Monitor,
  Music,
  Package,
  Plug,
  Refrigerator,
  Scissors,
  Smartphone,
  Speaker,
  Tablet,
  Watch,
} from "lucide-react";

const icons = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  monitor: Monitor,
  headphones: Headphones,
  watch: Watch,
  music: Music,
  speaker: Speaker,
  battery: BatteryCharging,
  plug: Plug,
  refrigerator: Refrigerator,
  scissors: Scissors,
  cpu: Cpu,
  package: Package,
};

const CategoryIcon = ({ name, className = "", strokeWidth = 1.5 }) => {
  const Icon = icons[name] ?? Package;
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
};

export default CategoryIcon;
