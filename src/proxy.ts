function propDefaults(defaults) {
  const handler = {
    get (obj, prop) {
      return Reflect.get(obj, prop) || defaults[prop];
    }
  };
  return new Proxy({}, handler);
}

function log(obj) {
    const isin = 'name' in obj ? 'is in' : 'is not in';
    console.log(`name = "${obj.name}" (name ${isin} myObj)`);
}

export function tryDefaults() {
  const myObj = propDefaults({name: "noname"});
  // trying it out
  log(myObj);
  myObj.name = 'Bob';
  log(myObj);
  delete myObj.name;
  log(myObj);
}

export function trackChange(obj, onChange) {
  const handler = {
    set(obj, prop, value) {
      const oldVal = obj[prop];
      Reflect.set(obj, prop, value);
      onChange(obj, prop, oldVal, value);
      return true;
    },
    deleteProperty(obj, prop) {
      const oldVal = obj[prop];
      Reflect.deleteProperty(obj, prop);
      onChange(obj, prop, oldVal, undefined);
      return true;
    }
  };
  return new Proxy(obj, handler as any);
}

export function tryTrackChange() {

  // trying it out on an object
  function onObject() {
    let myObj = trackChange({a: 1, b: 2}, function (obj, prop, oldVal, newVal) {
        console.log(`myObj.${prop} changed from ${oldVal} to ${newVal}`);
    });

    myObj.a = 5;
    delete myObj.b;
    myObj.c = 6;
  }

  // trying it out on an array
  function onArray() {
    let myArr = trackChange([1,2,3], function (obj, prop, oldVal, newVal) {
        let propFormat = isNaN(parseInt(prop)) ? `.${prop}` : `[${prop}]`,
            arraySum = myArr.reduce((a,b) => a + b);
        console.log(`myArr${propFormat} changed from ${oldVal} to ${newVal}`);
        console.log(`  sum [${myArr}] = ${arraySum}`);
    });
    myArr[0] = 4;         
    delete myArr[2];
    myArr.length = 1;
  }
  return {
    onObject,
    onArray
  }
}