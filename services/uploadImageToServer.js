import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadImageToServer = async (catalog, image) => {
  const response = await fetch(image);
  const file = await response.blob();
  const uniqPostId = Date.now().toString();
  const storageRef = ref(storage, `${catalog}/${uniqPostId}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (erorr) {
    console.error("error.code", erorr.code);
    console.error("error.message", erorr.message);
  }
};
