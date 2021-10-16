export const storeUserDetails = (checkBox,formDetails) => {
    if(checkBox)
    localStorage.setItem('userDetails', JSON.stringify(formDetails));
  else{
      
      localStorage.setItem('userDetails', localStorage.getItem('userDetails'));
  }
}

export const getUserDetails = ()=>{
    return JSON.parse(localStorage.getItem('userDetails'));

}