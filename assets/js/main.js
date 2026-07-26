import { formulaPresets } from './formulas.js';
import { pagePresets } from './pages.js'
import { demoPresets } from './demos.js'

const editor = document.getElementById('editor');
const canvas = document.getElementById('book-canvas');
const fontSizeInput = document.getElementById('font-size-input');
const lineHeightInput = document.getElementById('line-height-input');
const letterSpacingInput = document.getElementById('letter-spacing-input');
const fontSelect = document.getElementById('font-select');
const axesContainer = document.getElementById('axes-container');
const dynamicEffectsStyle = document.getElementById('dynamic-effects');
const variableSettings = document.getElementById('variable-settings');
const fontSizeSelect = document.getElementById('font-size-select');
const btnTabEditor = document.getElementById('btn-tab-editor');
const btnTabStyles = document.getElementById('btn-tab-styles');
const btnTabPages = document.getElementById('btn-tab-pages');
const btnTabSettings = document.getElementById('btn-tab-settings');
const textEditorPanel = document.getElementById('text-editor');
const stylesPanel = document.getElementById('styles');
const pagesPanel = document.getElementById('pages');
const settingspanel = document.getElementById('settings')
const alignmentRadios = document.querySelectorAll('input[name="alignment"]');
const marginLeftInput = document.getElementById('margin-left-input');
const marginRightInput = document.getElementById('margin-right-input');
const pagePresetSelect = document.getElementById('page-preset-select');
const pageHeightInput = document.getElementById('page-height-input');
const pageWidthInput = document.getElementById('page-width-input');
const pageMarginTopInput = document.getElementById('page-margin-top-input');
const pageMarginBottomInput = document.getElementById('page-margin-bottom-input');
const pageMarginLeftInput = document.getElementById('page-margin-left-input');
const pageMarginRightInput = document.getElementById('page-margin-right-input');
const zoomInput = document.getElementById('zoom-input');
const exportPdfButtons = document.querySelectorAll('#btn-export-pdf-1, #btn-export-pdf-2, #btn-export-pdf-3');
const btnNewPage = document.getElementById('btn-new-page');
const demoBtn = document.getElementById('demo');
const translateXInput = document.getElementById('translate-x-input');
const translateYInput = document.getElementById('translate-y-input');


let typingTimeout;


// Initialisierung des Seiten-Dropdowns
function initPagePresetsDropdown() {
    pagePresetSelect.innerHTML = '';
    
    // "Benutzerdefiniert"-Eintrag als Standard-Fallback
    const customOption = document.createElement('option');
    customOption.textContent = "Custom";
    customOption.value = "-1";
    pagePresetSelect.appendChild(customOption);

    // Presets ins Dropdown laden
    pagePresets.forEach((preset, index) => {
        const option = document.createElement('option');
        option.textContent = preset.name;
        option.value = index;
        
        // Da dein HTML mit 148x210 startet (A5), wählen wir A5 direkt voraus
        if (preset.width === "148mm" && preset.height === "210mm") {
            option.selected = true;
        }
        pagePresetSelect.appendChild(option);
    });

    // Event-Listener: Wenn ein Preset gewählt wird
    pagePresetSelect.addEventListener('change', (event) => {
        const index = parseInt(event.target.value);
        if (index >= 0) {
            pageWidthInput.value = pagePresets[index].width;
            pageHeightInput.value = pagePresets[index].height;
            triggerBookRender(); // Buch mit neuer Größe neu rendern
        }
    });

    // Wenn der Nutzer manuell tippt, Dropdown auf "Custom" stellen
    pageWidthInput.addEventListener('input', () => {
        pagePresetSelect.value = "-1";
        triggerBookRender();
    });
    pageHeightInput.addEventListener('input', () => {
        pagePresetSelect.value = "-1";
        triggerBookRender();
    });
}

// DIE NEUE NAVIGATION-FUNKTION:
function initTabNavigation() {
    // Verknüpfe jeden Button direkt mit seinem zugehörigen Panel
    // Achtung bei 'settingspanel': Hier hast du im Const-Block ein kleines 'p' verwendet.
    const tabs = [
        { button: btnTabEditor, panel: textEditorPanel },
        { button: btnTabStyles, panel: stylesPanel },
        { button: btnTabPages, panel: pagesPanel },
        // { button: btnTabSettings, panel: settingspanel } //
    ];

    tabs.forEach(activeTab => {
        activeTab.button.addEventListener('click', () => {
            // 1. Schleife: Erstmal alle Panels verstecken und alle Buttons deaktivieren
            tabs.forEach(tab => {
                tab.panel.classList.add('hidden');
                tab.button.classList.remove('active');
            });

            // 2. Aktivierung: Nur das angeklickte Tab sichtbar und aktiv machen
            activeTab.panel.classList.remove('hidden');
            activeTab.button.classList.add('active');
        });
    });
}

// Funktion zum Verarbeiten und Anwenden des Zoom-Werts
function applyZoom(rawValue) {
    // Extrahiert nur die Zahlen aus dem String (z.B. "85%" -> 85)
    let zoomValue = parseInt(rawValue, 10);

    // Fallback falls der Input leer war oder keine Zahl enthielt
    if (isNaN(zoomValue)) {
        zoomValue = 100;
    }

    // Setze Grenzen (z. B. minimal 30% und maximal 150% Zoom)
    zoomValue = Math.max(10, Math.min(200, zoomValue));

    // CSS-Variable auf dem Canvas updaten
    canvas.style.setProperty('--preview-zoom', `${zoomValue}%`);

    // Das Input-Feld wieder sauber mit Prozentzeichen befüllen
    zoomInput.value = `${zoomValue}%`;
}


// 1. DIE SCHRIFTEN-DATENBANK
// Du musst hier nur noch 'name', 'cssValue' und (falls variabel) den 'url'-Pfad zur Datei angeben!
const fontConfig = {
    "arial": {
        name: "Arial",
        cssValue: "Arial, sans-serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "baskerville": {
        name: "Baskerville",
        cssValue: "Baskerville, serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "centurygothic": {
        name: "Century Gothic",
        cssValue: "'Century Gothic', sans-serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "couriernew": {
        name: "Courier New",
        cssValue: "'Courier New', Courier, monospace"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "garamond": {
        name: "Garamond",
        cssValue: "Garamond, serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "georgia": {
        name: "Georgia",
        cssValue: "'Georgia', serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "impact": {
        name: "Impact",
        cssValue: "Impact, sans-serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "palatino": {
        name: "Palatino",
        cssValue: "Palatino, 'Palatino Linotype', serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "times": {
        name: "Times New Roman",
        cssValue: "'Times New Roman', serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "trebuchetms": {
        name: "Trebuchet MS",
        cssValue: "'Trebuchet MS', sans-serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "verdana": {
        name: "Verdana",
        cssValue: "Verdana, sans-serif"
        // Keine URL = statische Systemschrift, keine Achsen zu scannen
    },
    "licht": {
        name: "Licht",
        cssValue: "Licht, sans-serif",
        url: "assets/fonts/00_Licht_Pino_0_0VF.ttf"
    },
    "opak": {
        name: "Opak",
        cssValue: "Opak, sans-serif",
        url: "assets/fonts/00_MattiSiemoneit_Opak_500VF.ttf"
    },
    "scan": {
        name: "Scan",
        cssValue: "Scan, sans-serif",
        url: "assets/fonts/00_kristinesørensen_Scan_200VF.ttf"
    },
    "unrial": {
        name: "Unrial",
        cssValue: "Unrial, sans-serif",
        url: "assets/fonts/00_RoiBetzalel_Unrial.ttf"
    },
    "googlesansflex": {
        name: "Google Sans Flex",
        cssValue: "'GoogleSansFlex', serif",
        url: "assets/fonts/GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf" // Pfad zu deiner lokalen Datei anpassen!
    },
    "digitaluhr": {
        name: "Digitaluhr",
        cssValue: "Digitaluhr, sans-serif",
        url: "assets/fonts/DigitalUhr6VF.ttf"
    },
    "shapeshifter": {
        name: "ShapeShifter",
        cssValue: "ShapeShifter, sans-serif",
        url: "assets/fonts/ShapeShifter_2Termin_1Übung_2VF.ttf"
    },
    "decovar": {
        name: "Decovar",
        cssValue: "'Decovar', serif",
        url: "assets/fonts/DecovarAlpha-VF.ttf" // Pfad zu deiner lokalen Datei anpassen!
    },
};

// 2. DER AUTOMATISCHE ACHSEN-SCANNER
// Diese Funktion lädt die lokalen Dateien und liest die Achsen aus, bevor das Interface startet
async function autoDetectLocalAxes() {
    for (const key in fontConfig) {
        const font = fontConfig[key];
        
        // Wenn ein URL-Pfad existiert, lesen wir die Datei aus
        if (font.url) {
            try {
                // Holt die Schriftdatei vom lokalen Server als Binärdaten
                const response = await fetch(font.url);
                const arrayBuffer = await response.arrayBuffer();
                
                // opentype.js parst die Datei
                const parsedFont = opentype.parse(arrayBuffer);
                font.axes = []; // Array für gefundene Achsen erstellen

                if (parsedFont.tables && parsedFont.tables.fvar && parsedFont.tables.fvar.axes) {
                    parsedFont.tables.fvar.axes.forEach(axis => {
                        // Achse automatisch in das System-Format pushen
                        font.axes.push({
                            id: axis.tag,
                            label: `${axis.tag} (${axis.minValue} bis ${axis.maxValue})`,
                            default: String(axis.defaultValue),
                            maxValue: axis.maxValue
                        });
                    });
                }
                console.log(`✓ Achsen für ${font.name} erfolgreich gescannt:`, font.axes);
            } catch (err) {
                console.error(`Fehler beim Scannen von ${font.name} unter ${font.url}:`, err);
                font.axes = []; // Fallback auf leeres Array bei Fehlern
            }
        } else {
            font.axes = []; // Statische Schriften haben standardmäßig leere Achsen
        }
    }
}

// 3. DROPDOWN INITIALISIEREN
function initFontDropdown() {
    fontSelect.innerHTML = '';
    for (const key in fontConfig) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = fontConfig[key].name;
        fontSelect.appendChild(option);
    }
}

// Befüllt das Schriftgrößen-Dropdown mit denselben Presets
function initFontSizeDropdown() {
    fontSizeSelect.innerHTML = ''; // Leeren
    
    // Platzhalter hinzufügen
    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = "fx";
    placeholderOption.value = "";
    fontSizeSelect.appendChild(placeholderOption);

    // Optionen aus der formulas.js generieren
    formulaPresets.forEach(preset => {
        const option = document.createElement('option');
        option.textContent = preset.name;
        option.value = preset.fontSize;;
        fontSizeSelect.appendChild(option);
    });

    // Wenn ein Preset gewählt wird: In den Font-Size-Input schreiben und Buch rendern
    fontSizeSelect.addEventListener('change', (event) => {
        const chosenFormula = event.target.value;
        if (chosenFormula !== "") {
            fontSizeInput.value = chosenFormula; // Schreibt den Wert in #formula-input
            fontSizeSelect.selectedIndex = 0;
            triggerBookRender();                // Rendert das Buch neu
        }
    });
}

// 4. GENERATOR: Baut die Achsen-Inputs live im HTML
function updateAxisInputs() {
    const selectedKey = fontSelect.value;
    const font = fontConfig[selectedKey];
    
    axesContainer.innerHTML = '';

    const hasAxes = font && font.axes && font.axes.length > 0;
    variableSettings.classList.toggle('hidden', !hasAxes);

    if (!hasAxes) return;

    font.axes.forEach(axis => {
        const containerDiv = document.createElement('div');

        const p = document.createElement('p');
        p.textContent = `${axis.label}`;
        containerDiv.appendChild(p);

        const dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'formula-input-dropwdown';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'axis-input';
        input.dataset.axisId = axis.id;
        input.value = axis.default;
        input.addEventListener('input', triggerBookRender); // Lauscht auf Tastatur-Eingaben
        dropdownDiv.appendChild(input);

        // 1. Das Select-Menü erzeugen
        const select = document.createElement('select');
        select.className ="formula-select";
        
        // 2. Einen leeren Standard-Eintrag hinzufügen
        const placeholderOption = document.createElement('option');
        placeholderOption.textContent = "fx";
        placeholderOption.value = "";
        select.appendChild(placeholderOption);

        // 3. NEU: Dynamisch die Optionen aus der importierten formulas.js generieren
        formulaPresets.forEach(preset => {
        const option = document.createElement('option');
        option.textContent = preset.name;
    
        // Ersetze den Platzhalter 'MAX_VAL' global mit dem echten Maximalwert dieser Achse
        const dynamicAxisFormula = preset.axis.replace(/MAX_VAL/g, axis.maxValue);
    
        option.value = dynamicAxisFormula; // Die berechnete Formel ohne "pt" wird hinterlegt
        select.appendChild(option);
        });

        // 4. NEU: Wenn der User ein Preset auswählt, Wert ins Input schreiben & Buch rendern
        select.addEventListener('change', (event) => {
            const chosenFormula = event.target.value;
            if (chosenFormula !== "") {
                input.value = chosenFormula; // Überschreibt den Text im Input-Feld
                select.selectedIndex = 0;
                triggerBookRender();         // Stößt das Paged.js-Rendering an
            }
        });

        dropdownDiv.appendChild(select);
        containerDiv.appendChild(dropdownDiv);
        axesContainer.appendChild(containerDiv);
    });
}

// In main.js -> Funktion applyDynamicStyles() anpassen
function applyDynamicStyles() {
    // 1. Alle Werte auslesen (deine bestehenden Inputs)
    const fontSizeFormula = fontSizeInput.value;
    const lineHeightFormula = lineHeightInput.value;
    const letterSpacingFormula = letterSpacingInput.value;
    const marginLeftFormula = marginLeftInput.value;
    const marginRightFormula = marginRightInput.value;
    
    // NEU: Die Transform-Werte auslesen (mit '0px' Fallback, falls leer)
    const translateXFormula = translateXInput.value.trim() || '0px';
    const translateYFormula = translateYInput.value.trim() || '0px';

    let selectedAlignment = 'left';
    const activeRadio = document.querySelector('input[name="alignment"]:checked');
    if (activeRadio) {
        selectedAlignment = activeRadio.value;
    }

    const selectedKey = fontSelect.value;
    const font = fontConfig[selectedKey];
    if (!font) return;
    
    let fontVariationRules = '';
    const activeAxisInputs = axesContainer.querySelectorAll('.axis-input');
    if (activeAxisInputs.length > 0) {
        const compiledAxes = [];
        activeAxisInputs.forEach(input => {
            const axisId = input.dataset.axisId;
            const axisFormula = input.value;
            if (axisFormula.trim() !== '') compiledAxes.push(`'${axisId}' calc(${axisFormula})`);
        });
        if (compiledAxes.length > 0) fontVariationRules = `font-variation-settings: ${compiledAxes.join(', ')} !important;`;
    } else {
        fontVariationRules = `font-variation-settings: normal !important;`;
    }
    
    // 2. CSS-Injektion
    dynamicEffectsStyle.textContent = `
        .pagedjs_area {
            text-align: ${selectedAlignment} !important;
            padding-left: calc(${marginLeftFormula}) !important;
            padding-right: calc(${marginRightFormula}) !important;
            box-sizing: border-box !important;
        }

        .book-paragraph {
            font-family: ${font.cssValue} !important;
            font-size: calc(${fontSizeFormula}) !important;
            line-height: calc(${lineHeightFormula}) !important;
            
            --char-index: 0;
            --char-total: 1;
        }

        /* Die mathematischen Effekte bleiben auf den einzelnen Buchstaben aktiv */
        .char {
            display: inline-block !important; /* Lebenswichtig, damit transform greift! */
            transform: translate(calc(${translateXFormula}), calc(${translateYFormula})) !important;
            
            font-family: ${font.cssValue} !important;
            font-size: calc(${fontSizeFormula}) !important; 
            letter-spacing: calc(${letterSpacingFormula}) !important; 
            ${fontVariationRules}
        }
    `;
}

// 6. THE ENGINE: Der Paged.js Rendering Loop (mit Debounce)
function triggerBookRender() {
    clearTimeout(typingTimeout);
    
    // WICHTIG: Hier MUSS das 'async' direkt vor den Klammern stehen!
    typingTimeout = setTimeout(async () => {
        
        // 1. CLEANUP: Alte Paged.js Reste aus dem Head löschen
        document.querySelectorAll('head style').forEach(style => {
            if (style.id !== 'dynamic-effects' && (style.textContent.includes('.pagedjs_') || style.textContent.includes('@page'))) {
                style.remove();
            }
        });

        // 2. CSS-EFFEKTE: Buchstaben-Transformationen aktualisieren
        applyDynamicStyles();

        // 3. BLOB-ERZEUGUNG: Seitengröße, Ränder und Umbruchregeln für Paged.js definieren
        const pageWidth = pageWidthInput.value;
        const pageHeight = pageHeightInput.value;
        
        const mTop = pageMarginTopInput.value;
        const mBottom = pageMarginBottomInput.value;
        const mLeft = pageMarginLeftInput.value;
        const mRight = pageMarginRightInput.value;

        // KORRIGIERT: Wir haben den ".splitting .word"-Block komplett entfernt!
        const pageStyleContent = `
            @page { 
                size: ${pageWidth} ${pageHeight}; 
                margin: ${mTop} ${mRight} ${mBottom} ${mLeft};
            }
            .book-section {
                display: block !important;
            }
            .book-section + .book-section {
                break-before: page !important;
                page-break-before: always !important;
            }
        `;
        
        const pageStyleBlob = new Blob([pageStyleContent], { type: 'text/css' });
        const pageStyleUrl = URL.createObjectURL(pageStyleBlob);

        // 4. TEXT-VERARBEITUNG: Sektionen und native Absätze bauen
        const userText = editor.value;
        const ghost = document.createElement('div');
        
        // Text an den drei Bindestrichen spalten
        const sections = userText.split('---');

        sections.forEach(sectionText => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'book-section';
            
            // Text der Sektion in einzelne Zeilen/Absätze spalten
            const paragraphs = sectionText.split('\n');

            paragraphs.forEach(paraText => {
                const paraDiv = document.createElement('div');
                paraDiv.className = 'book-paragraph';
                
                if (paraText.trim() === '') {
                    // Leere Zeile: Unsichtbares Zeichen setzen und Splitting überspringen
                    paraDiv.textContent = '\u00A0';
                } else {
                    // Zeile mit Text: Normal befüllen und splitten
                    paraDiv.textContent = paraText;
                    Splitting({ 
                        target: paraDiv, 
                        by: 'chars' 
                    });
                }
                
                sectionDiv.appendChild(paraDiv);
            });

            ghost.appendChild(sectionDiv);
        });
        
        // 5. INDEXIERUNG: Alle Buchstaben global lückenlos durchnummerieren
        const allChars = ghost.querySelectorAll('.char');
        const totalChars = allChars.length;
        
        allChars.forEach((char, index) => {
            char.style.setProperty('--char-index', index);
            char.style.setProperty('--char-total', totalChars);
        });
        
        canvas.innerHTML = '';
        canvas.style.setProperty('--char-total', totalChars);
        
        // 6. RENDERING: Paged.js starten (Hier wird das 'await' benötigt!)
        const previewer = new Paged.Previewer();
        await previewer.preview(ghost.innerHTML, ['assets/css/page.css', pageStyleUrl], canvas);

        // 7. SPEICHERBEREINIGUNG: Blob-URL freigeben
        URL.revokeObjectURL(pageStyleUrl);

    }, 400); // Wartet 400ms nach dem letzten Tastendruck, bevor gerechnet wird
}

// 7. LISTENERS
editor.addEventListener('input', triggerBookRender);
fontSizeInput.addEventListener('input', triggerBookRender);
lineHeightInput.addEventListener('input', triggerBookRender);
letterSpacingInput.addEventListener('input', triggerBookRender);
marginLeftInput.addEventListener('input', triggerBookRender);
marginRightInput.addEventListener('input', triggerBookRender);
pageMarginTopInput.addEventListener('input', triggerBookRender);
pageMarginBottomInput.addEventListener('input', triggerBookRender);
pageMarginLeftInput.addEventListener('input', triggerBookRender);
pageMarginRightInput.addEventListener('input', triggerBookRender);
translateXInput.addEventListener('input', applyDynamicStyles);
translateYInput.addEventListener('input', applyDynamicStyles);

fontSelect.addEventListener('change', () => {
    updateAxisInputs();
    triggerBookRender();
});

alignmentRadios.forEach(radio => {
    radio.addEventListener('change', triggerBookRender);
});

// 1. Wenn der Nutzer Enter drückt
zoomInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        applyZoom(zoomInput.value);
        zoomInput.blur(); // Nimmt den Fokus weg, tarnt das Feld wieder
    }
});

// 2. Wenn der Nutzer das Feld verlässt (Klick ins Leere)
zoomInput.addEventListener('blur', () => {
    applyZoom(zoomInput.value);
});

// 3. Komfort-Feature: Beim Klicken direkt den gesamten Text markieren
zoomInput.addEventListener('click', () => {
    zoomInput.select();
});

exportPdfButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Öffnet den nativen Druckdialog des Browsers. 
        // Dort kann der Nutzer direkt "Als PDF speichern" wählen.
        window.print();
    });
});

if (btnNewPage) {
    btnNewPage.addEventListener('click', () => {
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        const text = editor.value;

        // SICHERHEITSNETZ: Wenn das Feld noch nie fokussiert wurde (start und end sind 0),
        // aber bereits Text existiert, setzen wir den "Cursor" virtuell ans Ende des Textes.
        if (start === 0 && end === 0 && text.length > 0) {
            start = end = text.length;
        }

        const insertion = "\n---\n";

        // Text einfügen
        editor.value = text.substring(0, start) + insertion + text.substring(end);

        // Cursor neu positionieren & Fokus zurückgeben
        const newCursorPos = start + insertion.length;
        editor.selectionStart = editor.selectionEnd = newCursorPos;
        editor.focus();

        triggerBookRender();
    });
}

let currentPresetIndex = 0;

// 3. Click-Event-Listener
if (demoBtn) {
    demoBtn.addEventListener('click', () => {
        const preset = demoPresets[currentPresetIndex];
        
        // Schriftart im Dropdown ändern und Event auslösen, damit die Achsenregler generiert werden
        fontSelect.value = preset.font;
        fontSelect.dispatchEvent(new Event('change'));
        
        // Text-Inputs befüllen
        fontSizeInput.value = preset.fontSize;
        lineHeightInput.value = preset.lineHeight;
        letterSpacingInput.value = preset.letterSpacing;
        
        // Textausrichtung setzen
        const alignRadio = document.querySelector(`input[name="alignment"][value="${preset.alignment}"]`);
        if (alignRadio) {
            alignRadio.checked = true;
        }
        
        // Dynamische Variable-Font-Achsen befüllen
        Object.keys(preset.axes).forEach(axisId => {
            const axisInput = axesContainer.querySelector(`.axis-input[data-axis-id="${axisId}"]`);
            if (axisInput) {
                axisInput.value = preset.axes[axisId];
            }
        });
        
        // Rendering direkt anstoßen
        triggerBookRender();
        
        // Index für das nächste Preset erhöhen
        currentPresetIndex = (currentPresetIndex + 1) % demoPresets.length;
    });
}



// INITIALER ASYNCHRONER STARTABLAUF
async function startApp() {
    editor.value = '';
    canvas.innerHTML = '';

    await autoDetectLocalAxes(); // 1. Alle lokalen Schriftdateien scannen und Achsen im Hintergrund eintragen
    initFontDropdown();          // 2. Dropdown bauen
    updateAxisInputs();          // 3. Inputs für die erste Schriftart anzeigen
    applyDynamicStyles();         // 4. CSS scharf schalten
    initFontSizeDropdown();
    initPagePresetsDropdown();
    initTabNavigation();
}

// App starten!
startApp();

// Am Ende deiner main.js (beim Laden der Seite)

const defaultText = `Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.

Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.

Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.`;

// Falls die Textarea leer ist, befüllen wir sie mit dem Standardtext
if (editor && !editor.value) {
    editor.value = defaultText;
}

// WICHTIG: Direkt das erste Rendering anstoßen, 
// damit das Buch rechts nicht leer startet, sondern den Text sofort anzeigt!
triggerBookRender();