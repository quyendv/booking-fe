import { LoaderIcon } from 'lucide-react';
import React, { useState } from 'react';
import { StorageApi } from '~/apis/storage.api';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export interface StorageResult {
  url: string;
  key: string;
}

interface Props {
  folder?: string;
  onUploadComplete?: (_file: StorageResult) => void;
  onUploadError?: (_error: any) => void;
}

const UploadFile = ({ folder = 'default', onUploadComplete, onUploadError }: Props) => {
  // const [file, setFile] = useState<File | null>(null);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => {
  //       setPreviewUrl(fileReader.result as string);
  //     };
  //     fileReader.readAsDataURL(selectedFile);
  //   }
  // };

  // const handleUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   // Implement your upload logic here
  //   // console.log('Uploading file:', file);
  // };

  const [uploadResult, setUploadResult] = useState<StorageResult | null>();
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setLoading(true);
      if (uploadResult) {
        // delete old file
        await StorageApi.deleteFile(uploadResult.key);
      }

      // upload new file
      const uploadResponse = await StorageApi.uploadFile(selectedFile, folder);
      if (uploadResponse.isSuccess) {
        setUploadResult(uploadResponse.data);
        if (onUploadComplete) onUploadComplete(uploadResponse.data);
      } else {
        if (onUploadError) onUploadError(uploadResponse.error);
      }
      setLoading(false);
    }
  };

  return !loading ? (
    <Input id="file" type="file" onChange={handleFileChange} />
  ) : (
    <Button variant="outline" size="icon" disabled>
      <LoaderIcon className="size-4 animate-spin" />
    </Button>
  );
};

export default UploadFile;
