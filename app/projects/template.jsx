"use client";

import PageTransition from "@/components/transition/PageTransition";

export default function Template({ children }){
    return (
        <PageTransition>{children}</PageTransition>
    );
}
