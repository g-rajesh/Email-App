exports.sort = (inbox) => {
    let i,j;
    for(i=0;i<inbox.length-1;i++){
        for(j=0;j<inbox.length-1;j++){
            if(inbox[j].date < inbox[j+1].date){
                const temp = inbox[j];
                inbox[j]=inbox[j+1];
                inbox[j+1]=temp;
            }
        }
    }

    return inbox;
}