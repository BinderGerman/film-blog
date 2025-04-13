export interface Tag {
  _id: string;
  _type: "tag";
  title: string;
  slug: { current: string };
}
