export const Button = {
    house_clean: "button-house_clean",
    spot_clean: "button-spot_clean",
    spot_clean__height___width_: "button-spot_clean__height___width_",
    stop_cleaning: "button-stop_cleaning",
    pause_cleaning: "button-pause_cleaning",
    resume_cleaning: "button-resume_cleaning",
    locate_robot: "button-locate_robot",
    update_status: "button-update_status",
    clear_errors: "button-clear_errors",
    shutdown: "button-shutdown",
    powercycle: "button-powercycle",
    reboot_esp: "button-reboot_esp",
}

export const Button_Gen3 = {
    ...Button,
    send_to_base: "button-send_to_base",

    start_manual_cleaning: "button-start_manual_cleaning",
    manual_drive_forward_up: "button-manual_drive_forward_up",
    manual_drive_backwards_up: "button-manual_drive_backwards_up",
    manual_drive_turn_left_up: "button-manual_drive_turn_left_up",
    manual_drive_turn_right_up: "button-manual_drive_turn_right_up",
    manual_drive_arc_left_up: "button-manual_drive_arc_left_up",
    manual_drive_arc_right_up: "button-manual_drive_arc_right_up",
    manual_drive_forward_down: "button-manual_drive_forward_down",
    manual_drive_backwards_down: "button-manual_drive_backwards_down",
    manual_drive_turn_left_down: "button-manual_drive_turn_left_down",
    manual_drive_turn_right_down: "button-manual_drive_turn_right_down",
    manual_drive_arc_left_down: "button-manual_drive_arc_left_down",
    manual_drive_arc_right_down: "button-manual_drive_arc_right_down",
    manual_drive_button_timeout: "button-manual_drive_button_timeout",
}

export const Button_Gen2 = {
    ...Button,
    send_to_start: "button-send_to_start",
}



export const Select = {
    logger: "select-logger_select",
}

export const Select_gen3 = {
    ...Select,
    navigation_mode: "select-navigation_mode",
}



export const BinarySensor = {
    usb_connected: "binary_sensor-usb_connected",
    battery_over_temp: "binary_sensor-battery_over_temp",
    charging_active: "binary_sensor-charging_active",
    charging_enabled: "binary_sensor-charging_enabled",
    confident_on_fuel: "binary_sensor-confident_on_fuel",
    on_reserved_fuel: "binary_sensor-on_reserved_fuel",
    empty_fuel: "binary_sensor-empty_fuel",
    battery_failure: "binary_sensor-battery_failure",
    ext_power_present: "binary_sensor-ext_power_present",
    thermistor_present: "binary_sensor-thermistor_present",
}

export const Sensor = {
    fuel_percent: "sensor-fuel_percent",
    battery_temp_c_avg: "sensor-battery_temp_c_avg",
    battery_voltage_v: "sensor-battery_voltage_v",
    external_voltage_v: "sensor-external_voltage_v",
    charger_mah: "sensor-charger_mah",
    discharge_mah: "sensor-discharge_mah",
    filter_change_time: "sensor-filter_change_time",
    brush_change_time: "sensor-brush_change_time",
    dirt_bin_alert_reminder: "sensor-dirt_bin_alert_reminder", 
    current_dirt_bin_runtime: "sensor-current_dirt_bin_runtime",
    number_of_full_dust_bin_cleanings: "sensor-number_of_full_dust_bin_cleanings",
    battery_cycles: "sensor-battery_cycles",
    last_cleaning_duration: "sensor-last_cleaning_duration",
}

export const ESPNumber = {
    spot_clean_width: "number-spot_clean_width",
    spot_clean_height: "number-spot_clean_height",
}

export const ESPText = {
    timezone: "text-timezone",
    schedule: "text-scheduleset",
}

export const Switch = {
    test_mode: "switch-test_mode",
    play_extra_sounds: "switch-play_extra_sounds",

    click_sounds: "switch-click_sounds",
    led: "switch-led",
    wall_enable: "switch-wall_enable", 
    eco_mode: "switch-eco_mode", 
    intenseclean: "switch-intenseclean", 
    wifi: "switch-wifi", 
    melody_sounds: "switch-melody_sounds", 
    warning_sounds: "switch-warning_sounds", 
    bin_full_detect: "switch-bin_full_detect", 
}

export const Switch_gen2 = {
    ...Switch,
    stealthled: "switch-stealthled",
    autoshutdown: "switch-autoshutdown",
    robot_schedule: "switch-robot_schedule"
}

export const TextSensor = {
    last_cleaning_time: "text_sensor-last_cleaning_time",
    last_cleaning_type: "text_sensor-last_cleaning_type",
    robot_error: "text_sensor-robot_error",
    robot_alert: "text_sensor-robot_alert",
    serial_number: "text_sensor-serial_number",
    model: "text_sensor-model",
    software: "text_sensor-software",
    ui_state: "text_sensor-ui_state",
    nbs_time: "text_sensor-nbs_time",
}