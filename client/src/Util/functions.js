import QuickEncrypt from "quick-encrypt";

const keys = QuickEncrypt.generate(1024);
const publicKey = keys.public;
const privateKey = keys.private;

export const storeUserDetails = (checkBox, formDetails) => {
  if (checkBox) {
    const email = QuickEncrypt.encrypt(formDetails.email, publicKey);
    const password = QuickEncrypt.encrypt(formDetails.password, publicKey);

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
  console.log(userDetails);
  if (userDetails) {
    email = QuickEncrypt.decrypt(userDetails.email, privateKey);
    password = QuickEncrypt.decrypt(userDetails.password, privateKey);
  }

  console.log({email, password});

  return {
    email,
    password,
  };
};
