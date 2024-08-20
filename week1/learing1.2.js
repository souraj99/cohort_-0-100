// const firstName = "Souraj";
// const lastName = "Ghosh";
// const gender = "male";

// function greetBaseOnGender(gender) {
//     if (gender === "male") {
//         return console.log(`He is ${firstName} ${lastName}`);

//     }
//     else{

//         return console.log(`She is ${firstName} ${lastName}`);

//     }
// }

// greetBaseOnGender(gender);

// function cont1000() {
//     let total = 0;
//     for(let i = 0; i <= 1000; i++){
//         total += i;
//     }
//     return console.log(`Total number is : ${total}`);
// }
// cont1000();

// function sumOfTwoNumbers(num1,num2, calback){
//  let sum = num1 + num2;
//  calback(sum);
// }

// function sumData(data) {
//     return console.log(`Sum is : ${data}`);
// }

// sumOfTwoNumbers(13,17,sumData);

function timer(count) {
  let countNumber = parseInt(count);

  const setTime = setInterval(() => {
    countNumber--;
    const actualTime = countNumber < 10 ? `0${countNumber}` : countNumber;
    console.log(actualTime);
    if (countNumber <= 0) {
      clearTimeout(setTime);
    }
  }, 1000);
}
timer(5);

// const ar1 =[1,2,3,4];
// const ar2 =[5,6,7,8,9,10];
// let arr3 = ar1.concat(ar2);
// console.log(arr3);
// const short = ar1.forEach(function(a){
//     console.log("vales", a);
// })

// const numberType = (count) => {
//   let evenNum = [];
//   let oddNum = [];
//   for (let i = 0; i <= count; i++) {
//     if (i % 2 === 0) {
//       evenNum[evenNum.length] =i;
//     } else {
//       oddNum[oddNum.length] = i;
//     }
//   }
//   return console.log(evenNum, oddNum);(evenNum);
// };

// numberType(10);

const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
const newResult = arr.flat(arr);
console.log(newResult);
const arr2 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
