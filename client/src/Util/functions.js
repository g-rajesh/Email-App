import QuickEncrypt from "quick-encrypt";

const keys = QuickEncrypt.generate(1024);
const publicKey = keys.public;
const privateKey = keys.private;

export const storeUserDetails = (checkBox,formDetails) => {
    if(checkBox){
        // let encryptedText = QuickEncrypt.encrypt( "This is some super top secret text!", publicKey )

        const firstName = QuickEncrypt.encrypt(formDetails.firstName, publicKey);
        const lastName = QuickEncrypt.encrypt(formDetails.lastName, publicKey);
        const email = QuickEncrypt.encrypt(formDetails.email, publicKey);
        const password = QuickEncrypt.encrypt(formDetails.password, publicKey);
        
        localStorage.setItem('userDetails', JSON.stringify({
            firstName, lastName, email, password
        }));
    }
    else{
        localStorage.setItem('userDetails', localStorage.getItem('userDetails'));
    }
}

export const getUserDetails = ()=>{
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const email = QuickEncrypt.decrypt(userDetails.email, privateKey);
    const password = QuickEncrypt.decrypt(userDetails.password, privateKey);

    return {
        email,
        password
    }
    
}
