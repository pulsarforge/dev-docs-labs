---
sidebar_position: 2
---

# TypeScript cheatsheet

```typescript

Basic types
any
void

boolean
number
string

null
undefined

bigint
symbol

string[]          /* or Array<string> */
[string, number]  /* tuple */

string | null | undefined   /* union */

never  /* unreachable */
unknown
enum Color {
  Red,
  Green,
  Blue = 4
};

let c: Color = Color.Green
```
```typescript
// Declarations
let isDone: boolean
let isDone: boolean = false
function add (a: number, b: number): number {
  return a + b
}
```
```typescript
// Return type is optional
function add (a: number, b: number) { ... }
```
## Type assertions

```typescript
Variables
let len: number = (input as string).length
let len: number = (<string> input).length  /* not allowed in JSX */
```
```typescript
Functions
function object(this: {a: number, b: number}, a: number, b: number) {
  this.a = a;
  this.b = b;
  return this;
}

// this is used only for type declaration
let a = object(1,2);
// a has type {a: number, b: number}
```
## Interfaces

```typescript
// Inline
function printLabel (options: { label: string }) {
  console.log(options.label)
}
```
```typescript
// Note the semicolon
function getUser (): { name: string; age?: number } {
}
```
```typescript
// Explicit
interface LabelOptions {
  label: string
}

function printLabel(options: LabelOptions) { ... }
```
```typescript
// Optional properties
interface User {
  name: string;
  age?: number;
}
```
```typescript
// Read only
interface User {
  readonly name: string
}
```
```typescript
// Dynamic keys
{
  [key: string]: Object[]
}
```
## Type aliases
```typescript
// Type aliases
type Name = string | string[]
Intersection
interface Colorful { ... }

interface Circle { ... }
 
type ColorfulCircle = Colorful & Circle;
```
## Function types
```typescript
interface User { ... }

function getUser(callback: (user: User) => any) { callback({...}) }

getUser(function (user: User) { ... })
```
## Classes
```typescript
class Point {
  x: number
  y: number
  static instances = 0
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
```
```typescript
// Inheritance
class Point {...}

class Point3D extends Point {...}

interface Colored {...}

class Pixel extends Point implements Colored {...}
```
```typescript
// Short fields initialisation
class Point {
  static instances = 0;
  constructor(
    public x: number,
    public y: number,
  ){}
}
Fields which do not require initialisation
class Point {
  public someUselessValue!: number;
  ...
}
```
## Generics
```typescript
class Greeter<T> {
  greeting: T
  constructor(message: T) {
    this.greeting = message
  }
}

let greeter = new Greeter<string>('Hello, world')
```
## Modules
```typescript
export interface User { ... }
```
## Type extraction
```typescript
interface Building {
  room: {
    door: string;
    walls: string[];
  };
}

type Walls = Building['room']['walls']; // string[]
```
## Keyof Type Operator
```typescript
type Point = { x: number; y: number };

type P = keyof Point; // x | y
```
## Conditinal Types
```typescript
// SomeType extends OtherType ? TrueType : FalseType;

type ToArray<T> = T extends any ? T[] : never;

type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]
Inferring
type GetReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never;

type Num = GetReturnType<() => number>; // number
type First<T extends Array<any>> = T extends [infer F, ...infer Rest] ? F : never;

type Str = First<['hello', 1, false]>; // 'hello'
```
## Literal Type
```typescript
const point = { x: 4, y: 2 }; // { x: number, y: number }

const literalPoint = { x: 4, y: 2 } as const; // { readonly x: 4, readonly y: 2 };
```
## Template Literal Types

```typescript
type SpaceChar = ' ' | '\n' | '\t';

type TrimLeft<S extends string> = S extends `${SpaceChar}${infer Rest}` ? TrimLeft<Rest> : S;

type Str = TrimLeft<'    hello'>; // 'hello'
```