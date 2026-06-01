/**
 * Registro central de iconos (lucide-react) referenciados por nombre desde
 * el catálogo de sectores y los cuestionarios. Permite que el contenido del
 * dominio sea data pura (`iconName: string`) sin importar componentes.
 *
 * Para usar un icono nuevo en un cuestionario: añádelo aquí (debe existir en
 * lucide-react) y referencia su nombre como string.
 */

import {
  Banknote, Settings, ShieldAlert, Users, Megaphone, Gavel, Cpu,
  Route, Satellite, Handshake, PackageCheck, BusFront, Boxes, Warehouse, FileCheck,
  Sprout, Factory, Zap, Truck, ShoppingCart, Landmark, Hotel, HeartPulse, Building2,
  Wheat, Fish, Pickaxe, Fuel, FlaskConical, Pill, Shirt, Car, Newspaper, HardHat,
  Droplet, Droplets, Recycle, Leaf, Store, Wrench, Stethoscope, Microscope,
  GraduationCap, Dumbbell, Scissors, Dog, Lock, Camera, Tv, Plane, UtensilsCrossed,
  Palette, Server, Wifi, Globe, CreditCard, PiggyBank, Home, Briefcase, ShieldCheck,
  Scale, Cross, Anchor, Ship, Container, ClipboardList, TrendingUp, Target, Lightbulb,
  BookOpen, Beaker, Hammer, Coins, Building, Network, Database, Phone, Radio, Film,
  Music, Utensils, Bed, MapPin, Calendar, Siren, Bone, TestTube, Tractor, Thermometer,
  Snowflake, Stamp, Receipt, LineChart, BarChart3, Cog, Flame, TreePine, Egg, Beef,
} from 'lucide-react';

export type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export const ICONS: Record<string, IconComponent> = {
  Banknote, Settings, ShieldAlert, Users, Megaphone, Gavel, Cpu,
  Route, Satellite, Handshake, PackageCheck, BusFront, Boxes, Warehouse, FileCheck,
  Sprout, Factory, Zap, Truck, ShoppingCart, Landmark, Hotel, HeartPulse, Building2,
  Wheat, Fish, Pickaxe, Fuel, FlaskConical, Pill, Shirt, Car, Newspaper, HardHat,
  Droplet, Droplets, Recycle, Leaf, Store, Wrench, Stethoscope, Microscope,
  GraduationCap, Dumbbell, Scissors, Dog, Lock, Camera, Tv, Plane, UtensilsCrossed,
  Palette, Server, Wifi, Globe, CreditCard, PiggyBank, Home, Briefcase, ShieldCheck,
  Scale, Cross, Anchor, Ship, Container, ClipboardList, TrendingUp, Target, Lightbulb,
  BookOpen, Beaker, Hammer, Coins, Building, Network, Database, Phone, Radio, Film,
  Music, Utensils, Bed, MapPin, Calendar, Siren, Bone, TestTube, Tractor, Thermometer,
  Snowflake, Stamp, Receipt, LineChart, BarChart3, Cog, Flame, TreePine, Egg, Beef,
};

/** Resuelve un icono por nombre, con respaldo genérico. */
export function getIcon(name: string): IconComponent {
  return ICONS[name] ?? Building2;
}

/** Lista de nombres de icono válidos (para validar contenido de cuestionarios). */
export const ICON_NAMES: string[] = Object.keys(ICONS);
