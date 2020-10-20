import { projectStorage, projectFirestore, timestamp } from '../firebase/db/firebase-app';

export const handleUpload = async (folder, image, setThumbnail) => {
  const storageRef = projectStorage.ref(`${folder}/${image.name}`).put(image);

  const res = await storageRef.on(
    'state_changed',
    (snaphshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      projectStorage
        .ref(folder)
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          setThumbnail(url);
        });
    },
  );
};
