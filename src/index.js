import ReactDOM from "react-dom";

// A React element, the element is on the right of the = sign, to the left is a constant (a memory pointer) to the element
const simplElement = (
  <div>
    <h2>Hello, world!</h2>
    <p>I'm an element!</p>
  </div>
);

// The Render method: used to render the element we just defined, and all the nested elements!
// The render function will pass all the properties down to the components, where those can be used to build and return elements.
// ReactDOM will merge the changes in the DOM.
ReactDOM.render(simplElement, document.getElementById("root"));