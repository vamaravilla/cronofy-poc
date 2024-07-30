import React, { useEffect, useState } from "react";
import * as CronofyElements from "cronofy-elements";

const AvailabilityViewerWrapper = ({ options }) => {
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (!element) {
            setElement(
                CronofyElements.AvailabilityViewer(options)
            );
        }
    }, []);

    useEffect(() => {
        if (element) {
            element.update(options);
        }
    }, [options]);

    return <div id="cronofy-availability-viewer" />;
};

export default AvailabilityViewerWrapper;