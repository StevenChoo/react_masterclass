# JSX vs Compiled JavaScript

This project demonstrates the difference between JSX syntax and its compiled JavaScript output using React's `_jsx` and `_jsxs` functions.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

- **Button.tsx** - Component written in JSX syntax
- **UserForm.tsx** - Component written using compiled `_jsxs()` and `_jsx()` functions
- **App.tsx** - Main application showcasing both approaches

## Key Concepts

### JSX Syntax
JSX allows you to write HTML-like syntax in JavaScript, which gets compiled to function calls.

### Compiled Output
The `_jsx` and `_jsxs` functions are what JSX compiles to:
- `_jsx()` - For single child or self-closing elements
- `_jsxs()` - For elements with multiple children

## Exercise Goals

1. Compare JSX syntax with its compiled equivalent
2. Understand how React transforms JSX under the hood
3. See how both approaches work together in a real application

## Tech Stack

- React + TypeScript
- Vite
- CSS
