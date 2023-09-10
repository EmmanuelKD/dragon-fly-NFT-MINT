import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// dont mess with my keys
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId:process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export async function addPrintFilesToStorage(files: File[]) {
  const destinationFolder = "files/toPrint/ministryId";

  return uploadFilesAsBatch(files, destinationFolder).then((task) => {
    let downloadRef = task.map(async (_tsk) => {
      return await getDownloadURL(_tsk.ref);
    });
    return Promise.all(downloadRef);
  });
}

async function uploadFilesAsBatch(
  files: File[],
  destinationFolder: string
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => {
    const filePath = `${destinationFolder}/${file.name}`;
    const fileRef = ref(storage, filePath);
    return uploadBytes(fileRef, file);
  });
  return await Promise.all(uploadPromises);
}


function connectWallet(){
    
}