import React, { useEffect, useState } from "react";
import * as CronofyElements from "cronofy-elements";

const AgendaWrapper = ({ options }) => {
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (!element && options?.target_id) {
            setElement(
                CronofyElements.Agenda(options)
            );
        }else{
            if(element && options?.target_id){
                element.update(options);
            }
        }
    }, [options,element]);

    return <div id="cronofy-agenda" />;
};

export default AgendaWrapper;