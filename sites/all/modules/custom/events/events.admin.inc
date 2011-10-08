<?php

function events_admin() {
  $form = array();
  // Loop through branches
  $branches = branches_get_branches();
  foreach($branches as $b) {
    $class = str_replace(' ', '-', strtolower($b->title));
    $name = 'events-' . $class;
    $form[$name] = array(
      '#title' => $b->title,
      '#type' => 'textfield',
      '#size' => 7,
      '#max_length' => 7,
      '#default_value' => variable_get($name, '#36C'),
    );
  }
  $form['#submit'][] = 'events_admin_submit';
  return system_settings_form($form);
}

function events_admin_validate($form, &$form_state) {
  foreach($form_state['values'] as $name => $value) {
    if(substr($name, 0, 6) == 'events') {
      $match = array();
      if(!(preg_match("(^#([0-9A-F]{3}$)|([0-9A-F]{6}$))", $value, $match))) {
        form_set_error($name, 'Hex must be valid.');
      }
    }
  }
}


function events_admin_submit($form, &$form_state) {
  // When the form is submitted, reprint the css
  $file = fopen(drupal_get_path('module', 'events') . '/css/colours.css', 'w');
  foreach($form_state['values'] as $name => $value) {
    if(substr($name, 0, 6) == 'events') {
      $string = ".events-key .$name,\n.$name .fc-event-skin,\n.$name.fc-event,\n.$name .fc-event-time {\n  background-color: $value;\n  border-color: $value;\n  border-style: solid;\n}\n";
      fwrite($file, $string);
    }
  }
  fclose($file);
}
