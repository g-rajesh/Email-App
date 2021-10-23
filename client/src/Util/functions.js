import CryptoJS from 'crypto-js';

const SECRET_KEY = "cdsjvejchdbec-rdcvejrn";

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

const decryptData = (data) => {
  var bytes  = CryptoJS.AES.decrypt(data, SECRET_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
}

export const storeUserDetails = (checkBox, formDetails) => {

  const email = encryptData(formDetails.email);
  const password = encryptData(formDetails.password);
    
  if (checkBox) {
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        email,
        password,
      })
    );
  } else {
    localStorage.setItem("userDetails", localStorage.getItem("userDetails"));
  }
};

export const getUserDetails = () => {

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let email = "";
  let password = "";

  if (userDetails) {    
    email = decryptData(userDetails.email);
    password = decryptData(userDetails.password);
  }

  return {
    email,
    password,
  };
};
