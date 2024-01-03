'use client';

import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { v4 as uuidv4 } from 'uuid';

type UploadPhotoProps = {
  profilePhotoUrl?: string | null;
  onImageChange?: (newImageUrl: string) => void
};

const UploadStudentImage = ({ profilePhotoUrl, onImageChange}: UploadPhotoProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploading, setUploading] = useState(false); 

  useEffect(() => {
    if (profilePhotoUrl) {
      setImageUrl(profilePhotoUrl);
      setImagePreview(profilePhotoUrl);
    }
  }, [profilePhotoUrl]);

  const fileRef = useRef<HTMLInputElement>(null);

  const getPublicFileUrl = (filePath: string) => {
    const { data } = supabase.storage.from('students-images').getPublicUrl(filePath);

    setImageUrl(data.publicUrl);
    setErrorMessage('Image uploaded successfully');
    // console.log('Image URL now available as ====>', data.publicUrl)
    onImageChange && onImageChange(data.publicUrl)
    setUploading(false)
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true)
    if(imageUrl){
      const parts = imageUrl.split('/');
      const previousImageName = parts[parts.length - 1];
      const { data, error } = await supabase.storage.from('students-images').remove([`images/${previousImageName}`]);
      if(error){
        console.log(error)
      }
    }
    const file = e.target.files?.[0];
    if (!file) {
      setErrorMessage('No file selected');
      return;
    }
    if (file && file.size > 1024 * 1024 * 2) {
      setErrorMessage('File size should be less than 2MB');
      return;
    }

    const fileType = file.type.split('/')[1];
    if (fileType !== 'png' && fileType !== 'jpeg' && fileType !== 'jpg') {
      setErrorMessage('Only jpeg, jpg and png files are allowed');
      return;
    }

    const imagePreview = URL.createObjectURL(file);
    setImagePreview(imagePreview);
    setErrorMessage('Picture is being uploaded...');

    const filename = file.name.split('.')[0];
    const fileExtension = file.name.split('.')[1];

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}-${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;

    const fileName = `images/${formattedDate}-${formattedTime}-${filename}.${fileExtension}`;

    const { data, error } = await supabase.storage.from('students-images').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/png' || 'image/jpeg' || 'image/jpg',
    });

    if (error) {
      setImageUrl('');
      setImagePreview('');
      console.log(error);
      setErrorMessage('Error uploading image. Please refresh the page before trying again');
    } else {
      const filePath = data.path;

      console.log('The filepath on the server is ===>', filePath)

      getPublicFileUrl(filePath);
    }
  };

  const handleFileSelect = () => {
    fileRef.current?.click();
    setErrorMessage('');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 border border-double mb-3 rounded-md">
        <div
          className="flex flex-col items-center justify-center w-[200px] h-[200px] py-2 text-base font-medium text-black bg-blue-200 rounded-[50%] cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleFileSelect}
          style={{
            cursor: uploading ? 'not-allowed' : 'pointer',
            pointerEvents: uploading ? 'none' : 'auto',
          }}
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Product Image"
              className="rounded-full"
              width={120}
              height={120}
              priority
            />
          ) : (
            <>
              <AddAPhotoIcon sx={{ width: '60px', height: '60px' }} />
              <p> Upload Student image</p>
            </>
          )}
        </div>
        {errorMessage && <span className="text-error font-bold capitalize">{errorMessage}</span>}
      </div>
      <input
        type="text"
        name="profilePhotoUrl"
        readOnly
        hidden
        placeholder="Use the button above to automatically create the Image url"
        className="mb-3 w-full input input-bordered"
        value={imageUrl || ''}
      />
      <input type="file" name="pictureFile" hidden ref={fileRef} onChange={handleUpload} />
    </>
  );
};

export default UploadStudentImage;
