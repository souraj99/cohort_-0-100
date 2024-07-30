import fs from "fs";


const readFile =()=>{
    return new Promise(resolve => {
       fs.readFile("text.txt", "utf8", (err, data)=>{
        setTimeout(()=>resolve(data),1000);
        });
    })
}


// promise :
// const afterFileRead =(data)=>{
//     console.log(data);
// }

// readFile().then(afterFileRead);


// async await :

const afterFileRead = async() => {
    let newData = await readFile();
    console.log(newData);
}

afterFileRead();



