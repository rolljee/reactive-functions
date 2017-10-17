# Reactive-function

Make a function reactive by applying listener on two events

- Added
- Modified

# Exemple

```javascript
const array = [];

function pushToArray(value) {
    if (!!value) {
        return array.push(value);
    } else {
        return null;
    }
}

const reactivePush = new ReactiveFunc(pushToArray);

reactivePush.monitor(1000);
reactivePush.set('test');

reactivePush.emitter.on('modified', () => {
    console.log('modified');
});

reactivePush.emitter.on('added', (added) => {
    console.log('added', added);
});

setTimeout(() => { 
    reactivePush.set('test2');
    console.log(array);
}, 4000);

```