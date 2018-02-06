<?php

/**
 * @file
 * Template overrides as well as (pre-)process and alter hooks for the
 * annex theme.
 */


/**
 * Implements hook_css_alter().
 *
 * Disables @import CSS tags for compatibility with BrowserSync if css
 * aggregation is disabled – that way it won't affect the production site.
 *
 * @see https://github.com/BrowserSync/browser-sync/issues/10
 */
function annex_css_alter(&$css) {
  // Aggregation must be disabled.
  if (!variable_get('preprocess_css')) {
    // Disable @import on each css file.
    foreach ($css as &$item) {
      // Compatibility with disabling stylesheets in theme.info (263967).
      if (file_exists($item['data'])) {
        $item['preprocess'] = FALSE;
      }
    }
  }
}
