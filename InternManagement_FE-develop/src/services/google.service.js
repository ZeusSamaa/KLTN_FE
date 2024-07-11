import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';

const uploadFile = (file, type) => {
    const storageRef = ref(storage, `${type}/${file.name}`);
    return new Promise((resolve) => {
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((link) => {
                resolve(link);
            })
        });
    })
}

export const GoogleService = {
    uploadFile
}