import ImageCard from "./ImageCard";

const ImageList = (props) => {
  const { images } = props;
  return (
    <div className="image-list">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};
export default ImageList;
