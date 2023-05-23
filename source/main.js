"use strict"

const fs = require('fs');

console.log("Which mode do you wanna use?");
process.stdout.write("Interactive or non-interactive (press 1|2 respectively): ");

process.stdin.on('data', checkAnswer);

function checkAnswer(answer) {

   const enteringValue = answer.toString().trim();

   if (enteringValue === '1') {
      interactive();
   } else if(enteringValue === '2') {
      nonInteractive();
   } else {

      console.log("Invalid input!!! Try again.");
      process.stdout.write("Interactive or non-interactive (press 1|2 respectively): ");

   }
}

const interactive = () => {

   const enteredParameters = {};
   const parameters = ['a', 'b', 'c'];
   let index = 0;

   process.stdin.removeListener('data', checkAnswer);
   
   function parametersInitialization() {
      process.stdout.write(`${parameters[index]} = `);
   }

   process.stdin.on('data', getForInteractive);

   function getForInteractive(data) {
      
      const enteringValue = data.toString().trim();
      const value = Number(enteringValue);

      if (Number.isNaN(value) || enteringValue === '') {

         console.log(`Error. Expected a valid real number, got ${enteringValue} instead!!!`);
         console.log("Try input parameter again:");

      } else if (index === 0 && value === 0) {

         console.log("Error. Parameter 'a' cannot be 0(zero)!!!");
         console.log("Try input parameter again:");

      } else {

         enteredParameters[parameters[index]] = value;
         index++;
         console.log(enteredParameters);

      }
   
      if (parameters.length > index) {
         parametersInitialization();
      } else {

         console.log("Done:", enteredParameters);
         process.exit();
      }
   }

   parametersInitialization();
}

const nonInteractive = () => {

   const enteredParameters = {};
   const parameters = ['a', 'b', 'c'];
   let index = 0;

   process.stdin.removeListener('data', checkAnswer);

   function parametersForFile() {
      process.stdout.write("Enter name or path file: ");
   }
   
   process.stdin.on('data', getForNonInteractive);

   function getForNonInteractive(data) {

      const filePath = data.toString().trim();
      const contentFile = fs.readFileSync(filePath, 'utf8');
      const result = contentFile.trim().split(' ');
      
      for (const checkParameter of result) {

      const value = Number(checkParameter);

      if (Number.isNaN(value)) {
         throw new Error("Error. Invalid value in file!!!");
      } else {

         enteredParameters[parameters[index]] = value;
         index++;
         console.log(enteredParameters);

      }
      
      if (parameters.length === index) {

         console.log("Done:", enteredParameters);
         process.exit();

      }

      }
   }

   parametersForFile()
}