import Image from 'next/image';

export function SchoolImage({src,alt,className=''}:{src:string;alt:string;className?:string}) {
  return <div className={`relative overflow-hidden ${className}`}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
      className="object-cover"
    />
  </div>;
}
