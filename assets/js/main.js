import { formulaPresets } from './formulas.js';
import { pagePresets } from './pages.js';
import { demoPresets } from './demos.js';
import { initialElementStyles } from './elementStyles.js';

// ==========================================
// 1. DOM-ELEMENTE REFERENZIEREN
// ==========================================
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
const indentLeftInput = document.getElementById('indent-left-input');
const indentRightInput = document.getElementById('indent-right-input');
const indentFirstLineInput = document.getElementById('indent-first-line-input');
const indentFirstLineGroup = document.getElementById('indent-first-line-group');
const pagePresetSelect = document.getElementById('page-preset-select');
const pageHeightInput = document.getElementById('page-height-input');
const pageWidthInput = document.getElementById('page-width-input');
const pageMarginTopInput = document.getElementById('page-margin-top-input');
const pageMarginBottomInput = document.getElementById('page-margin-bottom-input');
const pageMarginLeftInput = document.getElementById('page-margin-left-input');
const pageMarginRightInput = document.getElementById('page-margin-right-input');
const zoomInput = document.getElementById('zoom-input');
const exportPdfButtons = document.querySelectorAll('#btn-export-pdf-1, #btn-export-pdf-2, #btn-export-pdf-3, #btn-export-pdf-4');
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
const textEditorTextarea = document.getElementById('text-editor-textarea');
const fontUploadInput = document.getElementById('font-upload-input');
const hyphenationRadios = document.querySelectorAll('input[name="hyphenation"]');
const hyphenationOnRadio = document.getElementById('hyphenation-on');
const hyphenationOffRadio = document.getElementById('hyphenation-off');
const languageInput = document.getElementById('language-input');
const fontStyleSelect = document.getElementById('font-style-select');
const renderingRadios = document.querySelectorAll('input[name="rendering"]');
const indexationRadios = document.querySelectorAll('input[name="indexation-scope"]');
const elementSplittingRadios = document.querySelectorAll('input[name="element-splitting"]');
const lineSplittingRadios = document.querySelectorAll('input[name="line-splitting"]');
const facingPagesRadios = document.querySelectorAll('input[name="facing-pages"]');
const cropMarksRadios = document.querySelectorAll('input[name="crop-marks"]');
const bleedTopInput = document.getElementById('bleed-top-input');
const bleedBottomInput = document.getElementById('bleed-bottom-input');
const bleedLeftInput = document.getElementById('bleed-left-input');
const bleedRightInput = document.getElementById('bleed-right-input');
const letterSpacingSelect = document.getElementById('letter-spacing-select');
const translateXSelect = document.getElementById('translate-x-select');
const translateYSelect = document.getElementById('translate-y-select');
const skewXSelect = document.getElementById('skew-x-select');
const skewYSelect = document.getElementById('skew-y-select');
const rotateSelect = document.getElementById('rotate-select');
const skewXInput = document.getElementById('skew-x-input');
const skewYInput = document.getElementById('skew-y-input');
const rotateInput = document.getElementById('rotate-input');
const btnMarginsLeft = document.getElementById('btn-margins-left');
const btnMarginsRight = document.getElementById('btn-margins-right');
const labelMarginsLeft = document.getElementById('label-margins-left');
const marginEditorLeftTextarea = document.getElementById('margin-editor-left-textarea');
const marginEditorRightTextarea = document.getElementById('margin-editor-right-textarea');
const paragraphMarginsGroup = document.getElementById('paragraph-margins-group');
const marginPaddingGroup = document.getElementById('margin-padding-group');
const paddingTopInput = document.getElementById('padding-top-input');
const paddingBottomInput = document.getElementById('padding-bottom-input');

let previousFontKey = 'arial';

const marginInputsLeft = {
    topLeft: document.getElementById('margin-editor-top-left'),
    topCenter: document.getElementById('margin-editor-top-center'),
    topRight: document.getElementById('margin-editor-top-right'),
    bottomLeft: document.getElementById('margin-editor-bottom-left'),
    bottomCenter: document.getElementById('margin-editor-bottom-center'),
    bottomRight: document.getElementById('margin-editor-bottom-right')
};

const marginInputsRight = {
    topLeft: document.getElementById('margin-editor-right-top-left'),
    topCenter: document.getElementById('margin-editor-right-top-center'),
    topRight: document.getElementById('margin-editor-right-top-right'),
    bottomLeft: document.getElementById('margin-editor-right-bottom-left'),
    bottomCenter: document.getElementById('margin-editor-right-bottom-center'),
    bottomRight: document.getElementById('margin-editor-right-bottom-right')
};

// ==========================================
// 2. STYLES & STRUKTUREN
// ==========================================
const STYLES = {
    REGULAR:     { label: 'Regular', weight: '400', style: 'normal' },
    ITALIC:      { label: 'Italic', weight: '400', style: 'italic' },
    BOLD:        { label: 'Bold', weight: '700', style: 'normal' },
    BOLD_ITALIC: { label: 'Bold Italic', weight: '700', style: 'italic' }
};

const ALL_4_STYLES = [STYLES.REGULAR, STYLES.ITALIC, STYLES.BOLD, STYLES.BOLD_ITALIC];
const REGULAR_ONLY  = [STYLES.REGULAR];
const NO_ITALIC     = [STYLES.REGULAR, STYLES.BOLD];
const NO_BOLD       = [STYLES.REGULAR, STYLES.ITALIC];

let currentSubTab = 'body';

const subTabButtons = {
    body: document.getElementById('btn-body-settings'),
    h1: document.getElementById('btn-h1-settings'),
    h2: document.getElementById('btn-h2-settings'),
    bold: document.getElementById('btn-bold-settings'),
    italic: document.getElementById('btn-italic-settings'),
    margins: document.getElementById('btn-margins-settings')
};

const standardFontStyles = [
    { label: 'Regular', weight: '400', style: 'normal' },
    { label: 'Italic', weight: '400', style: 'italic' },
    { label: 'Bold', weight: '700', style: 'bold' },
    { label: 'Bold Italic', weight: '700', style: 'italic' }
];

const selectorMap = {
    body: 'p',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    bold: 'strong',
    italic: 'em'
};

const elementStyles = structuredClone(initialElementStyles);
let typingTimeout;

// ==========================================
// 3. HILFSFUNKTIONEN
// ==========================================

function setupFormulaDropdown(selectEl, inputEl) {
    if (!selectEl || !inputEl) return;

    selectEl.innerHTML = '';
    
    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = "fx";
    placeholderOption.value = "";
    selectEl.appendChild(placeholderOption);

    formulaPresets.forEach(preset => {
        const option = document.createElement('option');
        option.textContent = preset.name;
        option.value = preset.fontSize;
        selectEl.appendChild(option);
    });

    selectEl.addEventListener('change', (event) => {
        const chosenFormula = event.target.value;
        if (chosenFormula !== "") {
            inputEl.value = chosenFormula;
            selectEl.selectedIndex = 0;
            saveCurrentSubTabState();
            triggerBookRender(0);
        }
    });
}

function initFormulaDropdowns() {
    setupFormulaDropdown(fontSizeSelect, fontSizeInput);
    setupFormulaDropdown(letterSpacingSelect, letterSpacingInput);
    setupFormulaDropdown(translateXSelect, translateXInput);
    setupFormulaDropdown(translateYSelect, translateYInput);
    setupFormulaDropdown(skewXSelect, skewXInput);
    setupFormulaDropdown(skewYSelect, skewYInput);
    setupFormulaDropdown(rotateSelect, rotateInput);
}

// Manuelle Zeichen-Zerlegung für echten Erhalt aller Leerzeichen
function applyCustomCharSplitting(element) {
    // 1. Alle Text-Knoten im Element finden
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
        textNodes.push(node);
    }

    // Globale Zähler für diesen Paragraphen / dieses Element
    let charIndexGlobal = 0; 
    let spaceCountInSequence = 0; // Falls du Leerzeichen-Ketten zählst

    textNodes.forEach(textNode => {
        const text = textNode.nodeValue;
        const parent = textNode.parentNode;

        // Leere Zeilen und bereits verarbeitete Knoten überspringen
        if (parent.closest('.empty-line') || parent.closest('.char')) {
            return;
        }

        let currentWord = null;
        let currentSyllable = null;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            // Unsichtbare Formatierungs-Zeichen ignorieren
            if (char === '\n' || char === '\r' || char === '\t') {
                continue;
            }

            const charSpan = document.createElement('span');
            charSpan.setAttribute('data-char', char);
            charSpan.textContent = char;

            // ==========================================
            // FALL A: LEERZEICHEN
            // ==========================================
            if (char === ' ' || char === '\u00A0') {
                charSpan.className = 'char space';
                
                // Erbt den Index des vorherigen Buchstabens (Rhythmus bleibt erhalten!)
                charSpan.style.setProperty('--char-index', charIndexGlobal);
                
                // Wort- und Silbenbindung aufheben
                currentWord = null;
                currentSyllable = null;
                spaceCountInSequence++;
                
                parent.insertBefore(charSpan, textNode);
            } 
            // ==========================================
// FALL B: WEICHER TRENNSTRICH (Soft Hyphen / &shy;)
// ==========================================
else if (char === '\u00AD') {
    charSpan.className = 'char shy';
    charSpan.style.setProperty('--char-index', charIndexGlobal);
    charSpan.textContent = '\u00AD'; 
    
    if (currentWord) {
        currentWord.appendChild(charSpan); // Das isolierte Gelenk wird ans Wort gehängt
        currentSyllable = null;            // Silbe schließen, damit das Gelenk funktioniert!
    } else {
        parent.insertBefore(charSpan, textNode);
    }
}
            // ==========================================
            // FALL C: ECHTE BUCHSTABEN
            // ==========================================
            else {
                charSpan.className = 'char';
                
                // ZÄHLER HOCHSETZEN! (Hier passiert der eigentliche Rhythmus)
                charIndexGlobal++;
                charSpan.style.setProperty('--char-index', charIndexGlobal);
                spaceCountInSequence = 0; // Reset für Leerzeichen-Ketten

                // 1. Wort-Container erstellen, falls wir in einem neuen Wort sind
                if (!currentWord) {
                    currentWord = document.createElement('span');
                    currentWord.className = 'word';
                    parent.insertBefore(currentWord, textNode);
                }

                // 2. Silben-Container erstellen (Falls du sie mal kurz abschalten 
                // willst, kommentiere diesen Block aus und ändere unten "currentSyllable" zu "currentWord")
                if (!currentSyllable) {
                    currentSyllable = document.createElement('span');
                    currentSyllable.className = 'syllable';
                    currentWord.appendChild(currentSyllable);
                }

                // 3. Buchstaben einfügen
                currentSyllable.appendChild(charSpan);
            }
        }
        
        // Den alten, unformatierten Text-String aus dem HTML entfernen
        parent.removeChild(textNode);
    });

    // Am Ende dem gesamten Paragraphen die korrekte Gesamtanzahl der ECHTEN Buchstaben übergeben
    element.style.setProperty('--char-total', charIndexGlobal);
}

function getElementSplittingMode() {
    const checked = document.querySelector('input[name="element-splitting"]:checked');
    return checked ? checked.value : 'characters';
}

function getLineSplittingMode() {
    const checked = document.querySelector('input[name="line-splitting"]:checked');
    return checked ? checked.value : 'on';
}

function getRenderingMode() {
    const checked = document.querySelector('input[name="rendering"]:checked');
    return checked ? checked.value : 'live';
}

function getCropMarksMode() {
    const checked = document.querySelector('input[name="crop-marks"]:checked');
    return checked ? checked.value : 'off';
}

function updateFacingPagesLabels() {
    const isFacing = (getFacingPagesMode() === 'on');
    const getLabel = (inputEl) => inputEl?.closest('div')?.querySelector('p') || inputEl?.parentElement?.querySelector('p');

    const marginLeftLabel = getLabel(pageMarginLeftInput);
    const marginRightLabel = getLabel(pageMarginRightInput);
    const bleedLeftLabel = getLabel(bleedLeftInput);
    const bleedRightLabel = getLabel(bleedRightInput);

    if (marginLeftLabel) marginLeftLabel.textContent = isFacing ? 'Margin inside' : 'Margin left';
    if (marginRightLabel) marginRightLabel.textContent = isFacing ? 'Margin outside' : 'Margin right';
    if (bleedLeftLabel) bleedLeftLabel.textContent = isFacing ? 'Bleed inside' : 'Bleed left';
    if (bleedRightLabel) bleedRightLabel.textContent = isFacing ? 'Bleed outside' : 'Bleed right';
}

const hyphenatorCache = new Map();

function normalizeLangCode(lang) {
    if (!lang) return 'en-us';
    const clean = lang.trim().toLowerCase();
    
    const map = {
        'en': 'en-us', 'en-us': 'en-us', 'en-gb': 'en-gb',
        'de': 'de', 'de-de': 'de', 'de-at': 'de', 'de-ch': 'de',
        'fr': 'fr', 'fr-fr': 'fr', 'es': 'es', 'es-es': 'es',
        'it': 'it', 'it-it': 'it', 'pt': 'pt', 'nl': 'nl', 'ru': 'ru', 'hi': 'hi'
    };

    if (map[clean]) return map[clean];
    const base = clean.split('-')[0];
    if (map[base]) return map[base];

    return clean;
}

function getFacingPagesMode() {
    const checked = document.querySelector('input[name="facing-pages"]:checked');
    return checked ? checked.value : 'off';
}

async function getHyphenator(lang = 'en') {
    const targetLang = normalizeLangCode(lang);

    if (hyphenatorCache.has(targetLang)) {
        return hyphenatorCache.get(targetLang);
    }

    try {
        const module = await import(`https://esm.sh/hyphen@1.10.3/${targetLang}?bundle`);
        
        const syncFn = module.hyphenateSync || 
                       (module.default && module.default.hyphenateSync) || 
                       module.default;

        const hyphenFn = (text) => {
            try {
                const res = syncFn(text, { sync: true });
                if (typeof res === 'string') return res;
                return text;
            } catch (e) {
                console.error('Fehler bei der Silbentrennung:', e);
                return text;
            }
        };

        hyphenatorCache.set(targetLang, hyphenFn);
        return hyphenFn;
    } catch (e) {
        console.warn(`Kein Trennschema für "${targetLang}" gefunden. Trennung deaktiviert.`, e);
        const fallbackFn = (text) => text;
        hyphenatorCache.set(targetLang, fallbackFn);
        return fallbackFn;
    }
}

async function applyExperimentalSplitting(container, lang) {
    const hyphenate = await getHyphenator(lang);

    const paragraphs = container.querySelectorAll('p, h1, h2, h3');
    paragraphs.forEach(p => {
        p.textContent = hyphenate(p.textContent);
    });

    applyCustomCharSplitting(container);
}

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
            input.blur();
        }
    });

    input.addEventListener('blur', () => {
        if (onCommit) onCommit();
    });
}

function getHyphenationValue() {
    const checked = document.querySelector('input[name="hyphenation"]:checked');
    return checked ? checked.value : 'off';
}

function setHyphenationUI(value) {
    if (value === 'on') {
        if (hyphenationOnRadio) hyphenationOnRadio.checked = true;
    } else {
        if (hyphenationOffRadio) hyphenationOffRadio.checked = true;
    }
}

// ==========================================
// 4. SUB-TAB ZUSTANDS-STEUERUNG
// ==========================================
function saveCurrentSubTabState() {
    const current = elementStyles[currentSubTab];
    if (!current) return;

    const isInlineElement = (currentSubTab === 'bold' || currentSubTab === 'italic');
    const activeAdvancedRadio = document.querySelector('input[name="advanced-mode"]:checked');

    const effectiveFontKey = (current.font === 'inherit') ? elementStyles.body.font : current.font;
    const font = fontConfig[effectiveFontKey] || fontConfig['arial'];
    const availableStyles = font.styles || ALL_4_STYLES;

    current.hyphenation = getHyphenationValue();
    current.language = languageInput ? languageInput.value : 'en';

    const selectedIndex = parseInt(fontStyleSelect.value, 10);
    if (!isNaN(selectedIndex) && availableStyles[selectedIndex]) {
        current.styleIndex = selectedIndex;
        current.fontWeight = availableStyles[selectedIndex].weight;
        current.fontStyle = availableStyles[selectedIndex].style;
    }
    
    if (activeAdvancedRadio) {
        current.isAdvanced = (activeAdvancedRadio.value === 'on');
    }

    if (isInlineElement && !current.isAdvanced) {
        current.font = 'inherit';
        current.fontSize = 'inherit';
        current.lineHeight = 'inherit';
        current.letterSpacing = 'inherit';
        current.translateX = 'inherit';
        current.translateY = 'inherit';
        current.rotate = 'inherit';
        current.skewX = 'inherit';
        current.skewY = 'inherit';
    } else {
        if (!fontSelect.disabled) {
            current.font = fontSelect.value;
        }
        current.fontSize = fontSizeInput.value;
        current.lineHeight = lineHeightInput.value;
        current.letterSpacing = letterSpacingInput.value;
        current.translateX = translateXInput.value;
        current.translateY = translateYInput.value;
        current.rotate = rotateInput.value;
        current.skewX = skewXInput.value;
        current.skewY = skewYInput.value;
    }

    current.paddingTop = paddingTopInput.value;       // <-- Added
    current.paddingBottom = paddingBottomInput.value;
    current.indentLeft = indentLeftInput.value;
    current.indentRight = indentRightInput.value;
    
    if (currentSubTab === 'body' && indentFirstLineInput) {
        current.indentFirstLine = indentFirstLineInput.value;
    }

    const activeRadio = document.querySelector('input[name="alignment"]:checked');
    if (activeRadio) current.alignment = activeRadio.value;

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
    const isMarginElement = (key === 'margins'); // <-- Added check

    const isAdvancedOn = !!data.isAdvanced;
    const targetRadio = document.getElementById(isAdvancedOn ? 'advanced-on' : 'advanced-off');
    if (targetRadio) targetRadio.checked = true;

    if (paragraphSettings) paragraphSettings.classList.toggle('hidden', isInlineElement);
    if (advancedToggleSection) advancedToggleSection.classList.toggle('hidden', !isInlineElement);

    // FIX: Swap the margin inputs based on whether the Margins tab is active
    if (paragraphMarginsGroup) paragraphMarginsGroup.classList.toggle('hidden', isMarginElement);
    if (marginPaddingGroup) marginPaddingGroup.classList.toggle('hidden', !isMarginElement);

    const showAdvanced = !isInlineElement || isAdvancedOn;
    if (advancedMetrics) advancedMetrics.classList.toggle('hidden', !showAdvanced);
    if (advancedTransform) advancedTransform.classList.toggle('hidden', !showAdvanced);

    const effectiveFontKey = (data.font === 'inherit') ? elementStyles.body.font : data.font;
    if (isInlineElement && !isAdvancedOn) {
        fontSelect.disabled = true;
        fontSelect.value = elementStyles.body.font;
    } else {
        fontSelect.disabled = false;
        fontSelect.value = effectiveFontKey;
    }

    updateFontStyleDropdown(effectiveFontKey);
    updateAxisInputs();

    setHyphenationUI(data.hyphenation || 'off');
    if (languageInput) {
        languageInput.value = data.language || 'en';
    }

    const font = fontConfig[effectiveFontKey] || fontConfig['arial'];
    const availableStyles = font.styles || ALL_4_STYLES;
    const styleIdx = (data.styleIndex !== undefined && availableStyles[data.styleIndex]) ? data.styleIndex : 0;
    fontStyleSelect.value = styleIdx;

    fontSizeInput.value = (data.fontSize === 'inherit') ? elementStyles.body.fontSize : data.fontSize;
    lineHeightInput.value = (data.lineHeight === 'inherit') ? elementStyles.body.lineHeight : data.lineHeight;
    letterSpacingInput.value = (data.letterSpacing === 'inherit') ? elementStyles.body.letterSpacing : data.letterSpacing;
    indentLeftInput.value = data.indentLeft || data.marginLeft || '0px';
    indentRightInput.value = data.indentRight || data.marginRight || '0px';

    if (indentFirstLineGroup) {
        indentFirstLineGroup.classList.toggle('hidden', key !== 'body');
    }
    if (key === 'body' && indentFirstLineInput) {
        indentFirstLineInput.value = data.indentFirstLine || '0mm';
    }

    paddingTopInput.value = data.paddingTop || '0mm';       // <-- Added
    paddingBottomInput.value = data.paddingBottom || '0mm'; // <-- Added
    translateXInput.value = (data.translateX === 'inherit') ? elementStyles.body.translateX : data.translateX;
    translateYInput.value = (data.translateY === 'inherit') ? elementStyles.body.translateY : data.translateY;
    rotateInput.value = (data.rotate === 'inherit') ? elementStyles.body.rotate : (data.rotate || '0deg');
    skewXInput.value = (data.skewX === 'inherit') ? elementStyles.body.skewX : (data.skewX || '0deg');
    skewYInput.value = (data.skewY === 'inherit') ? elementStyles.body.skewY : (data.skewY || '0deg');

    const radioToSelect = document.querySelector(`input[name="alignment"][value="${data.alignment}"]`);
    if (radioToSelect) radioToSelect.checked = true;

    Object.keys(data.axes).forEach(axisId => {
        const axisInput = axesContainer.querySelector(`.axis-input[data-axis-id="${axisId}"]`);
        if (axisInput) axisInput.value = data.axes[axisId];
    });

    Object.keys(subTabButtons).forEach(btnKey => {
        if (subTabButtons[btnKey]) {
            subTabButtons[btnKey].classList.toggle('active', btnKey === key);
        }
    });
}

function initSubTabNavigation() {
    Object.keys(subTabButtons).forEach(key => {
        const btn = subTabButtons[key];
        if (btn) {
            btn.addEventListener('click', () => loadSubTabState(key));
        }
    });

    if (subTabButtons.body) subTabButtons.body.classList.add('active');
}

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
}

function initTabNavigation() {
    const tabs = [
        { button: btnTabEditor, panel: textEditorPanel },
        { button: btnTabStyles, panel: stylesPanel },
        { button: btnTabPages, panel: pagesPanel },
        { button: btnTabSettings, panel: settingspanel }
    ];

    tabs.forEach(activeTab => {
        if (activeTab.button && activeTab.panel) {
            activeTab.button.addEventListener('click', () => {
                tabs.forEach(tab => {
                    if (tab.panel) tab.panel.classList.add('hidden');
                    if (tab.button) tab.button.classList.remove('active');
                });

                activeTab.panel.classList.remove('hidden');
                activeTab.button.classList.add('active');
            });
        }
    });
}

function applyZoom(rawValue) {
    let zoomValue = parseInt(rawValue, 10);
    if (isNaN(zoomValue)) zoomValue = 100;

    zoomValue = Math.max(10, Math.min(200, zoomValue));
    canvas.style.setProperty('--preview-zoom', `${zoomValue}%`);
    zoomInput.value = `${zoomValue}%`;
}

// ==========================================
// 5. SCHRIFTEN & VARIABLE FONTS CONFIG
// ==========================================
const fontConfig = {
    "arial": { name: "Arial", cssValue: 'Arial, "Helvetica Neue", Helvetica, sans-serif', styles: ALL_4_STYLES },
    "verdana": { name: "Verdana", cssValue: 'Verdana, Geneva, sans-serif', styles: ALL_4_STYLES },
    "trebuchetms": { name: "Trebuchet MS", cssValue: '"Trebuchet MS", "Lucida Sans Unicode", sans-serif', styles: ALL_4_STYLES },
    "centurygothic": { name: "Century Gothic", cssValue: '"Century Gothic", Futura, sans-serif', styles: ALL_4_STYLES },
    "times": { name: "Times New Roman", cssValue: '"Times New Roman", Times, serif', styles: ALL_4_STYLES },
    "georgia": { name: "Georgia", cssValue: 'Georgia, Cambria, serif', styles: ALL_4_STYLES },
    "garamond": { name: "Garamond", cssValue: 'Garamond, "Baskerville Old Face", serif', styles: ALL_4_STYLES },
    "baskerville": { name: "Baskerville", cssValue: 'Baskerville, "Palatino Linotype", Palatino, serif', styles: ALL_4_STYLES },
    "couriernew": { name: "Courier New", cssValue: '"Courier New", Courier, monospace', styles: ALL_4_STYLES },
    "impact": { name: "Impact", cssValue: 'Impact, "Arial Black", sans-serif', styles: REGULAR_ONLY },
    "fraunces": { name: "Fraunces", cssValue: 'Fraunces, sans-serif', styles: NO_BOLD, url: "assets/fonts/Fraunces[SOFT,WONK,opsz,wght].ttf" },
    "googlesansflex": { name: "Google Sans Flex", cssValue: 'GoogleSansFlex, sans-serif', styles: REGULAR_ONLY, url: "assets/fonts/GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf" },
    "robotoflex": { name: "Roboto Flex", cssValue: 'RobotoFlex, sans-serif', styles: REGULAR_ONLY, url: "assets/fonts/RobotoFlex[GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght].ttf" },
    "robotserif": { name: "Roboto Serif", cssValue: 'RobotoSerif, sans-serif', styles: NO_BOLD, url: "assets/fonts/RobotoSerif[grad,opsz,wdth,wgth].ttf" },
    "sciencegothic": { name: "Science Gothic", cssValue: 'ScienceGothic, sans-serif', styles: REGULAR_ONLY, url: "assets/fonts/ScienceGothic-VariableFont_CTRS,slnt,wdth,wght.ttf" },
    "sono": { name: "Sono", cssValue: 'Sono, sans-serif', styles: REGULAR_ONLY, url: "assets/fonts/Sono[MONO,wght].ttf" },
    "sprat": { name: "Sprat", cssValue: 'Sprat, sans-serif', styles: REGULAR_ONLY, url: "assets/fonts/SpratVF.ttf" },
    "shapeshifter": { name: "ShapeShifter", cssValue: 'ShapeShifter, sans-serif', styles: REGULAR_ONLY, url: "assets/fonts/ShapeShifter_2Termin_1uebung_2VF.ttf" },
    "tilt": {
        name: "Tilt",
        cssValue: "'Tilt Neon', sans-serif",
        styles: [
            { label: 'Neon', weight: '400', style: 'normal', cssValue: "'Tilt Neon', sans-serif", url: "assets/fonts/TiltNeon[HROT,VROT].ttf" },
            { label: 'Prism', weight: '400', style: 'normal', cssValue: "'Tilt Prism', sans-serif", url: "assets/fonts/TiltPrism[HROT,VROT].ttf" },
            { label: 'Warp', weight: '400', style: 'normal', cssValue: "'Tilt Warp', sans-serif", url: "assets/fonts/TiltWarp[HROT,VROT].ttf" }
        ]
    },
};

async function autoDetectLocalAxes() {
    for (const key in fontConfig) {
        const font = fontConfig[key];
        const stylesToScan = font.styles || [];

        if (font.url) {
            font.axes = await scanSingleFontFile(font.url, font.name);
        }

        for (const styleObj of stylesToScan) {
            if (styleObj.url) {
                styleObj.axes = await scanSingleFontFile(styleObj.url, `${font.name} (${styleObj.label})`);
            }
        }
    }
}

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
        return detectedAxes;
    } catch (err) {
        console.error(`Fehler beim Scannen von ${fontLabel} unter ${url}:`, err);
        return [];
    }
}

function initFontDropdown() {
    fontSelect.innerHTML = '';
    
    for (const key in fontConfig) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = fontConfig[key].name;
        fontSelect.appendChild(option);
    }

    const uploadOption = document.createElement('option');
    uploadOption.value = '__upload__';
    uploadOption.textContent = '[+] Upload font';
    fontSelect.appendChild(uploadOption);
}

function updateAxisInputs() {
    const selectedKey = fontSelect.value;
    const font = fontConfig[selectedKey];
    if (!font) return;

    const availableStyles = font.styles || ALL_4_STYLES;
    const selectedStyleIndex = fontStyleSelect.value || 0;
    const currentStyleObj = availableStyles[selectedStyleIndex] || availableStyles[0];
    const activeAxes = (currentStyleObj && currentStyleObj.axes) ? currentStyleObj.axes : (font.axes || []);

    axesContainer.innerHTML = '';
    const hasAxes = activeAxes.length > 0;
    variableSettings.classList.toggle('hidden', !hasAxes);

    if (!hasAxes) return;

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
        
        attachCommitListener(input, () => {
            saveCurrentSubTabState();
            triggerBookRender();
        });
        
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
                saveCurrentSubTabState();
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

// ==========================================
// 6. DYNAMISCHE DOKUMENT-STYLES GENERIEREN
// ==========================================
function applyDynamicStyles() {
    saveCurrentSubTabState();

    let generatedCss = '';

    const isHyphenationOn = (getHyphenationValue() === 'on');
    const currentLang = (languageInput && languageInput.value.trim()) ? languageInput.value.trim() : 'en';
    const elemSplitting = getElementSplittingMode();

    document.documentElement.setAttribute('lang', currentLang);

    const pagedIframe = document.querySelector('.pagedjs_frame');
    if (pagedIframe && pagedIframe.contentDocument) {
        pagedIframe.contentDocument.documentElement.setAttribute('lang', currentLang);
    }

    const hyphensValue = isHyphenationOn ? 'auto' : 'manual';

    // Grundlegende Layout-Styles & Whitespace Handling
    generatedCss += `
    .pagedjs_area, 
    .pagedjs_page, 
    .pagedjs_area *,
    .pagedjs_page * {
        overflow-wrap: break-word;
    }

    /* WICHTIG: white-space: normal, damit Blocksatz (justify) erlaubt ist */
    .pagedjs_area p,
    .pagedjs_area h1,
    .pagedjs_area h2,
    .pagedjs_area h3 {
        display: block !important;
        width: 100% !important;
        white-space: normal !important;
        hyphens: ${hyphensValue} !important;
        -webkit-hyphens: ${hyphensValue} !important;
    }

    .pagedjs_area .word {
        display: inline! important;
        white-space: normal !important;
        line-height: inherit !important;
    }

    .pagedjs_area .syllable {
        display: inline !important;
        white-space: nowrap !important;
        vertical-align: baseline !important;
        line-height: inherit !important;
    }

    .pagedjs_area .char {
        display: inline !important;
        white-space: pre !important;
        vertical-align: baseline !important;
        line-height: inherit !important;
    }

    .pagedjs_area .char.shy {
        display: inline !important;
        white-space: normal !important;
    }

    /* Leerzeichen sind inline und normal formatiert für dynamischen Blocksatz */
    .pagedjs_area .char.space {
        display: inline !important;
        white-space: normal !important;
        line-height: 0 !important;
    }

    .pagedjs_area .line {
        display: block !important;
        position: relative !important;
        white-space: normal !important;
    }



/* 1. Die Magie für die Buchstaben: Box-Höhe für das Layout "unsichtbar" machen */
    .pagedjs_area .word,
    .pagedjs_area .syllable,
    .pagedjs_area .char {
        text-indent: 0 !important;
        line-height: 0 !important;
        
        /* Zwingt den Browser, diese Elemente bei der Zeilenhöhe zu ignorieren, 
           selbst wenn sie durch Formeln auf der Grundlinie stark verschoben werden */
    }



    `;

    let splitTargetSelector = '.char';
    if (elemSplitting === 'words') {
        splitTargetSelector = '.word';
    } else if (elemSplitting === 'off') {
        splitTargetSelector = ''; 
    }

    Object.keys(elementStyles).forEach(key => {
        const style = elementStyles[key];
        const selector = selectorMap[key] || key;

        const effectiveFontKey = (style.font === 'inherit') ? elementStyles.body.font : style.font;
        const font = fontConfig[effectiveFontKey] || fontConfig['arial'] || { cssValue: 'sans-serif' };
        const availableStyles = font.styles || ALL_4_STYLES || [];

        const styleIdx = (style.styleIndex !== undefined && availableStyles[style.styleIndex]) 
            ? style.styleIndex 
            : 0;
        const currentStyleObj = availableStyles[styleIdx] || availableStyles[0];

        const finalFontFamily = (currentStyleObj && currentStyleObj.cssValue) 
            ? currentStyleObj.cssValue 
            : (font.cssValue || 'sans-serif');

        const effectiveFontSize = (style.fontSize === 'inherit') ? elementStyles.body.fontSize : style.fontSize;
        const effectiveLineHeight = (style.lineHeight === 'inherit') ? elementStyles.body.lineHeight : style.lineHeight;
        const effectiveLetterSpacing = (style.letterSpacing === 'inherit') ? elementStyles.body.letterSpacing : style.letterSpacing;


        // ==========================================
        // NEU: LEERE ZEILEN ANS RASTER KOPPELN
        // ==========================================
        if (key === 'body') {
            // Lokaler Check: Macht aus "1.5" ein "1.5em", lässt "18px" aber als "18px"
            // (wird nur hier für die "height"-Eigenschaft benötigt)
            let lhVal = (effectiveLineHeight || '1.4').toString().trim();
            let heightVal = /^\d+(\.\d+)?$/.test(lhVal) ? `${lhVal}em` : lhVal;

            generatedCss += `
            .pagedjs_area .empty-line {
                display: block !important;
                height: calc(${heightVal}) !important; /* height braucht zwingend eine Einheit! */
                margin: 0 !important;
                padding: 0 !important;
                line-height: 0 !important; 
                overflow: hidden !important; 
            }
            `;
        }

        const tx = (style.translateX === 'inherit' ? elementStyles.body.translateX : style.translateX || '0px').trim();
        const ty = (style.translateY === 'inherit' ? elementStyles.body.translateY : style.translateY || '0px').trim();
        const rot = (style.rotate === 'inherit' ? elementStyles.body.rotate : style.rotate || '0deg').trim();
        const sx = (style.skewX === 'inherit' ? elementStyles.body.skewX : style.skewX || '0deg').trim();
        const sy = (style.skewY === 'inherit' ? elementStyles.body.skewY : style.skewY || '0deg').trim();

        // FIX: Nur Transforms / Positions setzen, wenn sie aktiv verändert wurden.
        // Andernfalls macht Paged.js die Block-Elemente (z.B. <p>) monolithisch und kann sie nicht mehr umbrechen.
        let transformRule = '';
        let positionRule = '';
        
        if (rot !== '0deg' || sx !== '0deg' || sy !== '0deg') {
            transformRule = `transform: rotate(calc(${rot})) skewX(calc(${sx})) skewY(calc(${sy})) !important;`;
        }
        if (tx !== '0px' || ty !== '0px' || transformRule !== '') {
            positionRule = `
                position: relative !important;
                left: calc(${tx}) !important;
                top: calc(${ty}) !important;
            `;
        }

        let fontVariationRules = 'font-variation-settings: normal !important;';
        if (style.axes && Object.keys(style.axes).length > 0) {
            const axesRules = Object.keys(style.axes)
                .filter(axisId => style.axes[axisId] && String(style.axes[axisId]).trim() !== '')
                .map(axisId => `'${axisId}' calc(${style.axes[axisId]})`);
            
            if (axesRules.length > 0) {
                fontVariationRules = `font-variation-settings: ${axesRules.join(', ')} !important;`;
            }
        }

        if (elemSplitting === 'off') {
            generatedCss += `
            .pagedjs_area ${selector} {
                margin-top: 0 !important;    /* <--- NEU: Verhindert die großen Lücken */
                margin-bottom: 0 !important; /* <--- NEU: Verhindert die großen Lücken */
                text-align: ${style.alignment || 'left'} !important;
                padding-left: calc(${style.indentLeft || style.marginLeft || '0px'}) !important;
                padding-right: calc(${style.indentRight || style.marginRight || '0px'}) !important;
                box-sizing: border-box !important;
                font-family: ${finalFontFamily} !important;
                font-weight: ${style.fontWeight || '400'} !important;
                font-style: ${style.fontStyle || 'normal'} !important;
                font-size: calc(${effectiveFontSize || '12pt'}) !important;
                line-height: calc(${effectiveLineHeight || '1.4'}) !important;
                letter-spacing: calc(${effectiveLetterSpacing || '0px'}) !important;
                ${positionRule}
                ${transformRule}
                ${fontVariationRules}
            }
            `;
        } else {
            generatedCss += `
            .pagedjs_area ${selector} {
                margin-top: 0 !important;    /* <--- NEU: Verhindert die großen Lücken */
                margin-bottom: 0 !important; /* <--- NEU: Verhindert die großen Lücken */
                text-align: ${style.alignment || 'left'} !important;
                padding-left: calc(${style.indentLeft || '0px'}) !important;
                padding-right: calc(${style.indentRight || '0px'}) !important;
                box-sizing: border-box !important;
                font-family: ${finalFontFamily} !important;
                font-weight: ${style.fontWeight || '400'} !important;
                font-style: ${style.fontStyle || 'normal'} !important;
                font-size: calc(${effectiveFontSize || '12pt'}) !important;
                line-height: calc(${effectiveLineHeight || '1.4'}) !important;
            }

            .pagedjs_area ${selector} ${splitTargetSelector} {
                display: inline-block !important;
                vertical-align: baseline !important;
                font-family: ${finalFontFamily} !important;
                font-weight: ${style.fontWeight || '400'} !important;
                font-style: ${style.fontStyle || 'normal'} !important;
                font-size: calc(${effectiveFontSize || '12pt'}) !important;
                letter-spacing: calc(${effectiveLetterSpacing || '0px'}) !important;
                ${positionRule}
                ${transformRule}
                ${fontVariationRules}
            }
            `;
        }
        if (key === 'body' && style.indentFirstLine && style.indentFirstLine !== '0mm' && style.indentFirstLine !== '0px') {
            generatedCss += `
            /* Standard-Indent für normale Paragraphen */
            .pagedjs_area ${selector} + ${selector} {
                text-indent: calc(${style.indentFirstLine}) !important;
            }
            /* Falls Line-Splitting an ist: Den Indent gezielt nur auf die allererste Zeile übertragen */
            .pagedjs_area ${selector} + ${selector} > .line:first-child {
                text-indent: calc(${style.indentFirstLine}) !important;
            }
            `;
        }
    });

    const isFacingPages = (getFacingPagesMode() === 'on');
        if (isFacingPages) {
            generatedCss += `
                #book-canvas.facing-pages-mode .pagedjs_pages {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    
                    /* NEU: Flex-Start statt Center, und exakte Breite von 2 Seiten */
                    width: calc(${pageWidthInput.value} * 2) !important;
                    margin: 0 auto !important;
                    justify-content: flex-start !important;
                    
                    row-gap: 20px !important;
                }
                #book-canvas.facing-pages-mode .pagedjs_page {
                    margin: 0 !important;
                }
                #book-canvas.facing-pages-mode .pagedjs_page.pagedjs_first_page {
                    margin-left: ${pageWidthInput.value} !important;
                }
                #book-canvas.facing-pages-mode .pagedjs_left_page {
                    box-shadow: inset -3px 0 5px -2px rgba(0,0,0,0.15) !important;
                }
                #book-canvas.facing-pages-mode .pagedjs_right_page {
                    box-shadow: inset 3px 0 5px -2px rgba(0,0,0,0.15) !important;
                }
            `;
        }

        generatedCss += `
        @media print {
            /* 0. WICHTIG: Verhindert doppelte Ränder auch in der Doppelseitenansicht! 
                  Muss explizit für left/right/first genullt werden, 
                  da diese eine höhere CSS-Spezifität haben. */
            @page { margin: 0; }
            @page:left { margin: 0; }
            @page:right { margin: 0; }
            @page:first { margin: 0; }

            /* 1. Dokument-Hintergrund auf Weiß und Abstände nullen */
            html, body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
            }

            /* 2. Ignoriert den Vorschau-Zoom, deaktiviert Flex-Zentrierung 
                  und löscht das 20px Preview-Padding! */
            #book-canvas {
                display: block !important;
                padding: 0 !important;
                margin: 0 !important;
            }

            #book-canvas, .pagedjs_pages {
                transform: none !important;
                zoom: 1 !important;
                width: auto !important;
                height: auto !important;
            }
            
            /* 3. Schatten und Rahmen von den Einzelseiten entfernen */
            .pagedjs_page {
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                box-shadow: none !important;
            }

            pagedjs_sheet {

            }
        }
        `;

        let styleTag = document.getElementById('dynamic-book-styles');
        if (!styleTag) {

        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-book-styles';
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = generatedCss;
}

// ==========================================
// 7. PAGED.JS RENDERING ENGINE
// ==========================================
let isRendering = false;
let pendingRenderDelay = null; // FIX: Verhindert infinite call stacks und sichere Verzögerungsweitergabe.

function wrapWordsInElement(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
        if (node.nodeValue.trim().length > 0) {
            textNodes.push(node);
        }
    }
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        const frag = document.createDocumentFragment();
        const parts = textNode.nodeValue.split(/(\s+)/);
        parts.forEach(part => {
            if (part.trim().length > 0) {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = part;
                frag.appendChild(span);
            } else if (part.length > 0) {
                frag.appendChild(document.createTextNode(part));
            }
        });
        parent.replaceChild(frag, textNode);
    });
}

function applyLineSplitting(container) {
    const blocks = container.querySelectorAll('.pagedjs_area p, .pagedjs_area h1, .pagedjs_area h2, .pagedjs_area h3');
    
    blocks.forEach(block => {
        let words = Array.from(block.querySelectorAll('.word'));
        
        if (words.length === 0) {
            wrapWordsInElement(block);
            words = Array.from(block.querySelectorAll('.word'));
        }

        if (words.length === 0) return;

        const lines = [];
        let currentLine = [];
        let currentTop = null;

        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            if (currentTop === null || Math.abs(rect.top - currentTop) > 4) {
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                }
                currentLine = [word];
                currentTop = rect.top;
            } else {
                currentLine.push(word);
            }
        });
        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        lines.forEach(lineWords => {
            const firstWord = lineWords[0];
            const lastWord = lineWords[lineWords.length - 1];

            const lineSpan = document.createElement('span');
            lineSpan.className = 'line';

            firstWord.parentNode.insertBefore(lineSpan, firstWord);

            let curr = firstWord;
            while (curr) {
                const next = curr.nextSibling;
                lineSpan.appendChild(curr);
                if (curr === lastWord) break;
                curr = next;
            }
        });
    });
}

function triggerBookRender(customDelay = null) {
    clearTimeout(typingTimeout);

    const mode = getRenderingMode();
    let delay = 0;

    if (customDelay !== null) {
        delay = customDelay;
    } else {
        if (mode === 'live') {
            delay = 50; 
        } else if (mode === 'debounced') {
            delay = 3000;
        } else if (mode === 'manual') {
            delay = 0;
        }
    }

    if (isRendering) {
        pendingRenderDelay = delay;
        return;
    }

    typingTimeout = setTimeout(async () => {
        isRendering = true;
        let pageStyleUrl = null;

        try {
                    // FIX: Zoom-Crash bei Paged.js & Line-Splitting verhindern
                    canvas.style.setProperty('--preview-zoom', '100%');

                    // ==========================================
                    // FIX: Alte Paged.js Stylesheets RESTLOS entfernen!
                    // Da Paged.js CSS dynamisch injiziert, ist textContent leer. 
                    // Wir müssen stattdessen nach dem data-Attribut suchen.
                    // ==========================================
                    document.querySelectorAll('head style').forEach(style => {
                        if (style.id !== 'dynamic-effects' && style.id !== 'dynamic-book-styles') {
                            if (style.hasAttribute('data-pagedjs-inserted-styles') || 
                                style.textContent.includes('.pagedjs_') || 
                                style.textContent.includes('@page')) {
                                style.remove();
                            }
                        }
                    });

                    applyDynamicStyles();

            const pageWidth = pageWidthInput.value;
            const pageHeight = pageHeightInput.value;

            // ==========================================
            // FIX: Safely resolve margin styling and prevent 'calc(inherit)'
            // ==========================================
            // ==========================================
            // FIX: Safely resolve margin styling and prevent 'calc(inherit)'
            // ==========================================
            const marginStyle = elementStyles.margins || {};
            
            const effectiveMarginFontKey = (!marginStyle.font || marginStyle.font === 'inherit') ? elementStyles.body.font : marginStyle.font;
            const effectiveMarginFontSize = (!marginStyle.fontSize || marginStyle.fontSize === 'inherit') ? (elementStyles.body.fontSize || '9pt') : marginStyle.fontSize;
            const effectiveMarginLineHeight = (!marginStyle.lineHeight || marginStyle.lineHeight === 'inherit') ? (elementStyles.body.lineHeight || '1.2') : marginStyle.lineHeight;

            // Grab the active padding values (default to 0mm)
            const effectivePaddingTop = marginStyle.paddingTop || '0mm';
            const effectivePaddingBottom = marginStyle.paddingBottom || '0mm';

            const fontObj = fontConfig[effectiveMarginFontKey] || fontConfig['arial'] || { cssValue: 'sans-serif' };
            const availableStyles = fontObj.styles || ALL_4_STYLES;
            const styleIdx = marginStyle.styleIndex || 0;
            const currentStyleObj = availableStyles[styleIdx] || availableStyles[0];

            const marginFontFamily = currentStyleObj?.cssValue || fontObj.cssValue || 'sans-serif';
            const marginFontWeight = marginStyle.fontWeight || '400';
            const marginFontStyle = marginStyle.fontStyle || 'normal';

            // NEU: Lese die Achsen (Variable Fonts) für die Margins aus
            let marginFontVariationRules = 'font-variation-settings: normal !important;';
            if (marginStyle.axes && Object.keys(marginStyle.axes).length > 0) {
                const axesRules = Object.keys(marginStyle.axes)
                    .filter(axisId => marginStyle.axes[axisId] && String(marginStyle.axes[axisId]).trim() !== '')
                    .map(axisId => `'${axisId}' calc(${marginStyle.axes[axisId]})`);
                
                if (axesRules.length > 0) {
                    marginFontVariationRules = `font-variation-settings: ${axesRules.join(', ')} !important;`;
                }
            }

            const getMarginBoxStyles = (inputEl, boxType) => {
                const val = inputEl ? inputEl.value : '';
                if (!val.trim()) return 'content: none;';
                
                // NEU: Zerschneide den Text, um CSS-Funktionen wie counter(page) zu finden
                const parts = val.split(/(counters?\([^)]+\))/g);
                const contentPieces = parts.map(part => {
                    if (part.startsWith('counter')) {
                        // Die Funktion direkt als CSS-Code zurückgeben (ohne Anführungszeichen)
                        return part; 
                    } else if (part.length > 0) {
                        // Normalen Text weiterhin escapen und sicher in Anführungszeichen setzen
                        const escapedVal = part
                            .replace(/\\/g, '\\\\') 
                            .replace(/"/g, '\\"')   
                            .replace(/\n/g, '\\A '); 
                        return `"${escapedVal}"`;
                    }
                    return '';
                }).filter(Boolean);
                
                // Füge alles mit Leerzeichen zusammen (z.B. "Page " counter(page) " of " counter(pages))
                const finalContent = contentPieces.join(' ') || 'none';

                // Determine if we apply padding to the top or bottom
                let paddingRule = '';
                if (boxType === 'top') paddingRule = `padding-top: calc(${effectivePaddingTop}) !important;`;
                if (boxType === 'bottom') paddingRule = `padding-bottom: calc(${effectivePaddingBottom}) !important;`;

                return `
                    content: ${finalContent}; /* <-- HIER WURDEN DIE ANFÜHRUNGSZEICHEN ENTFERNT */
                    font-family: ${marginFontFamily} !important;
                    font-size: calc(${effectiveMarginFontSize}) !important;
                    line-height: calc(${effectiveMarginLineHeight}) !important;
                    font-weight: ${marginFontWeight} !important;
                    font-style: ${marginFontStyle} !important;
                    white-space: pre-wrap !important; 
                    ${paddingRule}
                    ${marginFontVariationRules}
                `;
            };

            updateFacingPagesLabels();

            const isFacingPages = (getFacingPagesMode() === 'on');

            if (isFacingPages) {
                canvas.classList.add('facing-pages-mode');
                canvas.style.setProperty('--page-width-val', pageWidthInput.value);
            } else {
                canvas.classList.remove('facing-pages-mode');
            }
            const isCropMarksOn = (getCropMarksMode() === 'on');

            const mTop = pageMarginTopInput.value;
            const mBottom = pageMarginBottomInput.value;
            const mLeftOrInside = pageMarginLeftInput.value;
            const mRightOrOutside = pageMarginRightInput.value;

            const bTop = bleedTopInput ? bleedTopInput.value.trim() : '0mm';
            const bBottom = bleedBottomInput ? bleedBottomInput.value.trim() : '0mm';
            const bLeftOrInside = bleedLeftInput ? bleedLeftInput.value.trim() : '0mm';
            const bRightOrOutside = bleedRightInput ? bleedRightInput.value.trim() : '0mm';

            const marksRule = isCropMarksOn ? 'marks: crop;' : 'marks: none;';

            const bleedRule = `bleed: ${bTop} ${bRightOrOutside} ${bBottom} ${bLeftOrInside};`;

            let pageStyleContent = '';

            if (isFacingPages) {
                // NEU: Ein globaler Basis-Bleed für das Root-Element, 
                // damit Paged.js nicht auf die 6mm zurückfällt!
                const baseBleed = `bleed: ${bTop} ${bRightOrOutside} ${bBottom} ${bLeftOrInside};`;

                pageStyleContent = `
                @page { 
                    size: ${pageWidth} ${pageHeight}; 
                    margin: 0 !important;
                    ${marksRule}
                    ${baseBleed} /* <-- Das fehlte und hat die 6mm verursacht */
                }

                @page:left {
                    /* Margin und Bleed (Inside/Outside) korrekt ausgerichtet */
                    margin: ${mTop} ${mRightOrOutside} ${mBottom} ${mLeftOrInside};
                    bleed: ${bTop} ${bLeftOrInside} ${bBottom} ${bRightOrOutside};

                    @top-left { ${getMarginBoxStyles(marginInputsLeft.topLeft, 'top')} }
                    @top-center { ${getMarginBoxStyles(marginInputsLeft.topCenter, 'top')} }
                    @top-right { ${getMarginBoxStyles(marginInputsLeft.topRight, 'top')} }
                    @bottom-left { ${getMarginBoxStyles(marginInputsLeft.bottomLeft, 'bottom')} }
                    @bottom-center { ${getMarginBoxStyles(marginInputsLeft.bottomCenter, 'bottom')} }
                    @bottom-right { ${getMarginBoxStyles(marginInputsLeft.bottomRight, 'bottom')} }
                }

                @page:right {
                    /* Margin und Bleed (Inside/Outside) korrekt ausgerichtet */
                    margin: ${mTop} ${mLeftOrInside} ${mBottom} ${mRightOrOutside};
                    bleed: ${bTop} ${bRightOrOutside} ${bBottom} ${bLeftOrInside};

                    @top-left { ${getMarginBoxStyles(marginInputsRight.topLeft, 'top')} }
                    @top-center { ${getMarginBoxStyles(marginInputsRight.topCenter, 'top')} }
                    @top-right { ${getMarginBoxStyles(marginInputsRight.topRight, 'top')} }
                    @bottom-left { ${getMarginBoxStyles(marginInputsRight.bottomLeft, 'bottom')} }
                    @bottom-center { ${getMarginBoxStyles(marginInputsRight.bottomCenter, 'bottom')} }
                    @bottom-right { ${getMarginBoxStyles(marginInputsRight.bottomRight, 'bottom')} }
                }
                `;
            
            } else {
                                

                pageStyleContent = `
                @page { 
                    size: ${pageWidth} ${pageHeight}; 
                    margin: ${mTop} ${mRightOrOutside} ${mBottom} ${mLeftOrInside};
                    ${marksRule}
                    ${bleedRule}

                    @top-left { ${getMarginBoxStyles(marginInputsLeft.topLeft, 'top')} }
                    @top-center { ${getMarginBoxStyles(marginInputsLeft.topCenter, 'top')} }
                    @top-right { ${getMarginBoxStyles(marginInputsLeft.topRight, 'top')} }
                    @bottom-left { ${getMarginBoxStyles(marginInputsLeft.bottomLeft, 'bottom')} }
                    @bottom-center { ${getMarginBoxStyles(marginInputsLeft.bottomCenter, 'bottom')} }
                    @bottom-right { ${getMarginBoxStyles(marginInputsLeft.bottomRight, 'bottom')} }
                }
                `;
            }

            pageStyleContent += `
            .book-section {
                display: block !important;
            }
            
            /* Der physische Breaker bleibt auf der ALTEN Seite 
               und erzwingt DANACH den Umbruch. Dadurch startet 
               die neue Seite sauber ohne Abstand! */
            .manual-page-break {
                display: block !important;
                break-after: page !important;
                page-break-after: always !important;
                
                height: 1px !important;
                line-height: 1px !important;
                font-size: 1px !important;
                color: transparent !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            `;
            
            const pageStyleBlob = new Blob([pageStyleContent], { type: 'text/css' });
            pageStyleUrl = URL.createObjectURL(pageStyleBlob);

            if (typeof marked !== 'undefined') {
                marked.use({
                    breaks: true,
                    gfm: true
                });
            }

            const currentLang = (languageInput && languageInput.value.trim()) ? languageInput.value.trim() : 'en';
            const userText = editor.value;
            const ghost = document.createElement('div');
            ghost.setAttribute('lang', currentLang);

            const elemSplitting = getElementSplittingMode();
            const lineSplitting = getLineSplittingMode();

            // ==========================================
            // DEIN QUICK & DIRTY HACK: 
            // Macht aus 3 oder mehr Strichen immer exakt 6 Striche (------).
            // Dadurch entsteht beim Split automatisch die leere "Geister-Sektion", 
            // die Paged.js zwingt, den Seitenumbruch zu akzeptieren!
            // ==========================================
            const hackedText = userText.replace(/-{3,}/g, '------');
            const sections = hackedText.split(/\r?\n?---\r?\n?/);

for (let i = 0; i < sections.length; i++) {
    const sectionText = sections[i];

    // 2. Das physische Trennelement einfügen
    if (i > 0) {
        const pageBreaker = document.createElement('div');
        pageBreaker.className = 'manual-page-break';
        pageBreaker.innerHTML = '&nbsp;'; // Paged.js braucht echten Inhalt!
        ghost.appendChild(pageBreaker);
    }

    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'book-section';

    // 3. Text VOR dem Markdown-Parsing präparieren
    const lines = sectionText.split(/\r?\n/);
    const processedLines = lines.map(line => {
        let l = line.replace(/ {2,}/g, match => ' ' + '&nbsp;'.repeat(match.length - 1));
        
        if (l.trim() === '') {
            return '<div class="empty-line">&nbsp;</div>';
        }
        return l;
    });

                // 2. Mit \n\n verbinden erzwingt "1 Enter = 1 echtes <p>" bei marked.js.
                // Deine leeren Zeilen fließen als reines HTML einfach sicher mit hindurch.
                sectionDiv.innerHTML = marked.parse(processedLines.join('\n\n'));

                const isHyphenationOn = (getHyphenationValue() === 'on');
                
                // --- AB HIER MUSS DEIN BEREITS BESTEHENDER CODE BLEIBEN ---
                if (elemSplitting === 'characters') {
                    if (isHyphenationOn) {
                        await applyExperimentalSplitting(sectionDiv, currentLang);
                    } else {
                        applyCustomCharSplitting(sectionDiv);
                    }
                } else if (elemSplitting === 'words' || elemSplitting === 'off') {
                    if (isHyphenationOn) {
                        const hyphenate = await getHyphenator(currentLang);
                        const paragraphs = sectionDiv.querySelectorAll('p, h1, h2, h3');
                        paragraphs.forEach(p => { p.textContent = hyphenate(p.textContent); });
                    }
                    if (elemSplitting === 'words') {
                        Splitting({ target: sectionDiv, by: 'words' });
                    }
                }

                // WICHTIG: Das fertige Div an den Container für Paged.js anhängen
                ghost.appendChild(sectionDiv);
            }
  
            // ==========================================
            // FIX: VARIABLEN VOR DEM PAGED.JS RENDER INJIZIEREN
            // ==========================================
            const indexationScope = document.querySelector('input[name="indexation-scope"]:checked')?.value || 'continuous';

            if (indexationScope === 'continuous') {
                // NEU: :not(.space) hinzugefügt, damit Leerzeichen beim Zählen ignoriert werden
                const allCharsGhost = ghost.querySelectorAll('.char:not(.shy):not(.space)');
                const charTotal = allCharsGhost.length;
                allCharsGhost.forEach((char, index) => {
                    char.style.setProperty('--char-index', index);
                    char.style.setProperty('--char-total', charTotal);
                });

                const allWordsGhost = ghost.querySelectorAll('.word');
                const wordTotal = allWordsGhost.length;
                allWordsGhost.forEach((word, index) => {
                    word.style.setProperty('--word-index', index);
                    word.style.setProperty('--word-total', wordTotal);
                });
            } else {
                // Index resets for every individual paragraph
                const paragraphs = ghost.querySelectorAll('p:not(.empty-line), h1, h2, h3');
                paragraphs.forEach(p => {
                    // NEU: Auch hier :not(.space) hinzugefügt
                    const pChars = p.querySelectorAll('.char:not(.shy):not(.space)');
                    pChars.forEach((char, index) => {
                        char.style.setProperty('--char-index', index);
                        char.style.setProperty('--char-total', pChars.length);
                    });

                    const pWords = p.querySelectorAll('.word');
                    pWords.forEach((word, index) => {
                        word.style.setProperty('--word-index', index);
                        word.style.setProperty('--word-total', pWords.length);
                    });
                });
            }

            // NEU: Kombinierte Logik, die sich sowohl um .shy als auch um .space kümmert
            const inheritingChars = ghost.querySelectorAll('.char.shy, .char.space');
            inheritingChars.forEach(inheritingChar => {
                // Rückwärts durchsuchen, um den echten Buchstaben zu finden
                let node = inheritingChar.previousSibling;
                let prevChar = null;
                while(node) {
                    if (node.nodeType === 1) { // Ist ein HTML-Element
                        // Darf weder .shy noch .space sein
                        if (node.classList.contains('char') && !node.classList.contains('shy') && !node.classList.contains('space')) {
                            prevChar = node; 
                            break;
                        }
                        const chars = node.querySelectorAll('.char:not(.shy):not(.space)');
                        if (chars && chars.length > 0) {
                            prevChar = chars[chars.length - 1]; 
                            break;
                        }
                    }
                    node = node.previousSibling;
                }
                
                // Wenn gefunden: Kopiere die mathematischen CSS-Variablen!
                if (prevChar) {
                    inheritingChar.style.setProperty('--char-index', prevChar.style.getPropertyValue('--char-index'));
                    inheritingChar.style.setProperty('--char-total', prevChar.style.getPropertyValue('--char-total'));
                }
            });

            canvas.innerHTML = '';
            canvas.setAttribute('lang', currentLang);

            const previewer = new Paged.Previewer();
            
            // Paged.js wertet jetzt beim Rendern die Inline-Styles aus und
            // berechnet sofort die korrekte Größe für die Seitenaufteilung!
            await previewer.preview(ghost.innerHTML, ['assets/css/page.css', pageStyleUrl], canvas);

            const canvasShys = canvas.querySelectorAll('.char.shy');
            canvasShys.forEach(shy => {
                const word = shy.closest('.word');
                // Nur wenn das Wort exakt HIER auf eine neue Seite geschnitten wurde:
                if (word && word.hasAttribute('data-split-to') && word.lastElementChild === shy) {
                    shy.textContent = '-';
                }
            });

        if (lineSplitting === 'on') {
            applyLineSplitting(canvas);
        }

        if (indexationScope === 'continuous') {
            const allLines = canvas.querySelectorAll('.line');
            allLines.forEach((line, index) => {
                line.style.setProperty('--line-index', index);
                line.style.setProperty('--line-total', allLines.length);
            });
        } else {
            // Line index resets for every individual paragraph
            const paragraphs = canvas.querySelectorAll('p:not(.empty-line), h1, h2, h3');
            paragraphs.forEach(p => {
                const pLines = p.querySelectorAll('.line');
                pLines.forEach((line, index) => {
                    line.style.setProperty('--line-index', index);
                    line.style.setProperty('--line-total', pLines.length);
                });
            });
        }

        } catch (err) {
            console.warn('Paged.js Render-Zyklus abgefangen:', err);
        } finally {
            if (pageStyleUrl) {
                URL.revokeObjectURL(pageStyleUrl);
            }

            applyZoom(zoomInput.value);

            isRendering = false;
            
            if (pendingRenderDelay !== null) {
                const nextDelay = pendingRenderDelay;
                pendingRenderDelay = null;
                triggerBookRender(nextDelay);
            }
        }

    }, delay);
}

// ==========================================
// 8. EVENT LISTENERS
// ==========================================

const settingInputs = [
    fontSizeInput, lineHeightInput, letterSpacingInput,
    indentLeftInput, indentRightInput, indentFirstLineInput, paddingTopInput, paddingBottomInput, // <-- Added here
    translateXInput, translateYInput, rotateInput, skewXInput, skewYInput,
    pageHeightInput, pageWidthInput,
    pageMarginTopInput, pageMarginBottomInput, pageMarginLeftInput, pageMarginRightInput,
    bleedTopInput, bleedBottomInput, bleedLeftInput, bleedRightInput
];

const handleInputChange = () => {
    const mode = getRenderingMode();
    if (mode === 'live') {
        triggerBookRender(200);
    } else if (mode === 'debounced') {
        triggerBookRender(3000);
    }
};

const handleInputCommit = () => {
    saveCurrentSubTabState();
    const mode = getRenderingMode();
    if (mode === 'manual') {
        triggerBookRender(0);
    }
};


const allTextInputs = [
    editor,
    ...Object.values(marginInputsLeft),
    ...Object.values(marginInputsRight),
    ...settingInputs,
    languageInput
].filter(Boolean);

allTextInputs.forEach(input => {
    input.addEventListener('input', handleInputChange);

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && input.tagName !== 'TEXTAREA') {
            event.preventDefault();
            input.blur();
        }
    });

    input.addEventListener('blur', handleInputCommit);
});

renderingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

facingPagesRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

elementSplittingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

lineSplittingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

alignmentRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

fontSelect.addEventListener('change', () => {
    if (fontSelect.value === '__upload__') {
        fontUploadInput.click();
    } else {
        previousFontKey = fontSelect.value;
        updateAxisInputs();
        updateFontStyleDropdown(fontSelect.value);
        saveCurrentSubTabState();
        triggerBookRender(0);
    }
});

fontUploadInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
        // Falls der Nutzer auf "Abbrechen" klickt, zur alten Schrift zurückspringen
        fontSelect.value = previousFontKey;
        return;
    }

    try {
        // 1. Temporäre, lokale URL für die Datei erstellen
        const fontUrl = URL.createObjectURL(file);
        const fontName = file.name.replace(/\.[^/.]+$/, ""); // Dateiname ohne Endung (.ttf etc.)
        const fontKey = "upload_" + Date.now(); // Eindeutige ID generieren

        // 2. Schrift in den Browser laden (damit Paged.js sie nutzen kann)
        const customFont = new FontFace(fontName, `url(${fontUrl})`);
        await customFont.load();
        document.fonts.add(customFont);

        // 3. Nach Variable-Font-Achsen scannen (nutzt deine bestehende Funktion!)
        const detectedAxes = await scanSingleFontFile(fontUrl, fontName);

        // 4. In deine globale Config eintragen
        fontConfig[fontKey] = {
            name: fontName + " (Upload)",
            cssValue: `"${fontName}", sans-serif`,
            styles: ALL_4_STYLES, // Erlaubt "Faux Bold/Italic" durch den Browser, falls die Font es nicht nativ hat
            url: fontUrl,
            axes: detectedAxes
        };

        // 5. Dropdown aktualisieren und die neue Schrift direkt auswählen
        initFontDropdown();
        fontSelect.value = fontKey;
        
        // 6. UI updaten und Buch neu rendern
        previousFontKey = fontKey;
        updateAxisInputs();
        updateFontStyleDropdown(fontKey);
        saveCurrentSubTabState();
        triggerBookRender(0);

    } catch (error) {
        console.error("Fehler beim Laden der Schrift:", error);
        alert("Die Schriftart konnte leider nicht geladen werden. Ist es eine gültige Font-Datei?");
        fontSelect.value = previousFontKey; // Zurücksetzen
    } finally {
        // Input-Wert zurücksetzen, damit man bei Bedarf nochmal dieselbe Datei hochladen kann
        event.target.value = '';
    }
});

fontStyleSelect.addEventListener('change', () => {
    saveCurrentSubTabState();
    triggerBookRender(0);
});

hyphenationRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

advancedRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        loadSubTabState(currentSubTab);
        triggerBookRender(0);
    });
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

// ALT:
// exportPdfButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         window.print();
//     });
// });

// NEU: Eleganter Export-Hack
exportPdfButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isFacing = canvas.classList.contains('facing-pages-mode');
        
        // 1. Bildschirm-Layout für den Export kurz deaktivieren
        if (isFacing) {
            canvas.classList.remove('facing-pages-mode');
        }
        
        // 2. Kurz warten, damit der Browser die Einzelseiten rendern kann
        setTimeout(() => {
            window.print(); // Öffnet den PDF-Export
            
            // 3. Sobald der Dialog geschlossen wird, die Doppelseiten wieder einschalten
            if (isFacing) {
                canvas.classList.add('facing-pages-mode');
            }
        }, 150);
    });
});

// ZUSATZ: Falls der Nutzer Strg+P / Cmd+P auf der Tastatur drückt!
window.addEventListener('beforeprint', () => {
    canvas.classList.remove('facing-pages-mode');
});
window.addEventListener('afterprint', () => {
    if (getFacingPagesMode() === 'on') {
        canvas.classList.add('facing-pages-mode');
    }
});


function resetEditorTabs() {
    textEditorTextarea.classList.add('hidden');
    marginEditorLeftTextarea.classList.add('hidden');
    marginEditorRightTextarea.classList.add('hidden');
    btnText.classList.remove('active');
    btnMarginsLeft.classList.remove('active');
    btnMarginsRight.classList.remove('active');
}

if (btnText) {
    btnText.addEventListener('click', () => {
        resetEditorTabs();
        textEditorTextarea.classList.remove('hidden');
        btnText.classList.add('active');
    });
}

if (btnMarginsLeft) {
    btnMarginsLeft.addEventListener('click', () => {
        resetEditorTabs();
        marginEditorLeftTextarea.classList.remove('hidden');
        btnMarginsLeft.classList.add('active');
    });
}

if (btnMarginsRight) {
    btnMarginsRight.addEventListener('click', () => {
        resetEditorTabs();
        marginEditorRightTextarea.classList.remove('hidden');
        btnMarginsRight.classList.add('active');
    });
}

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

        triggerBookRender(0);
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

        translateXInput.value = preset.translatex;
        translateYInput.value = preset.translatey;
        skewXInput.value = preset.skewx;
        skewYInput.value = preset.skewy;
        rotateInput.value = preset.rotate;
        
        
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
        
        triggerBookRender(0);
        currentPresetIndex = (currentPresetIndex + 1) % demoPresets.length;
    });
}

cropMarksRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

facingPagesRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        const isFacing = (getFacingPagesMode() === 'on');
        
        // Update Labels and Buttons
        updateFacingPagesLabels();
        
        if (isFacing) {
            labelMarginsLeft.textContent = 'Margins left';
            btnMarginsRight.classList.remove('hidden');
        } else {
            labelMarginsLeft.textContent = 'Margins';
            btnMarginsRight.classList.add('hidden');
            
            // If they were on the Right margin tab, force them back to Left/Default
            if (btnMarginsRight.classList.contains('active')) {
                btnMarginsLeft.click(); 
            }
        }
        
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

indexationRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

// ==========================================
// 9. START-ABLAUF
// ==========================================
async function startApp() {
    const defaultText = `Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.`;

    if (editor && !editor.value) {
        editor.value = defaultText;
    }
    canvas.innerHTML = '';

    try {
        await autoDetectLocalAxes();
    } catch (e) {
        console.warn('Achsenscann abgefangen:', e);
    }

    initFontDropdown();
    initFontStyleDropdown();
    initSubTabNavigation();
    loadSubTabState('body');
    initFormulaDropdowns();
    initPagePresetsDropdown();
    initTabNavigation();

    triggerBookRender(0);
}

startApp();