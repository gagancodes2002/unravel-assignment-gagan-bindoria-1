import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {

    return (
        <div
            className="container py-6 mx-auto  min-h-screen"
        >
            {children}
        </div>
    )

}