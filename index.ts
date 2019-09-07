import { Observable } from 'rxjs';

// Import stylesheets
import './style.css';
import * as program from './src';
import { Memoize, API, IApi } from './src/decorator';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;



@API('https://jsonplaceholder.typicode.com/')
export class Clazz implements IApi {
  callApi;
  
  @Memoize(3)
  doThing(a: string): string {
    return new Array(100000).fill(`${a}`).map(x => x + Math.random() * 100).join().split(' ').reduce((acc, curr) => {
      return `${acc}${curr}`
    }, '');
  }
  @Memoize(2)
  doStuff(b: string) {
    return "important " + b;
  }
}

const c = new Clazz();
// const d = new Clazz();
// c.doThing('jobi');
// c.doThing('jobi');
// c.doThing('joba');
// c.doStuff('stuff');
// c.doStuff('stuff');
// d.doThing("thingy");
// d.doStuff('things');
// setTimeout(() => {
//   c.doThing('jobi');
// }, 6000);

// const api = c.callApi("todos");
// console.log("api", api);
// api.getData();

// c.callApi("todos").getData().subscribe(x => console.log(JSON.stringify(x)));

// let myObj = program.proxy.trackChange({}, printChanges);

// const onClick = () => {
//   myObj.a = (myObj.a || '') + 'AH!';
//   appDiv.appendChild(program.dom.createText(`${myObj.a}`));
//   };


// appDiv.appendChild(program.dom.createButton('Click me', onClick));

// appDiv.appendChild()
// program.proxy.tryDefaults();
// const changes = program.proxy.tryTrackChange();
// changes.onObject();
// changes.onArray();

program.worker.getWorker("worker.ts"); 

function printChanges(obj, prop, oldVal, newVal) {
  console.log(`myObj.${prop} changed from ${oldVal} to ${newVal}`);
}
