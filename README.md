# React Hooks

A collection of various hooks.

---

## useClickInside

Track clicks on any component or element.

### API

`useClickInside(ref, function)`

- ref: The DOM node to track
- function: The function to execute when a user clicks on the `ref` node

### Example

```jsx
const App = () => {
  const ref = useRef();

  useClickInside(ref, () => {
    console.log('Clicked on the div');
  });

  return <div ref={ref}>Clickable Div</div>
}
```

---

## useClickOutside

Track clicks that are *not* on the targeted component or element.

### API

`useClickOutside(ref, function)`

- ref: The DOM node to track
- function: The function to execute when a user clicks outside the `ref` node

### Example

```jsx
const App = () => {
  const ref = useRef();

  useClickOutside(ref, () => {
    console.log('Clicked somewhere not in div');
  });

  return <div ref={ref}>Clickable Div</div>
}
```

---

## useDebounce

Debouncing is a technique that only updates after some amount of time has elapsed. This is especially useful for UI
components that trigger a call to an API such as autocomplete. Rather than triggering an API call for every single
key press, the API is called once the user has stopped typing and the delay timer has elapsed.

### API

`useDebounce(value, delay)`

- value: The variable where the debounced value will be stored
- delay: The time in milliseconds that must elapse before the debounced value is updated

### Example

```jsx
const App = () => {
  const [value, setValue] = useState(0);
  const debouncedValue = useDebounce(value, 500);

  return (
    <div onClick={() => setValue(value => value + 1)}>
      Debounced value: {debouncedValue}
    </div>
  );
}
```

---

## useFetch

Use `fetch` to return data from an API

### API

`useFetch(url, options)`

- url: The API endpoint from which to fetch
- options: An object of options for `fetch`

Refer to the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) documentation for a full breakdown
of valid options.

### Example

```jsx
const App = () => {
  const bibKey = 'ISBN:0451526538';
  const {
    response,
    error
  } = useFetch(`https://openlibrary.org/api/books?bibkeys=${bibKey}&format=json&jscmd=data`);
  const [book, setBook] = useState();

  useEffect(() => {
    response && setBook(response[bibKey]);
  }, [response]);

  if (error) return <div>Error fetching book</div>

  if (!book) return <div>Fetching...</div>

  return (
    <>
      <img src={book.cover.medium} alt="The book's cover art" />
      <div>{book.title}</div>
    </>
  )
}
```

---

## useInterval

A wrapper around setInterval that automatically performs cleanup.

### API

`useInterval(function, delay)`

- function: The function to execute every `delay` milliseconds
- delay: The time in milliseconds between each call of the `function`

### Example

```jsx
const App = () => {
  useInterval(() => {
    console.log('Interval trigger!')
  }, 1000)

  return <div>useInterval example</div>
}
```

---

## useOnMount

Perform an action once a component has mounted.
> Note: This is the same as using `useEffect(() => { someFn() }, [])`

### API

`useOnMount(function)`

- function: The function to execute after mounting

### Example

```jsx
const App = () => {
  useOnMount(() => {
    console.log('App has mounted!')
  })

  return <div>useOnMount example</div>
}
```

---

## useOnUnmount

Perform an action once a component has unmounted.

### API

`useOnUnmount(function)`

- function: The function to execute after unmounting

### Example

```jsx
const App = () => {
  useOnUnmount(() => {
    console.log('App has unmounted!')
  })

  return <div>useOnUnmount example</div>
}
```

---

## usePrevious

Keep track of the previous value.

### API

`usePrevious(value)`

- value: The variable to track

### Example

```jsx
function App() {
  const [value, setValue] = useState(0)
  const previousValue = usePrevious(value)

  return (
    <>
      <button onClick={() => setValue(val => val + 1)}>Click Me</button>
      <div>
        Button has been clicked {value} times (last value was {previousValue})
      </div>
    </>
  )
}
```

---

## useTimeout

A wrapper around setTimeout that automatically performs cleanup.

### API

`useTimeout(function, delay)`

- function: The function to execute after the `delay` has elapsed
- delay: How many milliseconds to wait before executing the `callback`

### Example

```jsx
const App = () => {
  useTimeout(() => {
    console.log('Time out trigger!')
  }, 1000)

  return <div>useTimeout example</div>
}
```

## useWhenVisible

Detect when an element is visible on the screen via the `IntersectionObserver` API.

### API

`useWhenVisible(target, function, options)`

- target: The DOM element that we want to detect when it's on the screen
- function: The function to execute when the target is visible
- options:
  - root: The DOM element used as the viewport for checking visibility
  - rootMargin: An optional margin around the element that will trigger the visibility check
  - threshold: A value from 0 to 1 that determines how much of the element must be on the screen before triggering.
    - 0 will trigger immediately when any part of the target becomes visible
    - 1 will only trigger once 100% of the target is visible

See also: [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

### Example

```jsx
const App = () => {
  const redRef = useRef()
  const blueRef = useRef()
  const greenRef = useRef()

  useWhenVisible(redRef, () => console.log('The red div is visible'))
  useWhenVisible(blueRef, () => console.log('The blue div is visible'))
  useWhenVisible(greenRef, () => console.log('The green div is visible'))

  return (
    <section>
      <div ref={redRef} style={{ backgroundColor: 'red', height: 800 }}>
        Red
      </div>
      <div ref={blueRef} style={{ backgroundColor: 'blue', height: 2000 }}>
        Blue
      </div>
      <div ref={greenRef} style={{ backgroundColor: 'green', height: 800 }}>
        Green
      </div>
    </section>
  )
}
```
