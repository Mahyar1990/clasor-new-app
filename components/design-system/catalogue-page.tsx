import FoundationsCatalogue from "@/components/design-system/foundations-catalogue";
import ControlsCatalogue from "@/components/design-system/controls-catalogue";
import NavigationCatalogue from "@/components/design-system/navigation-catalogue";
import { AdminPanelCatalogue } from "./admin-panel-catalogue";
import { OrganizationMembershipCatalogue } from "./organization-membership-catalogue";
import { DomainInputsCatalogue } from "./domain-controls-catalogue";
import { DomainPatternsCatalogue } from "./domain-patterns-catalogue";
import { DataCatalogue, PatternsCatalogue } from "@/components/design-system/patterns-catalogue";
import DeliveryCatalogue from "@/components/design-system/delivery-catalogue";
import { LayoutContentCatalogue } from "@/components/design-system/layout-content-catalogue";
import type { CatalogueSection } from "@/components/design-system/catalogue-sections";
import { ClasorAdministrationParityCatalogue, ClasorLayoutParityCatalogue, ClasorLibraryParityCatalogue, ClasorPublishParityCatalogue } from "./clasor-parity-catalogue";

export function CataloguePage({ section }: { section: CatalogueSection }) {
  return <FoundationsCatalogue key={section} section={section}>
    {section === "layout" && <><LayoutContentCatalogue /><ClasorLayoutParityCatalogue /></>}
    {(section === "buttons" || section === "inputs" || section === "status") && <ControlsCatalogue section={section} />}
    {(section === "navigation" || section === "feedback" || section === "overlays") && <NavigationCatalogue section={section} />}
    {section === "inputs" && <DomainInputsCatalogue />}
    {section === "data" && <><AdminPanelCatalogue /><DataCatalogue /><ClasorLibraryParityCatalogue /></>}
    {section === "navigation" && <ClasorPublishParityCatalogue />}
    {section === "patterns" && <><OrganizationMembershipCatalogue /><DomainPatternsCatalogue /><PatternsCatalogue /><ClasorAdministrationParityCatalogue /></>}
    {(section === "accessibility" || section === "handoff") && <DeliveryCatalogue section={section} />}
  </FoundationsCatalogue>;
}
