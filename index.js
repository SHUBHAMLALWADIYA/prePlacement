// const abc=()=>{
//     console.log(abc.xyz)
// }

// abc()
// abc.xyz=400
// abc.xyz=200
// abc()

// const numbers=[1,2,3,4]
// numbers[6]=500
// console.log(numbers)

// console.log(typeof typeof 100)

// const array=[..."shr"]
// console.log(array)

// console.log(parseInt(12))
// console.log(parseInt("712.22gg"))
// console.log(parseFloat("12.22fff"))


// console.log([1,2].map(num=>{
//     if(num>0)return;
//     return num*2
// }))

// function abc(a,b){
    
//     a=500
//     b=400
//     return arguments[0]+arguments[1]
//    console.log(a+b)
// }
// console.log(abc(10,10))


// const arr=[1,2,3,4,5,6,7,8,9]
// const newArray=arr.find((num,index)=>num==4)
// console.log(newArray)

const obj = {
    name: "Arrow",
    arrowFunc: () =>{
        console.log("this",this.name)     
    } ,
  };
  obj.arrowFunc(); // Output: global object (or undefined in strict mode)
  
// const ages = [18, 20, 15, 21, 17];
// const adults = ages.filter((a) => a>20);

// console.log(adults); // Output: [18, 20, 21]

// const numbers=[1,2,3,4,5]
// const sum=numbers.reduce((acc,num)=>acc+num,0)
// console.log(sum)