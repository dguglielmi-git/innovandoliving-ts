export interface S3FileUploadEntity {
  file?: File;
  uploaded?: boolean;
}

export interface S3FileUpload {
  data: S3FileUploadEntity;
}

export interface Categories {
  _id: string;
  title: string;
  url: string;
  position: number;
}
