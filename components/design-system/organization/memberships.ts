import type { OrganizationState, OrganizationPosition } from "./model";
import { normalizeDomainText, uniqueUsername } from "../domain/queries";
export const organizationUsername = (value: string) => value.trim().replace(/^@/, "").toLowerCase();
type NewId = () => string;
const newId: NewId = () => crypto.randomUUID();
function requirePosition(state: OrganizationState, branchId: string, positionId: string) {
  if (!state.branches.some(branch => branch.id === branchId) || !state.positions.some(position => position.id === positionId && position.branchId === branchId)) throw new Error("یک سمت معتبر از همین شعبه انتخاب کنید.");
}
/** Replace a position's users atomically; deselection revokes that branch membership. */
export function replacePositionMembers(state: OrganizationState, position: OrganizationPosition, usernames: string[], makeId: NewId = newId): OrganizationState {
  requirePosition(state, position.branchId, position.id);
  const names = usernames.map(organizationUsername);
  if (names.some(name => !uniqueUsername(name, []))) throw new Error("نام کاربری پادی معتبر وارد کنید.");
  if (new Set(names).size !== names.length) throw new Error("نام کاربری تکراری در فهرست اعضا وجود دارد.");
  const wanted = new Set(names);
  const found = new Set<string>();
  const members = state.members.flatMap(member => {
    if (member.branchId !== position.branchId) return [member];
    const username = organizationUsername(member.user.username);
    if (wanted.has(username)) { found.add(username); return [member.positionId === position.id ? member : { ...member, positionId: position.id }]; }
    return member.positionId === position.id ? [] : [member];
  });
  for (const username of names.filter(name => !found.has(name))) {
    const known = state.members.find(member => organizationUsername(member.user.username) === username)?.user;
    members.push({ id: makeId(), branchId: position.branchId, positionId: position.id, user: known ?? { id: makeId(), name: username, username } });
  }
  return { ...state, members };
}
export function saveOrganizationPosition(state: OrganizationState, position: OrganizationPosition, usernames?: string[], makeId: NewId = newId): OrganizationState {
  if (!state.branches.some(branch => branch.id === position.branchId)) throw new Error("شعبه در دسترس نیست.");
  const existing = state.positions.find(item => item.id === position.id);
  if (existing && existing.branchId !== position.branchId) throw new Error("سمت متعلق به این شعبه نیست.");
  if (!position.name.trim() || state.positions.some(item => item.branchId === position.branchId && item.id !== position.id && normalizeDomainText(item.name) === normalizeDomainText(position.name))) throw new Error("نام سمت باید غیرخالی و در این شعبه غیرتکراری باشد.");
  const saved = { ...position, name: position.name.trim() };
  const next = { ...state, positions: existing ? state.positions.map(item => item.id === position.id ? saved : item) : [...state.positions, saved] };
  return usernames === undefined ? next : replacePositionMembers(next, saved, usernames, makeId);
}
export function saveOrganizationMember(state: OrganizationState, branchId: string, username: string, positionId: string, memberId?: string, makeId: NewId = newId): OrganizationState {
  requirePosition(state, branchId, positionId);
  if (memberId) {
    if (!state.members.some(member => member.id === memberId && member.branchId === branchId)) throw new Error("عضو در این شعبه وجود ندارد.");
    return { ...state, members: state.members.map(member => member.id === memberId ? { ...member, positionId } : member) };
  }
  const name = organizationUsername(username);
  if (!uniqueUsername(name, state.members.filter(member => member.branchId === branchId).map(member => member.user.username))) throw new Error("نام کاربری پادی معتبر و غیرتکراری وارد کنید.");
  const known = state.members.find(member => organizationUsername(member.user.username) === name)?.user;
  return { ...state, members: [...state.members, { id: makeId(), branchId, positionId, user: known ?? { id: makeId(), name, username: name } }] };
}
export function removeOrganizationPosition(state: OrganizationState, branchId: string, positionId: string): OrganizationState {
  requirePosition(state, branchId, positionId);
  if (state.members.some(member => member.branchId === branchId && member.positionId === positionId)) throw new Error("ابتدا اعضای این سمت را منتقل یا دسترسی آن‌ها را حذف کنید.");
  return { ...state, positions: state.positions.filter(position => position.id !== positionId) };
}
