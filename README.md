# material-expressive-react

React wrappers for Material 3 web components, built on top of `@material/web`.

This project follows the official Google Material Design principles and component guidance:
https://m3.material.io/components

Developer docs (Storybook)
- Landing page: https://prudhviraj5.github.io/material-expressive-react/
- Storybook: https://prudhviraj5.github.io/material-expressive-react/storybook/
- API Docs (MDX): https://prudhviraj5.github.io/material-expressive-react/docs/

## Why this library

Material Web (`@material/web`) is the official set of Material Design web components. However, there isn't an official, first-class React component library for the Material 3 “Expressive” direction that you can drop into a React app today.

In practice, teams wanting “Material 3 Expressive” in React typically run into a gap:
- Material Web focuses on the core Material 3 component set, and “Expressive” guidance is still evolving.
- There’s no official Google-supported React wrapper that tracks the design guidance and exposes ergonomic React APIs.
- You end up hand-wrapping Custom Elements, dealing with event/prop mismatches, typing, and documentation.

If you want the Material 3 expressive visual language in React right now, this library is a pragmatic alternative:
- Use the official Google-authored web components as the underlying implementation.
- Consume them with ergonomic React components, typed props, and Storybook-based API docs.
- Keep your app aligned with Material 3 guidance while avoiding the friction of hand-wrapping Custom Elements yourself.

Note: this project is not affiliated with or endorsed by Google.

## Install

```bash
npm i material-expressive-react @material/web
```

Peer dependencies
- `react` >= 18
- `react-dom` >= 18

## Quick start

1) Ensure you load fonts/icons you want (example uses Roboto + Material Symbols):

```html
<!-- Roboto -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

<!-- Material Symbols (for <Icon/>) -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0" rel="stylesheet" />
```

2) Apply Material typography once at app startup:

```tsx
import {applyMaterialTypography} from 'material-expressive-react/theme';

// If you're in an SSR framework, call this in a client-only place (e.g. useEffect).
applyMaterialTypography();
```

3) Use components:

```tsx
import {Button, Icon} from 'material-expressive-react';

export function App() {
  return (
    <Button onClick={() => console.log('clicked')}>
      <Icon slot="icon">upload</Icon>
      Upload
    </Button>
  );
}
```

## Slots

Many Material Web components use slots (e.g. `slot="icon"`, `slot="headline"`).

```tsx
import {Button} from 'material-expressive-react/button';
import {Icon} from 'material-expressive-react/icon';

export function SaveButton() {
  return (
    <Button>
      <Icon slot="icon">save</Icon>
      Save
    </Button>
  );
}
```

## Events

Custom Element events don’t always behave like React synthetic events. These wrappers re-emit selected events via `addEventListener` and expose them as props.

Example (menu close event):

```tsx
import {Menu, MenuItem} from 'material-expressive-react/menu';

export function ExampleMenu() {
  return (
    <Menu
      anchor="menu-anchor"
      open
      onCloseMenu={() => {
        // close-menu
      }}
    >
      <MenuItem>
        <div slot="headline">Apple</div>
      </MenuItem>
    </Menu>
  );
}
```

## Date / time pickers

This repo includes React-first date/time pickers (not part of `@material/web`).

```tsx
import {DatePicker} from 'material-expressive-react/datetime';

export function ExampleDate() {
  return <DatePicker variant="modal" selectionMode="single" onValueChange={(v) => console.log(v)} />;
}
```

## Import patterns (bundle-friendly)

You can import from the root:

```ts
import {Button} from 'material-expressive-react';
```

Or import from a group entrypoint:

```ts
import {Button} from 'material-expressive-react/button';
import {Textfield} from 'material-expressive-react/textfield';
```

## SSR / Next.js notes

These components wrap Custom Elements.
- Render them from client components (or behind a client-only boundary) in SSR frameworks.
- Element registration happens in the browser via dynamic import.

If you use Next.js App Router, place these imports in a `"use client"` file.

## Roadmap

ToDo
- [ ] Carousels

Enhance
- [ ] Loading indicators
- [ ] TimeRangeComponent
- [ ] Animations
