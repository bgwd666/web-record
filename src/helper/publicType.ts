export interface ISerializationDom {
  children: ISerializationDom[];
  id: string;
  tagName: string;
  attributes: { [key: string]: string };
}
