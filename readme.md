### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

- **getElementById:** getElementById is a DOM method that retrieves a single element from the document using its unique id attribute. Since IDs are intended to be unique within an HTML document, this method always returns one element or null if no element exists with the specified ID.
- **getElementsByClassName:** getElementsByClassName retrieves all elements that have a specific class name. Unlike getElementById, this can return multiple elements because multiple elements can share the same class.
- **querySelector / querySelectorAll:** querySelector and querySelectorAll are more general-purpose DOM methods that allow selection using any CSS selector, not just IDs or classes. querySelector returns the first element that matches the selector. querySelectorAll returns all matching elements as a static NodeList (the list does not update if the DOM changes). These methods are extremely flexible because they accept CSS selector syntax, including IDs, classes, attributes, pseudo-classes, and combinators.

---

### 2. How do you create and insert a new element into the DOM?

To create and insert a new element in the DOM, first use document.createElement() to create the element in memory. Then, optionally set its attributes, classes, or content. Finally, insert it into the document using methods like appendChild(), prepend(), or insertBefore() to attach it to an existing parent element.

---

### 3. What is Event Bubbling and how does it work?

Event Bubbling is a mechanism in the DOM where an event that occurs on a specific element first triggers on that element and then propagates upward through its ancestors, all the way to the document object, unless explicitly stopped. When an event such as a click happens on a child element, it is first handled by that element and then successively by its parent, grandparent, and so on. This allows a parent element to respond to events that occur on its children, a concept often used in event delegation. Bubbling can be stopped at any point by calling event.stopPropagation(). In essence, Event Bubbling is the upward flow of events from the target element to its ancestors in the DOM.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation in JavaScript is a technique where a single event listener is added to a parent element to handle events on its child elements, instead of attaching separate listeners to each child. This works because of event bubbling: when an event occurs on a child, it bubbles up to the parent, allowing the parent’s listener to detect and handle it.

It is useful because it reduces memory usage by minimizing the number of event listeners, simplifies code maintenance, and can handle dynamically added elements that were not present in the DOM when the listener was first attached. In short, event delegation leverages bubbling to efficiently manage events for multiple elements through a single listener.

---

### 5. What is the difference between preventDefault() and stopPropagation() methods?

The preventDefault() and stopPropagation() methods in JavaScript are both used in event handling, but they serve different purposes. The preventDefault() method prevents the browser’s default behavior for a specific event, such as stopping a form from submitting when a button is clicked or preventing a link from navigating to a URL. On the other hand, stopPropagation() prevents the event from bubbling up (or propagating) to ancestor elements in the DOM, so parent elements’ event listeners will not be triggered by that event. In short, preventDefault() controls the browser’s default action, while stopPropagation() controls the event’s flow through the DOM.