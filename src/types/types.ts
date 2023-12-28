export interface CategoryType {
  id: number;
  title: string;
  background_color: string;
  text_color: string;
}

export interface BlogType {
  id: number;
  author: string;
  title: string;
  description: string;
  categories: CategoryType[];
  publish_date: string;
  image: string;
  email: string;
}
