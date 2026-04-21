/*
   ____             __ _                       _                __                  _   _                 
  / ___|___  _ __  / _(_) __ _ _   _ _ __ __ _| |_ ___  _ __   / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
 | |   / _ \| '_ \| |_| |/ _` | | | | '__/ _` | __/ _ \| '__| | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
 | |__| (_) | | | |  _| | (_| | |_| | | | (_| | || (_) | |    |  _| |_| | | | | (__| |_| | (_) | | | \__ \
  \____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__\___/|_|    |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                         |___/                                                                            
*/

(() => {
    const MWST_FACTOR = 1.081;
    const CHF_TO_EUR  = 1.08;

    // --- Gecachte Selektoren (einmalig beim Init) ---
    let $mwstOption, $chfLabel, $eurLabel, $totalHeading, $konfTotal;

    // --- State (einmal pro Render-Zyklus lesen) ---
    function getState() {
        const isChf = $('input[name="waehrung"]').is(':checked');
        return {
            isChf,
            includeMwst: isChf && $('input[name="mwst"]').is(':checked'),
            currency:    isChf ? 'CHF' : 'EUR',
            locale:      isChf ? 'de-CH' : 'de-DE'
        };
    }

    // --- Formatierung ---
    function formatMoney(value, state) {
        return new Intl.NumberFormat(state.locale, {
            style: 'currency',
            currency: state.currency
        }).format(Number(value) || 0);
    }

    // --- Preisumrechnung (Basis: CHF inkl. MWST) ---
    function convertBasePrice(basePrice, state) {
        let value = Number(basePrice) || 0;
        if (state.isChf) {
            if (!state.includeMwst) value /= MWST_FACTOR;
        } else {
            value = (value / MWST_FACTOR) * CHF_TO_EUR;
        }
        return value;
    }

    // --- UI-Sync ---
    function syncCurrencyUi(state) {
        const { isChf, includeMwst } = state;

        if (isChf) {
            $mwstOption.css({ opacity: '1', 'pointer-events': '' });
            $chfLabel.css('opacity', '');
            $eurLabel.css('opacity', '0.4');
        } else {
            $mwstOption.css({ opacity: '0', 'pointer-events': 'none' });
            $chfLabel.css('opacity', '0.4');
            $eurLabel.css('opacity', '');
        }

        $totalHeading.text(
            isChf && includeMwst ? 'Total inkl. MWST' : 'Total exkl. MWST'
        );
    }

    // --- Summe für eine Input-Gruppe ermitteln ---
    function getSelectedBaseTotalByName(inputName) {
        const $checked = $(`input[data-price][name="${inputName}"]:checked:visible`);
        if (!$checked.length) return { hasSelection: false, total: 0 };

        let total = 0;
        $checked.each(function () {
            total += Number($(this).attr('data-price')) || 0;
        });
        return { hasSelection: true, total };
    }

    // --- Einzelne Summary-Zeile aktualisieren ---
    function updateSummaryForName(inputName, state) {
        if (!inputName) return;
        const $priceTarget = $(`.summary_acc-value[sf-react="text($f.${inputName})"]`).siblings('.is-price');
        if (!$priceTarget.length) return;

        const { hasSelection, total } = getSelectedBaseTotalByName(inputName);
        $priceTarget.text(hasSelection ? formatMoney(convertBasePrice(total, state), state) : '');
    }

    // --- Alle Summary-Preise neu rendern ---
    function refreshAllSummaryPrices(state) {
        const names = [...new Set(
            $('input[data-price][name]').map(function () {
                return $(this).attr('name');
            }).get().filter(Boolean)
        )];
        names.forEach(name => updateSummaryForName(name, state));
    }

    // --- Haupt-Render (ein einziger getState()-Aufruf pro Zyklus) ---
    function renderAll() {
        const state = getState();
        syncCurrencyUi(state);
        refreshAllSummaryPrices(state);

        let baseSum = 0;
        $('input[data-price]:checked:visible').each(function () {
            baseSum += Number($(this).attr('data-price')) || 0;
        });
        $konfTotal.text(formatMoney(convertBasePrice(baseSum, state), state));
    }

    // --- Inputs leeren ---
    function clearInputs(inputs) {
        inputs.each(function () {
            if (!$(this).is($('._1-col-input-wrapper.hide #verteilungsart'))) {
                $(this).prop('checked', false)
                    .parents('.is-active-inputactive').removeClass('is-active-inputactive');
                $(this).prev('.w--redirected-checked').removeClass('w--redirected-checked');
            }
        });
        // Einmal nach dem Leeren neu rendern
        renderAll();
    }

    // --- Debounce ---
    function debounce(fn, ms) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), ms);
        };
    }

    // =============================================
    // Globale API (Kompatibilität mit bestehendem Code)
    // =============================================
    window.calculatePrice  = renderAll;
    window.writeSummary    = (input) => updateSummaryForName($(input).attr('name'), getState());
    window.updateCurrency  = renderAll;
    window.checkWaehrung   = (sum) => convertBasePrice(sum, getState());

    // =============================================
    // Event-Handler
    // =============================================
    const debouncedRender = debounce(renderAll, 30);

    // Preise & Währung/MWST
    $(document).off('change.priceFix');
    $(document).on(
        'change.priceFix',
        'input[data-price], input[name="waehrung"], input[name="mwst"]',
        debouncedRender
    );

    // Radio-Button: nachfolgende Inputs im selben Step leeren
    $(document).on('change.clearFix', 'input[type="radio"]', function () {
        const $step      = $(this).closest('.konfigurator_step');
        const $allInputs = $step.find('input:checked');
        const startIndex = $allInputs.index($(this)) + 1;
        clearInputs($allInputs.slice(startIndex));
    });

    // Verteilungsart: abhängige Steps leeren
    $(document).on('change.verteilung', 'input[name="verteilungsart"]', function () {
        $('input[name="verteilungsart"]:not(:checked)').each(function () {
            const dataValue = $(this).attr('data-value');
            let inputs;
            if      (dataValue === 'Weitwurfdüse')              inputs = $('[sf-step="step-4"] input:checked, [sf-step="step-5"] input:checked');
            else if (dataValue === 'Schleppschlauchverteilung') inputs = $('[sf-step="step-3"] input:checked, [sf-step="step-5"] input:checked');
            else if (dataValue === 'Flächenverteilung')         inputs = $('[sf-step="step-3"] input:checked, [sf-step="step-4"] input:checked');
            if (inputs) clearInputs(inputs);
        });
    });

    // =============================================
    // SuperformAPI – Accordion bei Step-Wechsel
    // =============================================
    window.SuperformAPI = window.SuperformAPI || [];
    window.SuperformAPI.push(({ getForm }) => {
        const myForm = getForm('konfigurator');

        myForm.onStepChange((params) => {
            const stepName     = `step-${params.stepCount + 1}`;
            const $summaryHeader = $(`.summary_acc-header[tab-name="${stepName}"]`);
            if ($summaryHeader.length && !$summaryHeader.hasClass('is-active-accordion')) {
                $summaryHeader.trigger('click');
            }
        });

        // =============================================
        // SuperformAPI – Formular-Submit
        // =============================================
        myForm.onFormSubmit(async (params) => {

            function getArtNrValues() {
                const artNrValues = [];
                $('input[type="radio"]:checked, input[type="checkbox"]:checked').each(function () {
                    const artNr = $(this).attr('art-nr');
                    if (artNr) artNrValues.push(artNr);
                });
                $('select').each(function () {
                    const artNr = $(this).find('option:selected').attr('art-nr');
                    if (artNr) artNrValues.push(artNr);
                });
                console.log('Artikelnummern:', artNrValues);
                return artNrValues;
            }

            const state = getState();

            params.data.Artikelnummern = getArtNrValues();
            params.data.Waehrung       = state.currency;
            params.data.Mwst           = state.includeMwst ? 'inkl' : 'exkl';
            params.data.Language       = Weglot.getCurrentLang();
            params.data.Total          = $konfTotal.text().replace(/CHF\s*/, '');

            console.log('Form data:', params.data);

            const webhookUrl = 'https://hook.eu1.make.com/mwy1d2pu5pv1n6ocpth13xsgmhsj1gtk';
            console.log('Trigger webhook');

            const response = await fetch(webhookUrl, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(params.data)
            });

            const reply = await response.json();
            console.log('Webhook reply:', reply);

            if (response.status === 200) {
                const el = document.querySelector('.konfigurator_success-message');
                if (el) el.style.display = 'flex';
            }
        });
    });

    // =============================================
    // Init
    // =============================================
    $mwstOption   = $('input[name="mwst"]').parents('.konfiguration_price-option');
    $chfLabel     = $('#chf-label');
    $eurLabel     = $('#eur-label');
    $totalHeading = $('.summary-total-wrapper .heading-style-h3:first');
    $konfTotal    = $('#konfigurator_total');

    renderAll();
    console.log('Pricing patch aktiv: CHF/EUR + MWST neu berechnet.');
})();