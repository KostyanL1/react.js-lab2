import React from 'react';
import { usePermission } from './usePermission';

function ExampleComponent() {
    const { hasPermission, isChecking, error } = usePermission('geolocation');

    if (isChecking) {
        return <p>Checking permissions...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {hasPermission ? (
                <p>You have granted geolocation permissions.</p>
            ) : (
                <p>You have not granted geolocation permissions.</p>
            )}
        </div>
    );
}

export default ExampleComponent;
