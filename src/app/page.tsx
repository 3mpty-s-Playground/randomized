"use client";
import { useRef } from "react";

// ✅ Import de GSAP & outils
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// ✅ Import de styles
import styles from "./page.module.scss";

export default function Home() {
    // 🎯 Références aux éléments DOM que GSAP doit cibler
    const titleRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        // ✂️ Découpe <h1> en caractères individuels (dans split.chars)
        const split = new SplitText(titleRef.current, {
            type: "chars",
        });

        // 🚀 Animation de chaque lettre avec GSAP
        gsap.to(split.chars, {
            scrollTrigger: {
                // Point de départ de la scroll zone
                trigger: mainRef.current,
                // Point de fin de la scroll zone
                endTrigger: titleRef.current,
                // L’animation commence quand le haut de <main> touche le haut du viewport
                start: "top top",
                // Se termine quand le bas de <h1> arrive à mi-hauteur du viewport
                end: "bottom 50%",
                scrub: true,
            },
            stagger: {
                // Délai entre chaque lettre
                each: 0.05,
                // Bascule aléatoire
                from: "random",
            },
            y: "-100%",
        });
    });

    return (
        <main ref={mainRef} className={styles.main}>
            <div className={styles.container}>
                <h1 ref={titleRef}>Random</h1>
            </div>
            <div className={styles.spacer} />
        </main>
    );
}
