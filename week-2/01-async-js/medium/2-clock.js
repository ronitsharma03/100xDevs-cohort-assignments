const interval = 1000;
setInterval(() => {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const s = date.getSeconds();
    let amPm = "";
    if(hour < 12 && min <= 59 && s <= 59){
        amPm = "AM";
    }
    else{
        amPm = "PM";
    }
    console.log(hour + ":" + min + ":" + s+" "+amPm);
}, interval);