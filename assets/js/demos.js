export const demoPresets = [
    {
        font: "googlesansflex",
        fontSize: "16pt",
        lineHeight: "1.0",
        letterSpacing: "0pt",
        alignment: "left",
        axes: {
            slnt: "(mod(var(--char-index), 10) * -10 / 10)", // Schwingt zwischen 400 und 900 (Bold)
            wdth: "(mod(var(--char-index), 10) * 10) + 50"     // Schwingt zwischen 70 und 150 (Wide)
        }
    },
    {
        font: "times",
        fontSize: "(24 - (var(--char-index) / var(--char-total)) * 24) * 1pt",       // Erzeugt eine 6-stufige Treppe (12pt bis 32pt)
        lineHeight: "0.9",
        letterSpacing: "0pt",
        alignment: "center",
        axes: {} // Times hat keine variablen Achsen
    },
    {
        font: "unrial",
        fontSize: "16pt", // Wächst über das Buch hinweg
        lineHeight: "1.0",
        letterSpacing: "0",
        alignment: "left",
        axes: {
            wght: "(sin(var(--char-index) * 16deg) + 1) * 1000 / 2", // Wird progressiv fetter (100 -> 900)
        }
    },
    {
        font: "googlesansflex",
        fontSize: "mod(var(--char-index), 30) * 0.8pt",
        lineHeight: "1.3",
        letterSpacing: "(cos(var(--char-index) * 24deg) + 1) * 1.5pt", // Abstand pulsiert mit der Schriftgröße
        alignment: "center",
        axes: {
            wght: "400",
            wdth: "mod(var(--char-index), 30) * 151 / 12"
        }
    },
    {
        font: "times",
        fontSize: "(mod(var(--char-index), 30) + 10)* 0.8pt",
        lineHeight: "0.5",
        letterSpacing: "(cos(var(--char-index) * 24deg) + 1) * 1.5pt", // Abstand pulsiert mit der Schriftgröße
        alignment: "center",
        axes: {
        }
    }
];