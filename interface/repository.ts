export interface IRepository {
  id: string;
  name: string;
  ownerId: string;
  archived: boolean;
  ownerName: string;
  role: "مالک" | "ویرایشگر" | "مشاهده‌گر";
  bookmarked: boolean;
}

export interface IFolder {
  id: string;
  repositoryId: string;
  parentId: string | null;
  name: string;
}
