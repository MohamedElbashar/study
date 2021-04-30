/** @format */

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("async1");
        reject(new Error("some thing error"));
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("async2");
        resolve(2);
    }, 2000);
});

Promise.race([p1, p2])
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));