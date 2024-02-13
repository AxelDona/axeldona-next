"use client"

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import "./horizontalScrollSection.scss"

export default function HorizontalScrollSection() {
    return (
        <>
            <div className="scroll-outside">
                <p>Scroll down</p>
            </div>
            <section className="scroll-wrapper">
                <div className="scroll-wrapper-screen"></div>
            </section>
            <div className="scroll-outside">
                <p>Scroll up</p>
            </div>
        </>
    )
}