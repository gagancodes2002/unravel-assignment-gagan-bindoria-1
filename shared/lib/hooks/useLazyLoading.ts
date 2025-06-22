import { useEffect, useRef, useState } from "react"

interface useLazyLoadingProps {
    threshold?: number
    rootMarging?: string
}

const useLazyLoading = ({ threshold, rootMargin }: { threshold: number, rootMargin: string }) => {

    const [isIntersected, setIntersected] = useState(false);
    const observingElemRef = useRef<HTMLElement>(null);


    useEffect(() => {

        // Selecting first entry, the callback gives array but we are taking just the first entry
        const observer = new IntersectionObserver(([entry]) => {
            const { isIntersecting } = entry;

            if (isIntersecting) {
                setIntersected(true);
            }


        }, {
            threshold: threshold || 0.1
        })


        if (observingElemRef.current) {
            observer.observe(observingElemRef.current)
        }


        // Unmounting logic
        return () => {
            if (observingElemRef.current) {
                observer.unobserve(observingElemRef.current)
            }

        }



    }, [threshold, rootMargin])


    // Returning ref elemtn and flag for intersection
    return { observingElemRef, isIntersected }

}

// Todo : make a LazyComponentWrapper using the same hook if time allows

export default useLazyLoading;