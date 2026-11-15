import FoundationsCatalogue from "@/components/design-system/foundations-catalogue";
import ControlsCatalogue from "@/components/design-system/controls-catalogue";
import NavigationCatalogue from "@/components/design-system/navigation-catalogue";
import { PatternsCatalogue } from "@/components/design-system/patterns-catalogue";
import DeliveryCatalogue from "@/components/design-system/delivery-catalogue";
import { LayoutContentCatalogue } from "@/components/design-system/layout-content-catalogue";

export default function Home() {
  return <FoundationsCatalogue>
    <LayoutContentCatalogue />
    <ControlsCatalogue />
    <NavigationCatalogue />
    <PatternsCatalogue />
    <DeliveryCatalogue />
  </FoundationsCatalogue>;
}
