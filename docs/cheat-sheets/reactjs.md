---
sidebar_position: 2
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

## Imports/Exports

### Import Default export

```jsx
import ExampleComponent from 'path/to/file';
```

You can import the default exports from a file using the syntax from above.


### Export default
```jsx
export default ExampleComponent;
```

Use the export and default keywords to export a component.

### Importing Named Exports

```jsx
import { capitalize, fetchUserData, getUserName } from 'path/to/file';
```
To import the named exports you need to list them explicitly within curly braces with the names they have been exported with.

```jsx
import { ExampleComponent as AliasedExampleComponent } from 'path/to/file';
 
import { capitalize as cap } from 'path/to/file';
```
To create an alias you can use the as keyword followed by the new local name, which will be the name under which the imported component will be used in the current context.

### Import all

```jsx
import * as AliasedAllImport from 'path/to/file';
```

You can import all of the named exports from a file by using the * as syntax.
### Named exports

```jsx
export const capitalize = word => {
 ...
};

export const fetchUserData = userID => {
 ...
};

export const getUserName = userObject => {
 ...
};
```
You can export as many named elements from a file as you wish. To do that you need to use the export keyword without the default keyword.