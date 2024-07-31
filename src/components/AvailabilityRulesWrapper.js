import React, { useEffect, useState } from "react";
import * as CronofyElements from "cronofy-elements";

const AvailabilityRulesWrapper = ({ options }) => {
    const [element, setElement] = useState(null);

    console.log('AvailabilityRulesWrapper - options: ', JSON.stringify(options));

    useEffect(() => {
        if (!element) {
            setElement(
                CronofyElements.AvailabilityRules(options)
            );
        }
    }, []);

    useEffect(() => {
        if (element) {
            element.update(options);
        }
    }, [options]);

    return <div id="cronofy-availability-rules" />;
};

export default AvailabilityRulesWrapper;