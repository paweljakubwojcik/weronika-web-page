import { useEffect, useState } from 'react'


/**
 * 
 * @param {*} options 
 * @param {*} callback 
 * @returns [setRef , visible]
 */
export const useIntersectionObserver = (options, callback) => {
    const [ref, setRef] = useState(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting)
            if (callback)
                callback(entry)
        }, options)
        if (ref)
            observer.observe(ref)

        return () => {
            if (ref)
                observer.unobserve(ref)
        }

    }, [ref, visible, options, callback])


    return [setRef, visible]

}