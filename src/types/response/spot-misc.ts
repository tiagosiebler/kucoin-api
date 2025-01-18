export interface Announcement {
  annId: number;
  annTitle: string;
  annType: string[];
  annDesc: string;
  cTime: number;
  language: string;
  annUrl: string;
}

export interface Announcements {
  totalNum: number;
  currentPage: number;
  pageSize: number;
  totalPage: number;
  items: Announcement[];
}
