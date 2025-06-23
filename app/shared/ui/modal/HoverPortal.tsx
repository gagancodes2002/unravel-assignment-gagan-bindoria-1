import clsx from 'clsx';
import React, { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ({ children, portalContent, className, id }: { children: ReactNode, portalContent: ReactNode, className: string, id?: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const toolTipRef = useRef<HTMLDivElement>(null);
    const [hasRendered, setHasRendered] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });


    useEffect(() => {

        // Selecting first render
        if (isVisible && !hasRendered && toolTipRef.current) {
            setHasRendered(true);

            const constrainedPos = getConstrainedPosition(lastMousePos);
            setPosition(constrainedPos);
        }

    }, [isVisible, hasRendered])



    const getConstrainedPosition = ({ x, y }: { x: number, y: number }) => {

        if (!toolTipRef.current) {
            return {
                x,
                y
            }
        }

        const windowBounds = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const resultX = x
        const resultY = y

        let constrainedX = resultX;
        let constrainedY = resultY;

        const {
            width,
            height,
        } = toolTipRef?.current?.getBoundingClientRect();

        // if going in too right 
        if (resultX + width > windowBounds.width) {
            constrainedX = windowBounds.width - width;
        }

        // if going too bottom  
        if (resultY + height > windowBounds.height) {
            constrainedY = windowBounds.height - height
        }

        // if going too left  
        if (resultX < 0) {
            constrainedX = 0
        }

        // if going too top
        if (resultY < 0) {
            constrainedY = 0
        }



        return {
            x: constrainedX,
            y: constrainedY,
        }

    }

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        setIsVisible(true);

        setLastMousePos({ x: e.clientX, y: e.clientY });
        let updatedPos = getConstrainedPosition({ x: e.clientX, y: e.clientY });
        setPosition(updatedPos);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        let updatedPos = getConstrainedPosition({ x: e.clientX, y: e.clientY });
        setLastMousePos({ x: e.clientX, y: e.clientY });
        setPosition(updatedPos);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        // Check if we're really leaving the element
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            setIsVisible(false);
        }
    };

    return (
        <>
            {/* Wrap the children  */}
            <div
                className={className}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>

            {/* hover content */}
            {isVisible && createPortal(
                <div
                    ref={toolTipRef}
                    draggable
                    style={{
                        left: position.x,
                        top: position.y,
                    }}
                    className={clsx("fixed bg-gray-900 transition-all duration-300  text-white p-4 rounded-lg shadow-xl z-50 pointer-events-none",
                        hasRendered ? 'visible' : 'invisible'
                    )}
                >
                    {portalContent}
                </div>,
                document.body,
                id
            )}
        </>
    );
}

