import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['metric'],
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['subheader'],
        ['y_axis_format'],
        ['steps'],
        ['fill_background', 'render_without_header'],
      ],
    },
  ],
  controlOverrides: {
    y_axis_format: {
      label: t('Number format'),
    },
    steps: {
      isInt: false,
      validators: null,
      renderTrigger: false,
      default: '',
      label: t('Force Color JSON'),
      description: t('Force Color Steps by Range. Example: {"value":[0.95,1],"color":[ "red", "yellow", "green"]}'),
    },
  },
};
