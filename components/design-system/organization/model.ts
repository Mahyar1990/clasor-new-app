export interface OrganizationBranch { id: string; name: string; parentId?: string }
export interface OrganizationPosition { id: string; branchId: string; name: string }
export interface OrganizationUser { id: string; name: string; username: string; avatar?: string }
export interface OrganizationMember { id: string; branchId: string; user: OrganizationUser; positionId?: string }
export interface OrganizationState { branches: OrganizationBranch[]; positions: OrganizationPosition[]; members: OrganizationMember[] }
