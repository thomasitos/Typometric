import { formulaPresets } from './formulas.js';
import { pagePresets } from './pages.js';
import { demoPresets } from './demos.js';
import { initialElementStyles } from './elementStyles.js';

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
const settingspanel = document.getElementById('settings');
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
const paragraphSettings = document.getElementById('paragraph-settings');
const advancedMetrics = document.getElementById('advanced-metrics');
const advancedTransform = document.getElementById('advanced-transform');
const advancedToggleSection = document.getElementById('advanced-toggle-section');
const advancedRadios = document.querySelectorAll('input[name="advanced-mode"]');
const btnText = document.getElementById('btn-text');
const btnMargins = document.getElementById('btn-margins');
const textEditorTextarea = document.getElementById('text-editor-textarea');
const marginEditorTextarea = document.getElementById('margin-editor-textarea');
// In main.js ganz oben bei den DOM-Elementen:
const fontUploadInput = document.getElementById('font-upload-input');
let previousFontKey = 'arial'; // Merkt sich die letzte Schrift vor dem Klick auf "Upload"

const marginInputs = {
    topLeft: document.getElementById('margin-editor-top-left'),
    topCenter: document.getElementById('margin-editor-top-center'),
    topRight: document.getElementById('margin-editor-top-right'),
    bottomLeft: document.getElementById('margin-editor-bottom-left'),
    bottomCenter: document.getElementById('margin-editor-bottom-center'),
    bottomRight: document.getElementById('margin-editor-bottom-right')
};

const STYLES = {
    REGULAR:     { label: 'Regular', weight: '400', style: 'normal' },
    ITALIC:      { label: 'Italic', weight: '400', style: 'italic' },
    BOLD:        { label: 'Bold', weight: '700', style: 'normal' },
    BOLD_ITALIC: { label: 'Bold Italic', weight: '700', style: 'italic' }
};

const ALL_4_STYLES = [STYLES.REGULAR, STYLES.ITALIC, STYLES.BOLD, STYLES.BOLD_ITALIC];
const REGULAR_ONLY  = [STYLES.REGULAR];
const NO_ITALIC     = [STYLES.REGULAR, STYLES.BOLD];
const NO_BOLD     = [STYLES.REGULAR, STYLES.ITALIC];

// Aktuell ausgewählter Sub-Tab (Standard: body)
let currentSubTab = 'body';

// Buttons der Sub-Sidebar
const subTabButtons = {
    body: document.getElementById('btn-body-settings'),
    h1: document.getElementById('btn-h1-settings'),
    h2: document.getElementById('btn-h2-settings'),
    bold: document.getElementById('btn-bold-settings'),
    italic: document.getElementById('btn-italic-settings')
};

// main.js ganz oben bei den DOM-Elementen
const fontStyleSelect = document.getElementById('font-style-select');

// Die 4 Basis-Schriftschnitte
const standardFontStyles = [
    { label: 'Regular', weight: '400', style: 'normal' },
    { label: 'Italic', weight: '400', style: 'italic' },
    { label: 'Bold', weight: '700', style: 'normal' },
    { label: 'Bold Italic', weight: '700', style: 'italic' }
];

const elementStyles = structuredClone(initialElementStyles);

let typingTimeout;

// Funktion zum Befüllen des Dropdowns
function initFontStyleDropdown() {
    fontStyleSelect.innerHTML = '';
    standardFontStyles.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = item.label;
        fontStyleSelect.appendChild(option);
    });
}

function attachCommitListener(input, onCommit) {
    if (!input) return;

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            input.blur(); // Löst automatisch das 'blur'-Event aus
        }
    });

    input.addEventListener('blur', () => {
        if (onCommit) onCommit();
    });
}

// 1. Speichert alle aktuellen UI-Eingaben im Datenmodell des aktiven Tabs
function saveCurrentSubTabState() {
    const current = elementStyles[currentSubTab];
    if (!current) return;

    // In main.js -> saveCurrentSubTabState()


    const isInlineElement = (currentSubTab === 'bold' || currentSubTab === 'italic');
    const activeAdvancedRadio = document.querySelector('input[name="advanced-mode"]:checked');

    const effectiveFontKey = (current.font === 'inherit') ? elementStyles.body.font : current.font;
    const font = fontConfig[effectiveFontKey] || fontConfig['arial'];
    const availableStyles = font.styles || ALL_4_STYLES;

const selectedIndex = parseInt(fontStyleSelect.value, 10);
if (!isNaN(selectedIndex) && availableStyles[selectedIndex]) {
    current.styleIndex = selectedIndex; // NEU: Index im Datenmodell merken
    current.fontWeight = availableStyles[selectedIndex].weight;
    current.fontStyle = availableStyles[selectedIndex].style;
}
    
    if (activeAdvancedRadio) {
        current.isAdvanced = (activeAdvancedRadio.value === 'on');
    }

    // Wenn es ein Inline-Element ist UND Advanced Mode OFF ist -> alles erben!
    if (isInlineElement && !current.isAdvanced) {
        current.font = 'inherit';
        current.fontSize = 'inherit';
        current.lineHeight = 'inherit';
        current.letterSpacing = 'inherit';
        current.translateX = 'inherit';
        current.translateY = 'inherit';
    } else {
        // Im Advanced Mode oder bei Block-Elementen die echten Input-Werte speichern
        if (!fontSelect.disabled) {
            current.font = fontSelect.value;
        }
        current.fontSize = fontSizeInput.value;
        current.lineHeight = lineHeightInput.value;
        current.letterSpacing = letterSpacingInput.value;
        current.translateX = translateXInput.value;
        current.translateY = translateYInput.value;
    }

    current.marginLeft = marginLeftInput.value;
    current.marginRight = marginRightInput.value;

    const activeRadio = document.querySelector('input[name="alignment"]:checked');
    if (activeRadio) current.alignment = activeRadio.value;


    // Achsen (Variable Fonts) speichern
    current.axes = {};
    const activeAxisInputs = axesContainer.querySelectorAll('.axis-input');
    activeAxisInputs.forEach(input => {
        current.axes[input.dataset.axisId] = input.value;
    });
}

function loadSubTabState(key) {
    saveCurrentSubTabState();
    currentSubTab = key;
    const data = elementStyles[key];

    const isInlineElement = (key === 'bold' || key === 'italic');

    // 1. Radio-Buttons synchronisieren
    const isAdvancedOn = !!data.isAdvanced;
    const targetRadio = document.getElementById(isAdvancedOn ? 'advanced-on' : 'advanced-off');
    if (targetRadio) targetRadio.checked = true;

    // 2. Sichtbarkeiten der Bereiche
    if (paragraphSettings) paragraphSettings.classList.toggle('hidden', isInlineElement);
    if (advancedToggleSection) advancedToggleSection.classList.toggle('hidden', !isInlineElement);

    const showAdvanced = !isInlineElement || isAdvancedOn;
    if (advancedMetrics) advancedMetrics.classList.toggle('hidden', !showAdvanced);
    if (advancedTransform) advancedTransform.classList.toggle('hidden', !showAdvanced);

    // 3. Schriftart-Dropdown einstellen
    const effectiveFontKey = (data.font === 'inherit') ? elementStyles.body.font : data.font;
    if (isInlineElement && !isAdvancedOn) {
        fontSelect.disabled = true;
        fontSelect.value = elementStyles.body.font;
    } else {
        fontSelect.disabled = false;
        fontSelect.value = effectiveFontKey;
    }

    // ACHTUNG: Kein dispatchEvent mehr! Stattdessen direkt aufrufen:
    updateFontStyleDropdown(effectiveFontKey);
    updateAxisInputs();

    // 4. Schriftschnitt auswählen
    const font = fontConfig[effectiveFontKey] || fontConfig['arial'];
    const availableStyles = font.styles || ALL_4_STYLES;
    const styleIdx = (data.styleIndex !== undefined && availableStyles[data.styleIndex]) ? data.styleIndex : 0;
    fontStyleSelect.value = styleIdx;

    // 5. Textfelder befüllen
    fontSizeInput.value = (data.fontSize === 'inherit') ? elementStyles.body.fontSize : data.fontSize;
    lineHeightInput.value = (data.lineHeight === 'inherit') ? elementStyles.body.lineHeight : data.lineHeight;
    letterSpacingInput.value = (data.letterSpacing === 'inherit') ? elementStyles.body.letterSpacing : data.letterSpacing;
    marginLeftInput.value = data.marginLeft;
    marginRightInput.value = data.marginRight;
    translateXInput.value = (data.translateX === 'inherit') ? elementStyles.body.translateX : data.translateX;
    translateYInput.value = (data.translateY === 'inherit') ? elementStyles.body.translateY : data.translateY;

    const radioToSelect = document.querySelector(`input[name="alignment"][value="${data.alignment}"]`);
    if (radioToSelect) radioToSelect.checked = true;

    // Achsen-Inputs befüllen
    Object.keys(data.axes).forEach(axisId => {
        const axisInput = axesContainer.querySelector(`.axis-input[data-axis-id="${axisId}"]`);
        if (axisInput) axisInput.value = data.axes[axisId];
    });

    // Sub-Tab-Button hervorheben
    Object.keys(subTabButtons).forEach(btnKey => {
        if (subTabButtons[btnKey]) {
            subTabButtons[btnKey].classList.toggle('active', btnKey === key);
        }
    });
}

// 3. Event-Listener an die Sub-Buttons hängen
function initSubTabNavigation() {
    Object.keys(subTabButtons).forEach(key => {
        const btn = subTabButtons[key];
        if (btn) {
            btn.addEventListener('click', () => loadSubTabState(key));
        }
    });

    if (subTabButtons.body) subTabButtons.body.classList.add('active');
}

// Initialisierung des Seiten-Dropdowns
function initPagePresetsDropdown() {
    pagePresetSelect.innerHTML = '';
    
    const customOption = document.createElement('option');
    customOption.textContent = "Custom";
    customOption.value = "-1";
    pagePresetSelect.appendChild(customOption);

    pagePresets.forEach((preset, index) => {
        const option = document.createElement('option');
        option.textContent = preset.name;
        option.value = index;
        
        if (preset.width === "148mm" && preset.height === "210mm") {
            option.selected = true;
        }
        pagePresetSelect.appendChild(option);
    });

    pagePresetSelect.addEventListener('change', (event) => {
        const index = parseInt(event.target.value);
        if (index >= 0) {
            pageWidthInput.value = pagePresets[index].width;
            pageHeightInput.value = pagePresets[index].height;
            triggerBookRender();
        }
    });

    pageWidthInput.addEventListener('input', () => {
        pagePresetSelect.value = "-1";
        triggerBookRender();
    });
    pageHeightInput.addEventListener('input', () => {
        pagePresetSelect.value = "-1";
        triggerBookRender();
    });
}

function initTabNavigation() {
    const tabs = [
        { button: btnTabEditor, panel: textEditorPanel },
        { button: btnTabStyles, panel: stylesPanel },
        { button: btnTabPages, panel: pagesPanel }
    ];

    tabs.forEach(activeTab => {
        activeTab.button.addEventListener('click', () => {
            tabs.forEach(tab => {
                tab.panel.classList.add('hidden');
                tab.button.classList.remove('active');
            });

            activeTab.panel.classList.remove('hidden');
            activeTab.button.classList.add('active');
        });
    });
}

function applyZoom(rawValue) {
    let zoomValue = parseInt(rawValue, 10);

    if (isNaN(zoomValue)) {
        zoomValue = 100;
    }

    zoomValue = Math.max(10, Math.min(200, zoomValue));

    canvas.style.setProperty('--preview-zoom', `${zoomValue}%`);
    zoomInput.value = `${zoomValue}%`;
}

// 1. DIE SCHRIFTEN-DATENBANK
const fontConfig = {
    "arial": {
        name: "Arial",
        cssValue: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
        styles: ALL_4_STYLES
    },
    "verdana": {
        name: "Verdana",
        cssValue: 'Verdana, Geneva, sans-serif',
        styles: ALL_4_STYLES
    },
    "trebuchetms": {
        name: "Trebuchet MS",
        cssValue: '"Trebuchet MS", "Lucida Sans Unicode", sans-serif',
        styles: ALL_4_STYLES
    },
    "centurygothic": {
        name: "Century Gothic",
        cssValue: '"Century Gothic", Futura, sans-serif',
        styles: ALL_4_STYLES
    },
    "times": {
        name: "Times New Roman",
        cssValue: '"Times New Roman", Times, serif',
        styles: ALL_4_STYLES
    },
    "georgia": {
        name: "Georgia",
        cssValue: 'Georgia, Cambria, serif',
        styles: ALL_4_STYLES
    },
    "garamond": {
        name: "Garamond",
        cssValue: 'Garamond, "Baskerville Old Face", serif',
        styles: ALL_4_STYLES
    },
    "baskerville": {
        name: "Baskerville",
        cssValue: 'Baskerville, "Palatino Linotype", Palatino, serif',
        styles: ALL_4_STYLES
    },
    "couriernew": {
        name: "Courier New",
        cssValue: '"Courier New", Courier, monospace',
        styles: ALL_4_STYLES
    },
    "impact": {
        name: "Impact",
        cssValue: 'Impact, "Arial Black", sans-serif',
        styles: REGULAR_ONLY
    },

    "fraunces": {
        name: "Fraunces",
        cssValue: 'Fraunces, sans-serif',
        styles: NO_BOLD,
        url: "assets/fonts/Fraunces[SOFT,WONK,opsz,wght].ttf"
    },


    "googlesansflex": {
        name: "Google Sans Flex",
        cssValue: 'GoogleSansFlex, sans-serif',
        styles: REGULAR_ONLY,
        url: "assets/fonts/GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf"

    },

     "robotoflex": {
        name: "Roboto Flex",
        cssValue: 'RobotoFlex, sans-serif',
        styles: REGULAR_ONLY,
        url: "assets/fonts/RobotoFlex[GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght].ttf"
    },

    "robotserif": {
        name: "Roboto Serif",
        cssValue: 'RobotoSerif, sans-serif',
        styles: NO_BOLD,
        url: "assets/fonts/RobotoSerif[grad,opsz,wdth,wgth].ttf"
    },

     "sciencegothic": {
        name: "Science Gothic",
        cssValue: 'ScienceGothic, sans-serif',
        styles: REGULAR_ONLY,
        url: "assets/fonts/ScienceGothic-VariableFont_CTRS,slnt,wdth,wght.ttf"
    },

    "sono": {
        name: "Sono",
        cssValue: 'Sono, sans-serif',
        styles: REGULAR_ONLY,
        url: "assets/fonts/Sono[MONO,wght].ttf"
    },

    "sprat": {
        name: "Sprat",
        cssValue: 'Sprat, sans-serif',
        styles: REGULAR_ONLY,
        url: "assets/fonts/SpratVF.ttf"
    },

    "tilt": {
    name: "Tilt",
    cssValue: "'Tilt Neon', sans-serif", // NEU: Sicherer Fallback für das Haupt-Objekt
    styles: [
        { 
            label: 'Neon', 
            weight: '400', 
            style: 'normal', 
            cssValue: "'Tilt Neon', sans-serif",
            url: "assets/fonts/TiltNeon[HROT,VROT].ttf"
        },
        { 
            label: 'Prism',  
            weight: '400', 
            style: 'normal', 
            cssValue: "'Tilt Prism', sans-serif",
            url: "assets/fonts/TiltPrism[HROT,VROT].ttf"
        },
        { 
            label: 'Warp',  
            weight: '400', 
            style: 'normal', 
            cssValue: "'Tilt Warp', sans-serif",
            url: "assets/fonts/TiltWarp[HROT,VROT].ttf"
        }
    ]
},

    "tiny": {
        name: "Tiny",
        cssValue: 'tiny, sans-serif',
        styles: REGULAR_ONLY
    }

};

// 2. DER AUTOMATISCHE ACHSEN-SCANNER
// In main.js -> autoDetectLocalAxes()

async function autoDetectLocalAxes() {
    for (const key in fontConfig) {
        const font = fontConfig[key];
        const stylesToScan = font.styles || [];

        // 1. Falls die Schrift eine globale URL hat (Einzeldatei-VF)
        if (font.url) {
            font.axes = await scanSingleFontFile(font.url, font.name);
        }

        // 2. Falls einzelne Schriftschnitte eigene URLs haben (Mehrdateien-VF)
        for (const styleObj of stylesToScan) {
            if (styleObj.url) {
                styleObj.axes = await scanSingleFontFile(styleObj.url, `${font.name} (${styleObj.label})`);
            }
        }
    }
}

// Kleine Hilfsfunktion zum Auslesen einer Datei per opentype.js
async function scanSingleFontFile(url, fontLabel) {
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const parsedFont = opentype.parse(arrayBuffer);
        const detectedAxes = [];

        if (parsedFont.tables && parsedFont.tables.fvar && parsedFont.tables.fvar.axes) {
            parsedFont.tables.fvar.axes.forEach(axis => {
                detectedAxes.push({
                    id: axis.tag,
                    label: `${axis.tag} (${axis.minValue} bis ${axis.maxValue})`,
                    default: String(axis.defaultValue),
                    maxValue: axis.maxValue
                });
            });
        }
        console.log(`✓ Achsen für ${fontLabel} gescannt:`, detectedAxes);
        return detectedAxes;
    } catch (err) {
        console.error(`Fehler beim Scannen von ${fontLabel} unter ${url}:`, err);
        return [];
    }
}

// 3. DROPDOWN INITIALISIEREN
function initFontDropdown() {
    fontSelect.innerHTML = '';
    
    // 1. Alle regulären Schriften aus fontConfig einfügen
    for (const key in fontConfig) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = fontConfig[key].name;
        fontSelect.appendChild(option);
    }

    // 2. Trennlinie oder spezielle Upload-Option hinzufügen
    const uploadOption = document.createElement('option');
    uploadOption.value = '__upload__';
    uploadOption.textContent = '[+] Upload font';
    fontSelect.appendChild(uploadOption);
}

function initFontSizeDropdown() {
    fontSizeSelect.innerHTML = '';
    
    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = "fx";
    placeholderOption.value = "";
    fontSizeSelect.appendChild(placeholderOption);

    formulaPresets.forEach(preset => {
        const option = document.createElement('option');
        option.textContent = preset.name;
        option.value = preset.fontSize;
        fontSizeSelect.appendChild(option);
    });

    fontSizeSelect.addEventListener('change', (event) => {
        const chosenFormula = event.target.value;
        if (chosenFormula !== "") {
            fontSizeInput.value = chosenFormula;
            fontSizeSelect.selectedIndex = 0;
            triggerBookRender();
        }
    });
}

async function handleCustomFontUpload(file) {
    if (!file) return;

    try {
        // 1. Datei als ArrayBuffer einlesen für opentype.js
        const arrayBuffer = await file.arrayBuffer();
        const parsedFont = opentype.parse(arrayBuffer);

        // 2. Schriftnamen aus den Metadaten auslesen (oder Dateinamen als Fallback)
        let fontName = file.name.replace(/\.[^/.]+$/, ""); // Dateiname ohne Endung
        if (parsedFont.names && parsedFont.names.fontFamily) {
            fontName = parsedFont.names.fontFamily.en || fontName;
        }

        const customKey = `custom_${Date.now()}`;
        const blobUrl = URL.createObjectURL(file);

        // 3. Achsen automatisch aus opentype.js extrahieren
        const detectedAxes = [];
        if (parsedFont.tables && parsedFont.tables.fvar && parsedFont.tables.fvar.axes) {
            parsedFont.tables.fvar.axes.forEach(axis => {
                detectedAxes.push({
                    id: axis.tag,
                    label: `${axis.tag} (${axis.minValue} bis ${axis.maxValue})`,
                    default: String(axis.defaultValue),
                    maxValue: axis.maxValue
                });
            });
        }

        // 4. Dynamischen @font-face Style-Tag im Head verankern
        const fontFaceStyle = document.createElement('style');
        fontFaceStyle.textContent = `
            @font-face {
                font-family: '${fontName}';
                src: url('${blobUrl}');
                font-weight: 100 900;
                font-style: normal;
            }
        `;
        document.head.appendChild(fontFaceStyle);

        // 5. Neue Schrift in fontConfig eintragen
        fontConfig[customKey] = {
            name: `${fontName}`,
            cssValue: `'${fontName}', sans-serif`,
            axes: detectedAxes,
            styles: [
                {
                    label: 'Regular',
                    weight: '400',
                    style: 'normal',
                    cssValue: `'${fontName}', sans-serif`,
                    url: blobUrl,
                    axes: detectedAxes
                }
            ]
        };

        // 6. Dropdown aktualisieren & die neue Schrift sofort auswählen
        initFontDropdown();
        fontSelect.value = customKey;
        
        // 7. UI-Zustand updaten und neu rendern
        updateAxisInputs();
        updateFontStyleDropdown(customKey);
        saveCurrentSubTabState();
        triggerBookRender();

        console.log(`✓ Custom Font "${fontName}" erfolgreich geladen!`, fontConfig[customKey]);

    } catch (err) {
        console.error('Fehler beim Laden der Schriftdatei:', err);
        alert('Die Schriftdatei konnte nicht gelesen werden. Bitte eine gültige .ttf oder .otf Datei wählen.');
        fontSelect.value = previousFontKey;
    }
}

// 4. GENERATOR: Baut die Achsen-Inputs live im HTML
function updateAxisInputs() {
    const selectedKey = fontSelect.value;
    const font = fontConfig[selectedKey];
    if (!font) return;

    const availableStyles = font.styles || ALL_4_STYLES;
    
    // Den aktuell gewählten Schnitt aus dem Dropdown ermitteln
    const selectedStyleIndex = fontStyleSelect.value || 0;
    const currentStyleObj = availableStyles[selectedStyleIndex] || availableStyles[0];

    // Achsen ermitteln: Entweder vom speziellen Schnitt ODER von der Hauptschrift
    const activeAxes = (currentStyleObj && currentStyleObj.axes) ? currentStyleObj.axes : (font.axes || []);

    axesContainer.innerHTML = '';
    const hasAxes = activeAxes.length > 0;
    variableSettings.classList.toggle('hidden', !hasAxes);

    if (!hasAxes) return;

    // Regler für die aktiven Achsen bauen
    activeAxes.forEach(axis => {
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
        input.addEventListener('input', triggerBookRender);
        dropdownDiv.appendChild(input);

        const select = document.createElement('select');
        select.className = "formula-select";
        
        const placeholderOption = document.createElement('option');
        placeholderOption.textContent = "fx";
        placeholderOption.value = "";
        select.appendChild(placeholderOption);

        formulaPresets.forEach(preset => {
            const option = document.createElement('option');
            option.textContent = preset.name;
            const dynamicAxisFormula = preset.axis.replace(/MAX_VAL/g, axis.maxValue);
            option.value = dynamicAxisFormula;
            select.appendChild(option);
        });

        select.addEventListener('change', (event) => {
            const chosenFormula = event.target.value;
            if (chosenFormula !== "") {
                input.value = chosenFormula;
                select.selectedIndex = 0;
                triggerBookRender();
            }
        });

        dropdownDiv.appendChild(select);
        containerDiv.appendChild(dropdownDiv);
        axesContainer.appendChild(containerDiv);
    });
}

function updateFontStyleDropdown(fontKey) {
    const font = fontConfig[fontKey] || fontConfig['arial'];
    const availableStyles = font.styles || ALL_4_STYLES;

    fontStyleSelect.innerHTML = '';
    availableStyles.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = item.label;
        fontStyleSelect.appendChild(option);
    });
}

// In main.js -> Funktion applyDynamicStyles()
function applyDynamicStyles() {
    saveCurrentSubTabState();

    const selectorMap = {
        body: ':is(p, li, blockquote)',
        h1: 'h1',
        h2: 'h2',
        bold: ':is(strong, b)',
        italic: ':is(em, i)'
    };

    let generatedCss = `
        .word { display: inline-block !important; }
    `;



    Object.keys(elementStyles).forEach(key => {
    const style = elementStyles[key];
    const selector = selectorMap[key];

    // 1. Schriftart-Objekt holen
    const effectiveFontKey = (style.font === 'inherit') ? elementStyles.body.font : style.font;
    const font = fontConfig[effectiveFontKey] || fontConfig['arial'];
    const availableStyles = font.styles || ALL_4_STYLES;

    // 2. Aktiven Schnitt über den gespeicherten Index holen (Fallback auf Index 0)
    const styleIdx = (style.styleIndex !== undefined && availableStyles[style.styleIndex]) 
        ? style.styleIndex 
        : 0;
    const currentStyleObj = availableStyles[styleIdx] || availableStyles[0];

    // 3. Schriftfamilie ermitteln (Schnitt-CSS -> Haupt-CSS -> Fallback-String)
    const finalFontFamily = (currentStyleObj && currentStyleObj.cssValue) 
        ? currentStyleObj.cssValue 
        : (font.cssValue || 'sans-serif');

    // 4. Transformationen & Metriken auflösen
    const effectiveFontSize = (style.fontSize === 'inherit') ? elementStyles.body.fontSize : style.fontSize;
    const effectiveLineHeight = (style.lineHeight === 'inherit') ? elementStyles.body.lineHeight : style.lineHeight;
    const effectiveLetterSpacing = (style.letterSpacing === 'inherit') ? elementStyles.body.letterSpacing : style.letterSpacing;

    const effectiveTx = (style.translateX === 'inherit') ? elementStyles.body.translateX : style.translateX;
    const effectiveTy = (style.translateY === 'inherit') ? elementStyles.body.translateY : style.translateY;

    const tx = (effectiveTx || '0px').trim();
    const ty = (effectiveTy || '0px').trim();

    // 5. Achsen (Variable Fonts) für den aktiven Schnitt auflösen
    let fontVariationRules = 'font-variation-settings: normal !important;';
    if (style.axes && Object.keys(style.axes).length > 0) {
        const axesRules = Object.keys(style.axes)
            .filter(axisId => style.axes[axisId].trim() !== '')
            .map(axisId => `'${axisId}' calc(${style.axes[axisId]})`);
        if (axesRules.length > 0) {
            fontVariationRules = `font-variation-settings: ${axesRules.join(', ')} !important;`;
        }
    }

    // CSS Block zusammenbauen
    generatedCss += `
    .pagedjs_area ${selector} {
        text-align: ${style.alignment} !important;
        padding-left: calc(${style.marginLeft}) !important;
        padding-right: calc(${style.marginRight}) !important;
        box-sizing: border-box !important;
        font-family: ${finalFontFamily} !important;
        font-weight: ${style.fontWeight || '400'} !important;
        font-style: ${style.fontStyle || 'normal'} !important;
        font-size: calc(${effectiveFontSize}) !important;
        line-height: calc(${effectiveLineHeight}) !important;
    }

    .pagedjs_area ${selector} .char {
        display: inline-block !important;
        transform: translate(calc(${tx}), calc(${ty})) !important;
        font-family: ${finalFontFamily} !important;
        font-weight: ${style.fontWeight || '400'} !important;
        font-style: ${style.fontStyle || 'normal'} !important;
        font-size: calc(${effectiveFontSize}) !important;
        letter-spacing: calc(${effectiveLetterSpacing}) !important;
        ${fontVariationRules}
    }
    `;
});

    dynamicEffectsStyle.textContent = generatedCss;
}

let isRendering = false;

function triggerBookRender() {
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(async () => {
        if (isRendering) {
            triggerBookRender();
            return;
        }

        isRendering = true;
        let pageStyleUrl = null;

        try {
            document.querySelectorAll('head style').forEach(style => {
                if (style.id !== 'dynamic-effects' && (style.textContent.includes('.pagedjs_') || style.textContent.includes('@page'))) {
                    style.remove();
                }
            });

            applyDynamicStyles();

            const pageWidth = pageWidthInput.value;
            const pageHeight = pageHeightInput.value;
            
            const mTop = pageMarginTopInput.value;
            const mBottom = pageMarginBottomInput.value;
            const mLeft = pageMarginLeftInput.value;
            const mRight = pageMarginRightInput.value;

            const getMarginContent = (inputEl) => {
            const val = inputEl ? inputEl.value.trim() : '';
            return val ? `content: "${val}";` : 'content: none;';
            };

            const pageStyleContent = `
            @page { 
            size: ${pageWidth} ${pageHeight}; 
            margin: ${mTop} ${mRight} ${mBottom} ${mLeft};

            @top-left { ${getMarginContent(marginInputs.topLeft)} }
            @top-center { ${getMarginContent(marginInputs.topCenter)} }
            @top-right { ${getMarginContent(marginInputs.topRight)} }
            @bottom-left { ${getMarginContent(marginInputs.bottomLeft)} }
            @bottom-center { ${getMarginContent(marginInputs.bottomCenter)} }
            @bottom-right { ${getMarginContent(marginInputs.bottomRight)} }
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
            pageStyleUrl = URL.createObjectURL(pageStyleBlob);

            marked.setOptions({
                breaks: true,
                gfm: true
            });

            const userText = editor.value;
            const ghost = document.createElement('div');
            const sections = userText.split('---');

            sections.forEach(sectionText => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'book-section';
                sectionDiv.innerHTML = marked.parse(sectionText);

                Splitting({ 
                    target: sectionDiv, 
                    by: 'chars' 
                });

                ghost.appendChild(sectionDiv);
            });
            
            const allChars = ghost.querySelectorAll('.char');
            const totalChars = allChars.length;
            
            allChars.forEach((char, index) => {
                char.style.setProperty('--char-index', index);
                char.style.setProperty('--char-total', totalChars);
            });
            
            canvas.innerHTML = '';
            canvas.style.setProperty('--char-total', totalChars);
            
            const previewer = new Paged.Previewer();
            await previewer.preview(ghost.innerHTML, ['assets/css/page.css', pageStyleUrl], canvas);

        } catch (err) {
            console.warn('Paged.js Render-Zyklus abgefangen:', err);
        } finally {
            if (pageStyleUrl) {
                URL.revokeObjectURL(pageStyleUrl);
            }
            isRendering = false;
        }

    }, 400);
}

// 7. LISTENERS
// --- 1. LIVE-RENDERING (Bei jedem Tastenschlag) ---

// Fließtext-Editor
if (editor) {
    editor.addEventListener('input', triggerBookRender);
}

// Die 6 Ränder-Textfelder
Object.values(marginInputs).forEach(input => {
    if (input) {
        input.addEventListener('input', triggerBookRender);
    }
});


// --- 2. VERZÖGERTES RENDERING (Nur bei Enter oder Blur) ---

const handleSettingCommit = () => {
    saveCurrentSubTabState();
    triggerBookRender();
};

// Alle Einstellungs-Textfelder für Schrift, Absätze & Seiten
const settingInputs = [
    fontSizeInput, lineHeightInput, letterSpacingInput,
    marginLeftInput, marginRightInput, translateXInput, translateYInput,
    pageHeightInput, pageWidthInput,
    pageMarginTopInput, pageMarginBottomInput, pageMarginLeftInput, pageMarginRightInput
];

settingInputs.forEach(input => {
    attachCommitListener(input, handleSettingCommit);
});

// Wenn manuell in Seitenbreite/-höhe getippt wird, Dropdown auf "Custom" stellen
[pageWidthInput, pageHeightInput].forEach(input => {
    if (input) {
        input.addEventListener('input', () => {
            pagePresetSelect.value = "-1";
        });
    }
});


fontSelect.addEventListener('change', () => {
    if (fontSelect.value === '__upload__') {
        // Öffnet den System-Dateidialog
        fontUploadInput.click();
    } else {
        // Normaler Schriftwechsel: Vorherigen Key merken
        previousFontKey = fontSelect.value;
        updateAxisInputs();
        updateFontStyleDropdown(fontSelect.value);
        saveCurrentSubTabState();
        triggerBookRender();
    }
});

fontUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        handleCustomFontUpload(file);
    } else {
        // Falls der Nutzer im Dateidialog auf "Abbrechen" klickt
        fontSelect.value = previousFontKey;
    }
    // Reset, damit dieselbe Datei bei Bedarf erneut gewählt werden kann
    fontUploadInput.value = '';
});

alignmentRadios.forEach(radio => {
    radio.addEventListener('change', triggerBookRender);
});

zoomInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        applyZoom(zoomInput.value);
        zoomInput.blur();
    }
});

zoomInput.addEventListener('blur', () => {
    applyZoom(zoomInput.value);
});

zoomInput.addEventListener('click', () => {
    zoomInput.select();
});

exportPdfButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.print();
    });
});

fontStyleSelect.addEventListener('change', () => {
    saveCurrentSubTabState();
    triggerBookRender();
});

advancedRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        loadSubTabState(currentSubTab);
        triggerBookRender();
    });
});

fontSelect.addEventListener('change', () => {
    updateAxisInputs();
    
    // Schriftschnitte für die neu gewählte Schriftart aufbauen
    updateFontStyleDropdown(fontSelect.value);
    
    saveCurrentSubTabState();
    triggerBookRender();
});



if (btnText) {
    btnText.addEventListener('click', () => {
        textEditorTextarea.classList.remove('hidden');
        marginEditorTextarea.classList.add('hidden');
        btnText.classList.add('active');
        btnMargins.classList.remove('active');
    });
}

// Button 2: Zu den Rändern wechseln
if (btnMargins) {
    btnMargins.addEventListener('click', () => {
        marginEditorTextarea.classList.remove('hidden');
        textEditorTextarea.classList.add('hidden');
        btnMargins.classList.add('active');
        btnText.classList.remove('active');
    });
}

Object.values(marginInputs).forEach(input => {
    if (input) {
        input.addEventListener('input', triggerBookRender);
    }
});

if (btnNewPage) {
    btnNewPage.addEventListener('click', () => {
        let start = editor.selectionStart;
        let end = editor.selectionEnd;
        const text = editor.value;

        if (start === 0 && end === 0 && text.length > 0) {
            start = end = text.length;
        }

        const insertion = "\n---\n";

        editor.value = text.substring(0, start) + insertion + text.substring(end);

        const newCursorPos = start + insertion.length;
        editor.selectionStart = editor.selectionEnd = newCursorPos;
        editor.focus();

        triggerBookRender();
    });
}

let currentPresetIndex = 0;

if (demoBtn) {
    demoBtn.addEventListener('click', () => {
        const preset = demoPresets[currentPresetIndex];
        
        fontSelect.value = preset.font;
        fontSelect.dispatchEvent(new Event('change'));
        
        fontSizeInput.value = preset.fontSize;
        lineHeightInput.value = preset.lineHeight;
        letterSpacingInput.value = preset.letterSpacing;
        
        const alignRadio = document.querySelector(`input[name="alignment"][value="${preset.alignment}"]`);
        if (alignRadio) {
            alignRadio.checked = true;
        }
        
        Object.keys(preset.axes).forEach(axisId => {
            const axisInput = axesContainer.querySelector(`.axis-input[data-axis-id="${axisId}"]`);
            if (axisInput) {
                axisInput.value = preset.axes[axisId];
            }
        });
        
        triggerBookRender();
        currentPresetIndex = (currentPresetIndex + 1) % demoPresets.length;
    });
}

// INITIALER ASYNCHRONER STARTABLAUF
async function startApp() {
    editor.value = '';
    canvas.innerHTML = '';

    await autoDetectLocalAxes();
    initFontDropdown();
    initFontStyleDropdown();
    initSubTabNavigation();
    loadSubTabState('body');
    initFontSizeDropdown();
    initPagePresetsDropdown();
    initTabNavigation();
}

startApp();

const defaultText = `Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.

Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.

Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.`;

if (editor && !editor.value) {
    editor.value = defaultText;
}

triggerBookRender();