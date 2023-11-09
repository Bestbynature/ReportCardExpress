import Link from 'next/link';
import Image from 'next/image';
import { ImageCardLinkProps } from '@/lib/types/types';

const ImageCardLink = ({ href, src, alt, title, description }: ImageCardLinkProps) => {
  return (
    <>
      <Link
        href={href}
        className="mb-4 card w-full bg-base-100 hover:shadow-xl transition-shadow duration-300 ease-in-out border-2 border-gray-200 rounded-lg"
      >
        <figure>
          <Image
            src={src}
            alt={alt}
            width={800}
            height={400}
            priority
            className="h-48 object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
        </div>
      </Link>
    </>
  );
};

export default ImageCardLink;
