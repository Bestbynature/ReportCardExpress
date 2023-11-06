'use client';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { useState, useRef } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { v4 as uuidv4 } from 'uuid';

const UploadStudentImage = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fileRef = useRef<HTMLInputElement>(null);

  const getPublicFileUrl = (filePath: string) => {
    const { data } = supabase.storage.from('students-images').getPublicUrl(filePath);

    setImageUrl(data.publicUrl);
    setErrorMessage('Image uploaded successfully');
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file?.type)
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

    const fileName = `${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage.from('students-images').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/png' || 'image/jpeg' || 'image/jpg',
    });

    if (error) {
      setImageUrl('');
      console.log(error);
      setErrorMessage('Error uploading image. Please try again');
    } else {
      const filePath = data.path;

      getPublicFileUrl(filePath);
    }
  };

  const handleFileSelect = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 border border-double mb-3 rounded-md">
        <div
          className="flex flex-col items-center justify-center w-[200px] h-[200px] py-2 text-base font-medium text-black bg-blue-200 rounded-[50%] cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleFileSelect}
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Product Image"
              className="rounded-full"
              width={120}
              height={120}
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
