import React, { RefObject, useEffect, useRef, useState } from 'react';
import {
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  ItemTemplateOptions,
} from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ProgressBar } from 'primereact/progressbar';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Image from 'next/image';

interface UploadFilesProps {
  filesReference: RefObject<FileUpload>;
  setFormModified: () => void;
}

export default function UploadFiles({ filesReference, setFormModified }: UploadFilesProps) {
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    let _totalSize = totalSize;
    let files = filesReference.current?.getFiles();

    if (files) {
      for (const element of files) {
        _totalSize += element.size || 0;
      }
    }

    setTotalSize(_totalSize);
  }, [filesReference]);

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    let files = e.files;

    for (const element of files) {
      _totalSize += element.size || 0;
    }

    setTotalSize(_totalSize);
    setFormModified()
  };

  const onRemoveAFile = (file: File, callback: Function) => {
    setTotalSize(totalSize - file.size);
    callback();
    setFormModified()
  };

  const onClearList = () => {
    setTotalSize(0);
    setFormModified()
  };

  const uploadContainer = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      filesReference && filesReference.current ? filesReference.current.formatSize(totalSize) : '0 B';

    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {cancelButton}
        <div className='flex align-items-center gap-3 ml-auto'>
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
        </div>
      </div>
    );
  };

  const itemContainer = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;
    return (
      <div className='flex align-items-center flex-wrap'>
        <div className='flex align-items-center' style={{ width: '40%' }}>
          <Image alt={file.name} src={file.objectURL} height={100} width={100} />
          <span className='flex flex-column text-left ml-3'>
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity='warning' className='px-3 py-2' />
        <Button
          type='button'
          icon='pi pi-times'
          className='p-button-outlined p-button-rounded p-button-danger ml-auto'
          onClick={() => onRemoveAFile(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyContainer = () => {
    return (
      <div className='flex align-items-center flex-column'>
        <i
          className='pi pi-image mt-3 p-5'
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className='my-5'>
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target='.custom-choose-btn' content='Choose' position='bottom' />
      <Tooltip target='.custom-cancel-btn' content='Clear' position='bottom' />

      <FileUpload
        ref={filesReference}
        name='productpics[]'
        multiple
        accept='image/*'
        maxFileSize={1000000}
        customUpload
        onSelect={onTemplateSelect}
        onError={onClearList}
        onClear={onClearList}
        headerTemplate={uploadContainer}
        itemTemplate={itemContainer}
        emptyTemplate={emptyContainer}
        chooseOptions={chooseOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
}
