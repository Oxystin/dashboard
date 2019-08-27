import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: t('GROUP BY'),
      description: t('Use this section if you want a query that aggregates'),
      expanded: true,
      controlSetRows: [
        ['groupby'],
        ['metrics'],
        ['percent_metrics'],
        ['timeseries_limit_metric', 'row_limit'],
        ['include_time', 'order_desc'],
      ],
    },
    {
      label: t('NOT GROUPED BY'),
      description: t('Use this section if you want to query atomic rows'),
      expanded: true,
      controlSetRows: [
        ['all_columns'],
        ['order_by_cols'],
        ['row_limit', null],
      ],
    },
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Advanced'),
      expanded: false,
      controlSetRows: [
        ['clear_table_element'],
      ],
    },
    {
      label: t('Options'),
      expanded: true,
      controlSetRows: [
        ['table_timestamp_format'],
        ['page_length', null],
        ['include_search', null],
        ['show_progress_bar','align_pn', 'color_pn'],
        ['table_filter','clear_table_filter'],
      ],
    },
  ],
  controlOverrides: {
    metrics: {
      validators: [],
    },
  },
};
