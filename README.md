# material-expressive-react

React wrappers around Material 3 web components from `@material/web`.

## Install

```bash
npm i material-expressive-react @material/web
```

## Usage

```tsx
import {FilledButton, Icon} from 'material-expressive-react';
import {applyMaterialTypography} from 'material-expressive-react/theme';

applyMaterialTypography();

export function App() {
  return (
    <FilledButton onClick={() => console.log('clicked')}>
      <Icon slot="icon">upload</Icon>
      Upload
    </FilledButton>
  );
}
```

