import { useCallback, useRef } from "react"
import { TimerOptions } from "timers";

// Generic interface that accepts any function type
interface ThrottlingProps<T extends (...args: any[]) => any> {
    callback: T
    delay: number
}

const useThrottling = <T extends (...args: any[]) => any>({
    callback,
    delay,
}: ThrottlingProps<T>) => {
    const lastRun = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)


    //useCallback(function,[deps])
    return useCallback(((...args: Parameters<T>) => {

        // Register entry time 
        const now = Date.now()

        // Checking if enough time has been passed or not
        if (now - lastRun.current >= delay) {
            // update the last run time
            lastRun.current = Date.now()
            // call the callback
            callback(...args)
        }
        else {
            // If there is already a execution in stack then clear it first
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // run a new timeout with compensated time means : timePassed = (now - lastRunTime), so we deduct this timePassed from the delay to compensate 
            timeoutRef.current = setTimeout(() => {
                // update the last run time again
                lastRun.current = Date.now()
                callback(...args)
                // Clearning the timeoutRef
                timeoutRef.current = null
            }, delay - (now - lastRun.current))
        }
    }) as T, [callback, delay])
}

export default useThrottling