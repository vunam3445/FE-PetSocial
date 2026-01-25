export const ImageProfile = ({ url, handleImage }:{url:string,handleImage:(url: string)=>void}) => {
  return (
    <div className="overflow-hidden rounded-lg cursor-pointer aspect-square bg-gradient-to-br from-pink-300 to-rose-400 image-hover" onClick={()=>{handleImage(url)}}>
      {url ? (
        <img
          src={url}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-3xl text-white">
          🐕
        </div>
      )}
    </div>
  );
};
