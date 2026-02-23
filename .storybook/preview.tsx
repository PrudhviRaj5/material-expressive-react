import React from 'react';

import '../src/theme/storybook.css';
import {applyMaterialTypography} from '../src/theme/applyMaterialTypography';

applyMaterialTypography();

const preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: (a, b) => {
        const titleA = a?.title ?? a?.[1]?.title ?? '';
        const titleB = b?.title ?? b?.[1]?.title ?? '';
        const nameA = a?.name ?? a?.[1]?.name ?? '';
        const nameB = b?.name ?? b?.[1]?.name ?? '';

        const groupA = String(titleA).split('/')[0] ?? '';
        const groupB = String(titleB).split('/')[0] ?? '';

        if (groupA === 'chips' && groupB === 'chips') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = [
            'AllChipsets',
            'ChipSet',
            'AssistChip',
            'FilterChip',
            'InputChip',
            'SuggestionChip',
          ];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'dialog' && groupB === 'dialog') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllDialogs', 'Dialog'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'fab' && groupB === 'fab') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllFabs', 'Fab', 'BrandedFab'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'icon-button' && groupB === 'icon-button') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = [
            'AllIconButtons',
            'IconButton',
            'OutlinedIconButton',
            'FilledIconButton',
            'FilledTonalIconButton',
          ];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'list' && groupB === 'list') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllLists', 'List', 'ListItem'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'progress' && groupB === 'progress') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllProgressIndicators', 'CircularProgress', 'LinearProgress'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'slider' && groupB === 'slider') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllSliders', 'Slider'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'switch' && groupB === 'switch') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllSwitches', 'Switch'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'textfield' && groupB === 'textfield') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllTextFields', 'FilledTextField', 'OutlinedTextField'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'divider' && groupB === 'divider') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllDividers', 'Divider'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'menu' && groupB === 'menu') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllMenus', 'Menu', 'MenuItem', 'SubMenu'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupA === 'button' && groupB === 'button') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['All Buttons', 'Button'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;

          if (keyA === 'Button' && keyB === 'Button') {
            const nameOrder = ['Elevated', 'Filled', 'FilledTonal', 'Outlined', 'Docs'];
            const nxA = nameOrder.indexOf(String(nameA));
            const nxB = nameOrder.indexOf(String(nameB));
            const nrA = nxA === -1 ? 999 : nxA;
            const nrB = nxB === -1 ? 999 : nxB;
            if (nrA !== nrB) return nrA - nrB;
          }
        }

        const titleCmp = String(titleA).localeCompare(String(titleB));
        if (titleCmp !== 0) return titleCmp;
        return String(nameA).localeCompare(String(nameB));
      },
    },
  }
};

export default preview;
