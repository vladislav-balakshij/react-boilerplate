import React from 'react';
import { select } from '@storybook/addon-knobs';
import { LoadingOverlay } from '../../src/components/loaders/loadingOverlay/LoadingOverlay';
import { OverlayColor } from '../../src/components/overlay/Overlay';

export default {
  component: LoadingOverlay,
  title: 'LoadingOverlay',
};

const colorSelectOptions = {
  [OverlayColor.primary]: OverlayColor.primary,
  [OverlayColor.secondary]: OverlayColor.secondary,
};

export const Sandbox = () => (
  <div>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type
    specimen book. It has survived not only five centuries, but also the leap
    into electronic typesetting, remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset
    sheets containing Lorem Ipsum passages, and more recently with
    desktop publishing software like Aldus PageMaker including versions of
    Lorem Ipsum.
    <LoadingOverlay
      color={select('color', colorSelectOptions, OverlayColor.primary)}
    />
  </div>
);
