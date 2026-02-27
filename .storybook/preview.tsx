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

        const groupKeyA = String(groupA).toLowerCase();
        const groupKeyB = String(groupB).toLowerCase();

        if (groupKeyA === 'chips' && groupKeyB === 'chips') {
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

        if (groupKeyA === 'dialog' && groupKeyB === 'dialog') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllDialogs', 'Dialog'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupKeyA === 'fab' && groupKeyB === 'fab') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllFabs', 'Fab', 'BrandedFab'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupKeyA === 'icon-button' && groupKeyB === 'icon-button') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = [
            'All IconButtons',
            'IconButton',
          ];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;

          if (keyA === 'IconButton' && keyB === 'IconButton') {
            const nameOrder = ['Default', 'Outlined', 'Filled', 'FilledTonal', 'Docs'];
            const nxA = nameOrder.indexOf(String(nameA));
            const nxB = nameOrder.indexOf(String(nameB));
            const nrA = nxA === -1 ? 999 : nxA;
            const nrB = nxB === -1 ? 999 : nxB;
            if (nrA !== nrB) return nrA - nrB;
          }
        }

        if (groupKeyA === 'list' && groupKeyB === 'list') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllLists', 'List', 'IconListItem', 'ImageListItem'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupKeyA === 'progress' && groupKeyB === 'progress') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllProgressIndicators', 'CircularProgress', 'LinearProgress'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupKeyA === 'slider' && groupKeyB === 'slider') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['Slider'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;

          if (keyA === 'Slider' && keyB === 'Slider') {
            const nameOrder = ['Default', 'Docs'];
            const nxA = nameOrder.indexOf(String(nameA));
            const nxB = nameOrder.indexOf(String(nameB));
            const nrA = nxA === -1 ? 999 : nxA;
            const nrB = nxB === -1 ? 999 : nxB;
            if (nrA !== nrB) return nrA - nrB;
          }
        }

        if (groupKeyA === 'switch' && groupKeyB === 'switch') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['Switch'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;

          if (keyA === 'Switch' && keyB === 'Switch') {
            const nameOrder = ['Default', 'Icons'];
            const nxA = nameOrder.indexOf(String(nameA));
            const nxB = nameOrder.indexOf(String(nameB));
            const nrA = nxA === -1 ? 999 : nxA;
            const nrB = nxB === -1 ? 999 : nxB;
            if (nrA !== nrB) return nrA - nrB;
          }
        }

        if (groupKeyA === 'tabs' && groupKeyB === 'tabs') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['Tabs'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;

          if (keyA === 'Tabs' && keyB === 'Tabs') {
            const nameOrder = ['Default', 'PrimaryTab', 'SecondaryTab', 'Docs'];
            const nxA = nameOrder.indexOf(String(nameA));
            const nxB = nameOrder.indexOf(String(nameB));
            const nrA = nxA === -1 ? 999 : nxA;
            const nrB = nxB === -1 ? 999 : nxB;
            if (nrA !== nrB) return nrA - nrB;
          }
        }

        if (groupKeyA === 'textfield' && groupKeyB === 'textfield') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['Textfield'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;

          if (keyA === 'Textfield' && keyB === 'Textfield') {
            const nameOrder = ['Default', 'Docs'];
            const nxA = nameOrder.indexOf(String(nameA));
            const nxB = nameOrder.indexOf(String(nameB));
            const nrA = nxA === -1 ? 999 : nxA;
            const nrB = nxB === -1 ? 999 : nxB;
            if (nrA !== nrB) return nrA - nrB;
          }
        }

        if (groupKeyA === 'divider' && groupKeyB === 'divider') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['AllDividers', 'Divider'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupKeyA === 'menu' && groupKeyB === 'menu') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['Menu', 'MenuItem', 'SubMenu'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        if (groupKeyA === 'button' && groupKeyB === 'button') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['All Buttons', 'Button', 'SplitButton', 'ToggleButton'];
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

        if (groupKeyA === 'button-group' && groupKeyB === 'button-group') {
          const keyA = String(titleA).split('/')[1] ?? '';
          const keyB = String(titleB).split('/')[1] ?? '';
          const order = ['ConnectedButtonGroup', 'OutlinedSegmentedButtonSet'];
          const ixA = order.indexOf(keyA);
          const ixB = order.indexOf(keyB);
          const rankA = ixA === -1 ? 999 : ixA;
          const rankB = ixB === -1 ? 999 : ixB;
          if (rankA !== rankB) return rankA - rankB;
        }

        const titleCmp = String(titleA).localeCompare(String(titleB));
        if (titleCmp !== 0) return titleCmp;
        return String(nameA).localeCompare(String(nameB));
      },
    },
  }
};

export default preview;
