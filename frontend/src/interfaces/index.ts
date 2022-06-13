export interface IFileParsed {
  _id: number;
  file: {
    data: Buffer;
    type: string;
  };
  name: string;
  classification: string;
  extension: string;
}
