import noImage from "../assets/no-image-placeholder.webp";

const getCroppedImageUrl = (image_name) => {
    if (!image_name) return noImage;

    const url = "/src/assets/" + image_name;
    const target = "media/";
    const index = url.indexOf(target);

    if (index === -1) {
        return url;
    }

    const insertionIndex = index + target.length;
    return url.slice(0, insertionIndex) + "crop/600/400/" + url.slice(insertionIndex);
};

export default getCroppedImageUrl;
