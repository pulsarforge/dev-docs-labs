---
sidebar_position: 3
---
# Reactjs cheat sheet

## Components

### Functional Component Syntax

### Functional Component defined using the function keyword
``` jsx
function ExampleFunctionalComponent() {
 return <h1>Example Class Component</h1>;
}
```

### Functional Component defined using arrow function
``` jsx
const ExampleFunctionalComponent = () => {
 return <h1>Example Class Component</h1>;
}
```

Functional Components are the future of React. Despite previously being solely used for stateless UI components, they are now the preferred way of constructing new components.

### Pure Functional Component
``` jsx 
import { memo } from 'React';
 
const ExamplePureComponent = memo({ portal }) => {
 return (
   <h1>Welcome to {portal}!</h1>
 );
}
```

Pure (Functional) Components always generate the same output given the same input (state and props).