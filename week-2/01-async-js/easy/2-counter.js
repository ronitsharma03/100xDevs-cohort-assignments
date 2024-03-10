const timeout = 1000;
let count = 0;
function tellTime() {
    console.log(count);
    count += 1;

    setTimeout(tellTime, timeout);
}
tellTime();
