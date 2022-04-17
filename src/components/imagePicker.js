import { auth, db } from "../../firebase"
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }
  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  if (pickerResult.cancelled === true) {
    return;
  }
  return pickerResult.uri;
}

export let uploadImage = async (id, selectedImage) => {
  const uploadUri = selectedImage;
  console.log(selectedImage)
  const uriSplit = uploadUri.split('.');
  const fileExtension = uriSplit[uriSplit.length - 1];

  const response = await fetch(uploadUri);
  const blob = await response.blob();

  const storage = getStorage();
  const storageRef = ref(storage);
  const imageRef = ref(storageRef, `userProfilePictures/${id}.${fileExtension}`);

  uploadBytes(imageRef, blob).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    getDownloadURL(imageRef)
      .then(async url => {
        await updateDoc(doc(db, "users", id), {
          profileImage: url,
        })
      })
      .catch(async e => {
        console.log(e);
        await updateDoc(doc(db, "users", id), {
          profileImage: null,
        })
      })
  })
} 
