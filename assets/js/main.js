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
const btnMargins = document.getElementById('btn-margins');
const textEditorTextarea = document.getElementById('text-editor-textarea');
const marginEditorTextarea = document.getElementById('margin-editor-textarea');
const fontUploadInput = document.getElementById('font-upload-input');
const hyphenationRadios = document.querySelectorAll('input[name="hyphenation"]');
const hyphenationOnRadio = document.getElementById('hyphenation-on');
const hyphenationOffRadio = document.getElementById('hyphenation-off');
const languageInput = document.getElementById('language-input');
const fontStyleSelect = document.getElementById('font-style-select');
const renderingRadios = document.querySelectorAll('input[name="rendering"]');
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

let previousFontKey = 'arial';

const marginInputs = {
    topLeft: document.getElementById('margin-editor-top-left'),
    topCenter: document.getElementById('margin-editor-top-center'),
    topRight: document.getElementById('margin-editor-top-right'),
    bottomLeft: document.getElementById('margin-editor-bottom-left'),
    bottomCenter: document.getElementById('margin-editor-bottom-center'),
    bottomRight: document.getElementById('margin-editor-bottom-right')
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
function applyCustomCharSplitting(container) {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
        if (node.nodeValue.length > 0) {
            textNodes.push(node);
        }
    }

    textNodes.forEach(textNode => {
        const text = textNode.nodeValue;
        const parent = textNode.parentNode;
        const frag = document.createDocumentFragment();

        let currentWord = null;
        let currentSyllable = null;
        let spaceCountInSequence = 0; // Zähler für aufeinanderfolgende Leerzeichen

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const code = char.charCodeAt(0);

            // Leerzeichen (gewöhnlich oder geschützt)
            if (char === ' ' || char === '\u00A0') {
                currentWord = null;
                currentSyllable = null;
                spaceCountInSequence++;

                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'char space';
                spaceSpan.setAttribute('data-char', ' ');

                // Erstes Leerzeichen = ' ' (wird im Blocksatz gedehnt)
                // Weitere Leerzeichen = '\u00A0' (verhindert das Kollabieren)
                if (spaceCountInSequence === 1) {
                    spaceSpan.textContent = ' ';
                } else {
                    spaceSpan.textContent = '\u00A0';
                }

                frag.appendChild(spaceSpan);
            } 
            // Bedconditioneller Trennstrich (Soft Hyphen / \u00AD)
            else if (char === '\u00AD' || code === 173) {
                spaceCountInSequence = 0;
                currentSyllable = null;

                const shySpan = document.createElement('span');
                shySpan.className = 'char shy';
                shySpan.innerHTML = '&shy;';

                if (!currentWord) {
                    currentWord = document.createElement('span');
                    currentWord.className = 'word';
                    frag.appendChild(currentWord);
                }
                currentWord.appendChild(shySpan);
            } 
            // Normales Zeichen
            else {
                spaceCountInSequence = 0;

                if (!currentWord) {
                    currentWord = document.createElement('span');
                    currentWord.className = 'word';
                    frag.appendChild(currentWord);
                }
                if (!currentSyllable) {
                    currentSyllable = document.createElement('span');
                    currentSyllable.className = 'syllable';
                    currentWord.appendChild(currentSyllable);
                }

                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.setAttribute('data-char', char);
                charSpan.textContent = char;
                currentSyllable.appendChild(charSpan);
            }
        }

        parent.replaceChild(frag, textNode);
    });
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

    current.marginLeft = marginLeftInput.value;
    current.marginRight = marginRightInput.value;

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

    const isAdvancedOn = !!data.isAdvanced;
    const targetRadio = document.getElementById(isAdvancedOn ? 'advanced-on' : 'advanced-off');
    if (targetRadio) targetRadio.checked = true;

    if (paragraphSettings) paragraphSettings.classList.toggle('hidden', isInlineElement);
    if (advancedToggleSection) advancedToggleSection.classList.toggle('hidden', !isInlineElement);

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
    marginLeftInput.value = data.marginLeft;
    marginRightInput.value = data.marginRight;
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
    "tilt": {
        name: "Tilt",
        cssValue: "'Tilt Neon', sans-serif",
        styles: [
            { label: 'Neon', weight: '400', style: 'normal', cssValue: "'Tilt Neon', sans-serif", url: "assets/fonts/TiltNeon[HROT,VROT].ttf" },
            { label: 'Prism', weight: '400', style: 'normal', cssValue: "'Tilt Prism', sans-serif", url: "assets/fonts/TiltPrism[HROT,VROT].ttf" },
            { label: 'Warp', weight: '400', style: 'normal', cssValue: "'Tilt Warp', sans-serif", url: "assets/fonts/TiltWarp[HROT,VROT].ttf" }
        ]
    },
    "tiny": { name: "Tiny", cssValue: 'tiny, sans-serif', styles: REGULAR_ONLY }
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
        display: inline !important;
        white-space: normal !important;
    }

    .pagedjs_area .syllable {
        display: inline-block !important;
        white-space: nowrap !important;
        vertical-align: baseline !important;
    }

    .pagedjs_area .char {
        display: inline-block !important;
        white-space: pre !important;
        vertical-align: baseline !important;
    }

    .pagedjs_area .char.shy {
        display: inline !important;
        white-space: normal !important;
    }

    /* Leerzeichen sind inline und normal formatiert für dynamischen Blocksatz */
    .pagedjs_area .char.space {
        display: inline !important;
        white-space: normal !important;
    }

    .pagedjs_area .line {
        display: block !important;
        position: relative !important;
        white-space: normal !important;
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

        const effectiveTx = (style.translateX === 'inherit') ? elementStyles.body.translateX : style.translateX;
        const effectiveTy = (style.translateY === 'inherit') ? elementStyles.body.translateY : style.translateY;
        const effectiveRot = (style.rotate === 'inherit') ? elementStyles.body.rotate : style.rotate;
        const effectiveSx = (style.skewX === 'inherit') ? elementStyles.body.skewX : style.skewX;
        const effectiveSy = (style.skewY === 'inherit') ? elementStyles.body.skewY : style.skewY;

        const tx = (effectiveTx || '0px').trim();
        const ty = (effectiveTy || '0px').trim();
        const rot = (effectiveRot || '0deg').trim();
        const sx = (effectiveSx || '0deg').trim();
        const sy = (effectiveSy || '0deg').trim();

        const combinedTransform = `rotate(calc(${rot})) skewX(calc(${sx})) skewY(calc(${sy}))`;

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
                text-align: ${style.alignment || 'left'} !important;
                padding-left: calc(${style.marginLeft || '0px'}) !important;
                padding-right: calc(${style.marginRight || '0px'}) !important;
                box-sizing: border-box !important;
                font-family: ${finalFontFamily} !important;
                font-weight: ${style.fontWeight || '400'} !important;
                font-style: ${style.fontStyle || 'normal'} !important;
                font-size: calc(${effectiveFontSize || '12pt'}) !important;
                line-height: calc(${effectiveLineHeight || '1.4'}) !important;
                letter-spacing: calc(${effectiveLetterSpacing || '0px'}) !important;
                position: relative !important;
                left: calc(${tx}) !important;
                top: calc(${ty}) !important;
                transform: ${combinedTransform} !important;
                ${fontVariationRules}
            }
            `;
        } else {
            generatedCss += `
            .pagedjs_area ${selector} {
                text-align: ${style.alignment || 'left'} !important;
                padding-left: calc(${style.marginLeft || '0px'}) !important;
                padding-right: calc(${style.marginRight || '0px'}) !important;
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
                position: relative !important;
                left: calc(${tx}) !important;
                top: calc(${ty}) !important;
                transform: ${combinedTransform} !important;
                font-family: ${finalFontFamily} !important;
                font-weight: ${style.fontWeight || '400'} !important;
                font-style: ${style.fontStyle || 'normal'} !important;
                font-size: calc(${effectiveFontSize || '12pt'}) !important;
                letter-spacing: calc(${effectiveLetterSpacing || '0px'}) !important;
                ${fontVariationRules}
            }
            `;
        }
    });

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

    typingTimeout = setTimeout(async () => {
        if (isRendering) {
            triggerBookRender(customDelay);
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

            const marginStyle = elementStyles.margins || {};
            const effectiveMarginFontKey = (marginStyle.font === 'inherit') ? elementStyles.body.font : marginStyle.font;
            const fontObj = fontConfig[effectiveMarginFontKey] || fontConfig['arial'];
            const availableStyles = fontObj.styles || ALL_4_STYLES;
            const styleIdx = marginStyle.styleIndex || 0;
            const currentStyleObj = availableStyles[styleIdx] || availableStyles[0];

            const marginFontFamily = currentStyleObj?.cssValue || fontObj.cssValue || 'sans-serif';
            const marginFontSize = marginStyle.fontSize || '9pt';
            const marginLineHeight = marginStyle.lineHeight || '1.2';
            const marginFontWeight = marginStyle.fontWeight || '400';
            const marginFontStyle = marginStyle.fontStyle || 'normal';

            const getMarginBoxStyles = (inputEl) => {
                const val = inputEl ? inputEl.value.trim() : '';
                if (!val) return 'content: none;';
                return `
                    content: "${val}";
                    font-family: ${marginFontFamily} !important;
                    font-size: calc(${marginFontSize}) !important;
                    line-height: calc(${marginLineHeight}) !important;
                    font-weight: ${marginFontWeight} !important;
                    font-style: ${marginFontStyle} !important;
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

            let pageStyleContent = '';

            if (isFacingPages) {
                pageStyleContent = `
                @page { 
                    size: ${pageWidth} ${pageHeight}; 
                    margin-top: ${mTop};
                    margin-bottom: ${mBottom};
                    ${marksRule}

                    @top-left { ${getMarginBoxStyles(marginInputs.topLeft)} }
                    @top-center { ${getMarginBoxStyles(marginInputs.topCenter)} }
                    @top-right { ${getMarginBoxStyles(marginInputs.topRight)} }
                    @bottom-left { ${getMarginBoxStyles(marginInputs.bottomLeft)} }
                    @bottom-center { ${getMarginBoxStyles(marginInputs.bottomCenter)} }
                    @bottom-right { ${getMarginBoxStyles(marginInputs.bottomRight)} }
                }

                @page :left {
                    margin-left: ${mRightOrOutside};
                    margin-right: ${mLeftOrInside};
                    bleed: ${bTop} ${bLeftOrInside} ${bBottom} ${bRightOrOutside};
                }

                @page :right {
                    margin-left: ${mLeftOrInside};
                    margin-right: ${mRightOrOutside};
                    bleed: ${bTop} ${bRightOrOutside} ${bBottom} ${bLeftOrInside};
                }

                #book-canvas.facing-pages-mode .pagedjs_pages {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    justify-content: center !important;
                    row-gap: 20px !important;
                }

                #book-canvas.facing-pages-mode .pagedjs_page {
                    margin: 0 !important;
                }

                #book-canvas.facing-pages-mode .pagedjs_page.pagedjs_first_page {
                    margin-left: ${pageWidth} !important;
                }

                #book-canvas.facing-pages-mode .pagedjs_left_page {
                    box-shadow: inset -3px 0 5px -2px rgba(0,0,0,0.15) !important;
                }
                #book-canvas.facing-pages-mode .pagedjs_right_page {
                    box-shadow: inset 3px 0 5px -2px rgba(0,0,0,0.15) !important;
                }
                `;
            } else {
                const bleedRule = `bleed: ${bTop} ${bRightOrOutside} ${bBottom} ${bLeftOrInside};`;

                pageStyleContent = `
                @page { 
                    size: ${pageWidth} ${pageHeight}; 
                    margin: ${mTop} ${mRightOrOutside} ${mBottom} ${mLeftOrInside};
                    ${marksRule}
                    ${bleedRule}

                    @top-left { ${getMarginBoxStyles(marginInputs.topLeft)} }
                    @top-center { ${getMarginBoxStyles(marginInputs.topCenter)} }
                    @top-right { ${getMarginBoxStyles(marginInputs.topRight)} }
                    @bottom-left { ${getMarginBoxStyles(marginInputs.bottomLeft)} }
                    @bottom-center { ${getMarginBoxStyles(marginInputs.bottomCenter)} }
                    @bottom-right { ${getMarginBoxStyles(marginInputs.bottomRight)} }
                }
                `;
            }

            pageStyleContent += `
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
            const sections = userText.split('---');

            for (const sectionText of sections) {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'book-section';

                // 1. Zeilenweise spalten für korrekten Erhalt aller leeren Zeilen
                const lines = sectionText.split(/\r?\n/);
                sectionDiv.innerHTML = lines.map(p => {
                    // 2. Doppelte/Mehrfache Leerzeichen erhalten durch \u00A0
                    const preservedSpaces = p.replace(/ {2,}/g, match => ' ' + '\u00A0'.repeat(match.length - 1));

                    // 3. Leere Zeilen mit expliziter Höhe um Margin-Collapsing zu verhindern
                    if (preservedSpaces.trim() === '') {
                        return '<p style="margin: 0; min-height: 1.2em;">&nbsp;</p>';
                    }
                    return `<p>${preservedSpaces}</p>`;
                }).join('');

                const isHyphenationOn = (getHyphenationValue() === 'on');
                
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

                ghost.appendChild(sectionDiv);
            }
            
            canvas.innerHTML = '';
            canvas.setAttribute('lang', currentLang);

            const previewer = new Paged.Previewer();
            await previewer.preview(ghost.innerHTML, ['assets/css/page.css', pageStyleUrl], canvas);

            if (lineSplitting === 'on') {
                applyLineSplitting(canvas);
            }

            const allChars = canvas.querySelectorAll('.char');
            allChars.forEach((char, index) => {
                char.style.setProperty('--char-index', index);
                char.style.setProperty('--char-total', allChars.length);
            });

            const allWords = canvas.querySelectorAll('.word');
            allWords.forEach((word, index) => {
                word.style.setProperty('--word-index', index);
                word.style.setProperty('--word-total', allWords.length);
            });

            const allLines = canvas.querySelectorAll('.line');
            allLines.forEach((line, index) => {
                line.style.setProperty('--line-index', index);
                line.style.setProperty('--line-total', allLines.length);
            });

        } catch (err) {
            console.warn('Paged.js Render-Zyklus abgefangen:', err);
        } finally {
            if (pageStyleUrl) {
                URL.revokeObjectURL(pageStyleUrl);
            }
            isRendering = false;
        }

    }, delay);
}

// ==========================================
// 8. EVENT LISTENERS
// ==========================================

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

const settingInputs = [
    fontSizeInput, lineHeightInput, letterSpacingInput,
    marginLeftInput, marginRightInput, translateXInput, translateYInput, rotateInput, skewXInput, skewYInput,
    pageHeightInput, pageWidthInput,
    pageMarginTopInput, pageMarginBottomInput, pageMarginLeftInput, pageMarginRightInput,
    bleedTopInput, bleedBottomInput, bleedLeftInput, bleedRightInput
];

const allTextInputs = [
    editor,
    ...Object.values(marginInputs),
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

exportPdfButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.print();
    });
});

if (btnText) {
    btnText.addEventListener('click', () => {
        textEditorTextarea.classList.remove('hidden');
        marginEditorTextarea.classList.add('hidden');
        btnText.classList.add('active');
        btnMargins.classList.remove('active');
    });
}

if (btnMargins) {
    btnMargins.addEventListener('click', () => {
        marginEditorTextarea.classList.remove('hidden');
        textEditorTextarea.classList.add('hidden');
        btnMargins.classList.add('active');
        btnText.classList.remove('active');
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
        updateFacingPagesLabels();
        saveCurrentSubTabState();
        triggerBookRender(0);
    });
});

// ==========================================
// 9. START-ABLAUF
// ==========================================
async function startApp() {
    const defaultText = `Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.

Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.

Typometric breaks typography free from its static chains by incorporating mathematics directly into the design process. Unlike traditional layout software, where values are fixed, every parameter can be controlled using mathematical formulas. Designers are no longer bound to rigid weights or font sizes. Rather, they can use presets or custom equations to style each word, letter, or line individually. This opens up completely new possibilities for creative typographic expression.`;

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