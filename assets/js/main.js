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

// 1. Speichert alle aktuellen UI-Eingaben im Datenmodell des aktiven Tabs
function saveCurrentSubTabState() {
    const current = elementStyles[currentSubTab];
    if (!current) return;

    const isInlineElement = (currentSubTab === 'bold' || currentSubTab === 'italic');
    const activeAdvancedRadio = document.querySelector('input[name="advanced-mode"]:checked');
    
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

    const selectedIndex = fontStyleSelect.value;
    if (selectedIndex !== '' && standardFontStyles[selectedIndex]) {
        current.fontWeight = standardFontStyles[selectedIndex].weight;
        current.fontStyle = standardFontStyles[selectedIndex].style;
    }

    // Achsen (Variable Fonts) speichern
    current.axes = {};
    const activeAxisInputs = axesContainer.querySelectorAll('.axis-input');
    activeAxisInputs.forEach(input => {
        current.axes[input.dataset.axisId] = input.value;
    });
}

// 2. Lädt die gespeicherten Werte des gewählten Tabs zurück in die UI-Inputs
function loadSubTabState(key) {
    saveCurrentSubTabState();
    currentSubTab = key;
    const data = elementStyles[key];

    const isInlineElement = (key === 'bold' || key === 'italic');

    // 1. Radio-Buttons im HTML synchronisieren mit den Daten des aktuellen Tabs
    const isAdvancedOn = !!data.isAdvanced;
    const targetRadio = document.getElementById(isAdvancedOn ? 'advanced-on' : 'advanced-off');
    if (targetRadio) targetRadio.checked = true;

    // 2. Paragraph-Einstellungen bei Inline-Elementen verstecken
    if (paragraphSettings) {
        paragraphSettings.classList.toggle('hidden', isInlineElement);
    }

    // 3. Settings-Schalter NUR bei Bold & Italic anzeigen
    if (advancedToggleSection) {
        advancedToggleSection.classList.toggle('hidden', !isInlineElement);
    }

    // 4. Sichtbarkeit der erweiterten Felder steuern
    const showAdvanced = !isInlineElement || isAdvancedOn;
    if (advancedMetrics) advancedMetrics.classList.toggle('hidden', !showAdvanced);
    if (advancedTransform) advancedTransform.classList.toggle('hidden', !showAdvanced);

    // 5. Schriftart-Dropdown steuern
    if (isInlineElement && !isAdvancedOn) {
        fontSelect.disabled = true;
        fontSelect.value = elementStyles.body.font;
    } else {
        fontSelect.disabled = false;
        fontSelect.value = (data.font === 'inherit') ? elementStyles.body.font : data.font;
    }

    fontSelect.dispatchEvent(new Event('change'));

    // Beim Befüllen der Textfelder:
    fontSizeInput.value = (data.fontSize === 'inherit') ? elementStyles.body.fontSize : data.fontSize;
    lineHeightInput.value = (data.lineHeight === 'inherit') ? elementStyles.body.lineHeight : data.lineHeight;
    letterSpacingInput.value = (data.letterSpacing === 'inherit') ? elementStyles.body.letterSpacing : data.letterSpacing;
    marginLeftInput.value = data.marginLeft;
    marginRightInput.value = data.marginRight;
    translateXInput.value = (data.translateX === 'inherit') ? elementStyles.body.translateX : data.translateX;
    translateYInput.value = (data.translateY === 'inherit') ? elementStyles.body.translateY : data.translateY;


    const styleIndex = standardFontStyles.findIndex(
    s => s.weight === (data.fontWeight || '400') && s.style === (data.fontStyle || 'normal')
    );
    fontStyleSelect.value = styleIndex >= 0 ? styleIndex : 0;

    const radioToSelect = document.querySelector(`input[name="alignment"][value="${data.alignment}"]`);
    if (radioToSelect) radioToSelect.checked = true;

    // Achsen-Inputs befüllen
    Object.keys(data.axes).forEach(axisId => {
        const axisInput = axesContainer.querySelector(`.axis-input[data-axis-id="${axisId}"]`);
        if (axisInput) axisInput.value = data.axes[axisId];
    });

    // Visuelles Feedback für aktiven Button
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
        cssValue: "Arial, sans-serif"
    },
    "baskerville": {
        name: "Baskerville",
        cssValue: "Baskerville, serif"
    },
    "centurygothic": {
        name: "Century Gothic",
        cssValue: "'Century Gothic', sans-serif"
    },
    "couriernew": {
        name: "Courier New",
        cssValue: "'Courier New', Courier, monospace"
    },
    "garamond": {
        name: "Garamond",
        cssValue: "Garamond, serif"
    },
    "georgia": {
        name: "Georgia",
        cssValue: "'Georgia', serif"
    },
    "impact": {
        name: "Impact",
        cssValue: "Impact, sans-serif"
    },
    "palatino": {
        name: "Palatino",
        cssValue: "Palatino, 'Palatino Linotype', serif"
    },
    "times": {
        name: "Times New Roman",
        cssValue: "'Times New Roman', serif"
    },
    "trebuchetms": {
        name: "Trebuchet MS",
        cssValue: "'Trebuchet MS', sans-serif"
    },
    "verdana": {
        name: "Verdana",
        cssValue: "Verdana, sans-serif"
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
        url: "assets/fonts/GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf"
    },
    "digitaluhr": {
        name: "Digitaluhr",
        cssValue: "Digitaluhr, sans-serif",
        url: "assets/fonts/DigitalUhr6VF.ttf"
    },
    "shapeshifter": {
        name: "ShapeShifter",
        cssValue: "ShapeShifter, sans-serif",
        url: "assets/fonts/ShapeShifter_2Termin_1Übung_2VF.ttf"
    },
    "decovar": {
        name: "Decovar",
        cssValue: "'Decovar', serif",
        url: "assets/fonts/DecovarAlpha-VF.ttf"
    },
};

// 2. DER AUTOMATISCHE ACHSEN-SCANNER
async function autoDetectLocalAxes() {
    for (const key in fontConfig) {
        const font = fontConfig[key];
        
        if (font.url) {
            try {
                const response = await fetch(font.url);
                const arrayBuffer = await response.arrayBuffer();
                
                const parsedFont = opentype.parse(arrayBuffer);
                font.axes = [];

                if (parsedFont.tables && parsedFont.tables.fvar && parsedFont.tables.fvar.axes) {
                    parsedFont.tables.fvar.axes.forEach(axis => {
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
                font.axes = [];
            }
        } else {
            font.axes = [];
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

        const effectiveFontKey = (style.font === 'inherit') ? elementStyles.body.font : style.font;
        const font = fontConfig[effectiveFontKey] || fontConfig['arial'];

        const effectiveFontSize = (style.fontSize === 'inherit') ? elementStyles.body.fontSize : style.fontSize;
        const effectiveLineHeight = (style.lineHeight === 'inherit') ? elementStyles.body.lineHeight : style.lineHeight;
        const effectiveLetterSpacing = (style.letterSpacing === 'inherit') ? elementStyles.body.letterSpacing : style.letterSpacing;

        const effectiveTx = (style.translateX === 'inherit') ? elementStyles.body.translateX : style.translateX;
        const effectiveTy = (style.translateY === 'inherit') ? elementStyles.body.translateY : style.translateY;

        const tx = (effectiveTx || '0px').trim();
        const ty = (effectiveTy || '0px').trim();

        // Variable Font Rules aufbauen
        let fontVariationRules = 'font-variation-settings: normal !important;';
        if (style.axes && Object.keys(style.axes).length > 0) {
            const axesRules = Object.keys(style.axes)
                .filter(axisId => style.axes[axisId].trim() !== '')
                .map(axisId => `'${axisId}' calc(${style.axes[axisId]})`);
            if (axesRules.length > 0) {
                fontVariationRules = `font-variation-settings: ${axesRules.join(', ')} !important;`;
            }
        }

        generatedCss += `
    .pagedjs_area ${selector} {
        text-align: ${style.alignment} !important;
        padding-left: calc(${style.marginLeft}) !important;
        padding-right: calc(${style.marginRight}) !important;
        box-sizing: border-box !important;
        font-family: ${font.cssValue} !important;
        font-weight: ${style.fontWeight || '400'} !important;
        font-style: ${style.fontStyle || 'normal'} !important;
        font-size: calc(${effectiveFontSize}) !important;
        line-height: calc(${effectiveLineHeight}) !important;
    }

    .pagedjs_area ${selector} .char {
        display: inline-block !important;
        transform: translate(calc(${tx}), calc(${ty})) !important;
        font-family: ${font.cssValue} !important;
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

[fontSizeInput, lineHeightInput, letterSpacingInput, marginLeftInput, marginRightInput, translateXInput, translateYInput].forEach(input => {
    if (input) {
        input.addEventListener('input', () => {
            saveCurrentSubTabState();
            triggerBookRender();
        });
    }
});

fontSelect.addEventListener('change', () => {
    updateAxisInputs();
    triggerBookRender();
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