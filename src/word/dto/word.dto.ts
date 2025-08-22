export interface CreateWordDTO {
  english: string;
  korean: string;
  isHighlight?: boolean;
}

export interface UpdateWordDTO {
  english?: string;
  korean?: string;
}
