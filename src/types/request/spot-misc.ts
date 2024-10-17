export interface GetAnnouncementsRequest {
  currentPage?: number;
  pageSize?: number;
  annType?: string;
  lang?: string;
  startTime?: number;
  endTime?: number;
}
