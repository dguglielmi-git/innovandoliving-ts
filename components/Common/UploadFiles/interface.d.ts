import { FileUpload } from 'primereact/fileupload';

export interface UploadFilesProps {
  filesReference: RefObject<FileUpload>;
  setFormModified: () => void;
}
