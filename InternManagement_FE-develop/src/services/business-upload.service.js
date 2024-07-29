import axios from 'axios';
import { environment } from '../environment';

const uploadDocx = (file) => {
  const URL = environment.host + `/business/upload`;

  const formData = new FormData();
  formData.append('file', file);
  return axios.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: environment.authorization,
    },
  });
};

export const BusinessUploadService = {
  uploadDocx,
};
