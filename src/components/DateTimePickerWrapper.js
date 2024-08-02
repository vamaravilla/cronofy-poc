import React, { useEffect, useState } from "react";
import * as CronofyElements from "cronofy-elements";

const DateTimePickerWrapper = ({ options }) => {
    const [element, setElement] = useState(null);

    options.callback = (notification) => {
        if(notification?.notification?.type === 'slot_selected'){
            console.log('slot_selected');
        }
    };

    useEffect(() => {
        if (!element && options?.target_id) {
            setElement(
                CronofyElements.DateTimePicker(options)
            );
        }else{
            if(element && options?.target_id){
                element.update(options);
            }
        }
    }, [options,element]);

    return <div id="cronofy-date-time-picker" />;
};

export default DateTimePickerWrapper;