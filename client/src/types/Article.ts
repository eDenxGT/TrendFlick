export interface Article {
  articleId: string;
  title: string;
  description: string;
  image: string;
  categoryId: string;
  createdBy: string;
  upVotes: string[];
  downVotes: string[];
  blockedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}
