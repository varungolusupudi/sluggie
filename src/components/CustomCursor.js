// Example: src/components/CustomCursor.js
import React, { useEffect } from 'react';
import '../style.css'; // Assuming you have styles defined in this CSS file

const CustomCursor = () => {
    useEffect(() => {
        const moveCursor = (e, cursorClass, delay) => {
            const cursor = document.querySelector(cursorClass);
            setTimeout(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }, delay);
        };

        const handleMouseMove = e => {
            moveCursor(e, '.cursor-small', 0);
            moveCursor(e, '.cursor-big', 100);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className="cursor-small"></div>
            <div className="cursor-big"></div>
        </>
    );
};

export default CustomCursor;
