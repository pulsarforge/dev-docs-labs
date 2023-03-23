---
sidebar_position: 2
---


# React basic questions and answers
Sup dudes, here I will compile basic react answers, and questions.


## What is Virtual DOM?

Virtual DOM is an in memory representation of the real DOM. The reconciliation happens between two steps, the render function being called and the elements being displayed in the screen.


## How Virtual DOM works?

It works in three steps:

-   If the underlying data is changed the entire UI is re rendered in the virtual DOM.
-   The differences between the previous and current DOM are calculated.
-   Once the calculation ends, the real DOM will update with only the needed changes.


## What is the difference between shadow DOM and virual DOM?

The shadow DOM is a browser technology designed for escoping variables and css in web components.

The virtual DOM is a concept implemented in Javascript libraries on top of browser APIs.


## What is context?

It is a way to pass data without manually pass it through the entire tree of components from parent to childs components.


## What is children prop?

A prop that allows pass components as data to other components.


## How to write comments in React?

Wrapped in curly braces plus opening closing slash multiply symbol.


## What is reconciliation?

It is the proccess of compare the virtual DOM and the real DOM and proceed to render again if changes has been made.


## Why React uses className over class attribute?

Class is a reserved keyword in javascript and className is open to use as keyword.


## What are fragments?

It is a pattern that allows to add a group of children components without add extra nodes to the DOM.


## Why fragments are better than container divs?

Fragments use less memory, accesibility for css tools the dom is less clutered.