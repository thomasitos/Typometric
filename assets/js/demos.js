export const demoPresets = [
    {
        font: "googlesansflex",
        fontSize: "24pt",
        lineHeight: "1.0",
        letterSpacing: "0pt",
        alignment: "left",
        axes: {
            slnt: "0 - (var(--char-index) / var(--char-total)) * 10", // Schwingt zwischen 400 und 900 (Bold)
            wdth: "151 - (var(--char-index) / var(--char-total)) * 151",     // Schwingt zwischen 70 und 150 (Wide)
            wght: "1000 - (var(--char-index) / var(--char-total)) * 1000"
        },
        translatex: "0px",
        translatey: "0px",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "0deg"
    },
    {
        font: "times",
        fontSize: "12pt",       // Erzeugt eine 6-stufige Treppe (12pt bis 32pt)
        lineHeight: "0.8",
        letterSpacing: "(var(--char-index)) * 0.1pt",
        alignment: "left",
        axes: {}, // Times hat keine variablen Achsen
        translatex: "0px",
        translatey: "0px",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "0deg"
    },
    {
        font: "garamond",
        fontSize: "(40 - (var(--char-index) / var(--char-total)) * 40) * 1pt", // Wächst über das Buch hinweg
        lineHeight: "3.0",
        letterSpacing: "0",
        alignment: "left",
        axes: {
        },
        translatex: "0px",
        translatey: "0px",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "0deg"
    },
    {
        font: "googlesansflex",
        fontSize: "mod(var(--char-index), 30) * 0.8pt",
        lineHeight: "2.5",
        letterSpacing: "0", // Abstand pulsiert mit der Schriftgröße
        alignment: "center",
        axes: {
            wght: "400",
            wdth: "mod(var(--char-index), 30) * 100"
        },
        translatex: "0px",
        translatey: "0px",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "0deg"
    },
    {
        font: "baskerville",
        fontSize: "15pt",
        lineHeight: "1.0",
        letterSpacing: "-100pt", // Abstand pulsiert mit der Schriftgröße
        alignment: "center",
        axes: {
        },
        translatex: "((cos(var(--char-index) * 6deg)) * (1 - (var(--char-index) / var(--char-total)) * 1) * -180) * 1pt",
        translatey: "((sin(var(--char-index) * 6deg)) * (1 - (var(--char-index) / var(--char-total)) * 1) * 180 + 200) * 1pt",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "0deg"
    },
    {
        font: "arial",
        fontSize: "10pt",
        lineHeight: "2.8",
        letterSpacing: "5pt", // Abstand pulsiert mit der Schriftgröße
        alignment: "right",
        axes: {
        },
        translatex: "0px",
        translatey: "(sin(var(--char-index) * 50deg) + 1) * 5pt",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "0deg"
    },
        {
        font: "robotserif",
        fontSize: "18pt",
        lineHeight: "1.0",
        letterSpacing: "5pt", // Abstand pulsiert mit der Schriftgröße
        alignment: "right",
        axes: {
        },
        translatex: "0px",
        translatey: "0px",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "(1 - (var(--char-index) / var(--char-total)) * 1) * 180deg"
    },
   {
        font: "centurygothic",
        fontSize: "15pt",
        lineHeight: "1.2",
        letterSpacing: "2pt", // Abstand pulsiert mit der Schriftgröße
        alignment: "left",
        axes: {
        },
        translatex: "0px",
        translatey: "0px",
        skewx: "(sin(var(--char-index) * 1deg)) * 45deg",
        skewy: "0deg",
        rotate: "0deg"
    },
       {
        font: "sciencegothic",
        fontSize: "20pt",
        lineHeight: "1.0",
        letterSpacing: "0", // Abstand pulsiert mit der Schriftgröße
        alignment: "left",
        axes: {
            wght: "mod(var(--word-index), 3) * 300"
        },
        translatex: "0px",
        translatey: "0px",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "0deg"
    },
    {
        font: "shapeshifter",
        fontSize: "26pt",
        lineHeight: "1.2",
        letterSpacing: "0", // Abstand pulsiert mit der Schriftgröße
        alignment: "left",
        axes: {
            wght:"(sin(var(--char-index) * 6deg) + 1) * 900 / 2"
        },
        translatex: "0",
        translatey: "0",
        skewx: "0deg",
        skewy: "0deg",
        rotate: "0deg"
    }
];