import React, { useEffect, useState } from "react";
import * as CronofyElements from "cronofy-elements";

const AvailabilityViewerWrapper = ({ options }) => {
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (!element && options?.target_id) {
            setElement(
                CronofyElements.AvailabilityViewer(options)
            );
        }else{
            if(element && options?.target_id){
                element.update(options);
            }
        }
    }, [options,element]);

    return <div id="cronofy-availability-viewer" />;
};

export default AvailabilityViewerWrapper;