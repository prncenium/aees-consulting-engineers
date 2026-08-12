import {
  Activity,
  Building2,
  CircuitBoard,
  ClipboardList,
  FileText,
  HardHat,
  Landmark,
  Layers,
  Leaf,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Route,
  Satellite,
  Scale,
  ShieldCheck,
  TriangleAlert,
  Users,
  Waves,
  Waypoints,
} from 'lucide-react';

/**
 * Data files reference icons by name so content stays free of imports.
 * Add a new icon here and it becomes available to every data file.
 */
export const icons = {
  Activity,
  Building2,
  CircuitBoard,
  ClipboardList,
  FileText,
  HardHat,
  Landmark,
  Layers,
  Leaf,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Route,
  Satellite,
  Scale,
  ShieldCheck,
  TriangleAlert,
  Users,
  Waves,
  Waypoints,
};

/** Resolve an icon name to a component, falling back to a neutral mark. */
export function getIcon(name) {
  return icons[name] ?? Route;
}

export default icons;
