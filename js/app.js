/**
 * FreelanceCalc - Main Application JavaScript
 * Author: Seyfeddine Gharbi
 * Version: 1.0.0
 * 
 * A rate calculator and project estimator for freelance web developers
 */

// ================================
// Configuration
// ================================

const CONFIG = {
    // Base hours for different project types
    projectBaseHours: {
        landing: 12,
        brochure: 24,
        blog: 30,
        ecommerce: 60,
        webapp: 80,
        custom: 40
    },
    // Tax reserve percentage
    taxRate: 0.25,
    // Weeks in a year
    weeksPerYear: 52
};

// ================================
// DOM Elements
// ================================

const elements = {
    // Rate calculator inputs
    annualIncome: document.getElementById('annual-income'),
    billableHours: document.getElementById('billable-hours'),
    billableHoursValue: document.getElementById('billable-hours-value'),
    weeksOff: document.getElementById('weeks-off'),
    weeksOffValue: document.getElementById('weeks-off-value'),
    expenses: document.getElementById('expenses'),
    experience: document.getElementById('experience'),

    // Project estimator inputs
    projectType: document.getElementById('project-type'),
    complexity: document.getElementById('complexity'),
    complexityMeter: document.getElementById('complexity-meter'),
    checkboxItems: document.querySelectorAll('.checkbox-item'),

    // Result displays
    minRate: document.getElementById('min-rate'),
    targetRate: document.getElementById('target-rate'),
    projectHours: document.getElementById('project-hours'),
    projectTotal: document.getElementById('project-total'),

    // Breakdown displays
    bdIncome: document.getElementById('bd-income'),
    bdExpenses: document.getElementById('bd-expenses'),
    bdTax: document.getElementById('bd-tax'),
    bdWeeks: document.getElementById('bd-weeks'),
    bdHours: document.getElementById('bd-hours'),
    bdExp: document.getElementById('bd-exp'),

    // Modal elements
    modal: document.getElementById('quote-modal'),
    generateBtn: document.getElementById('generate-quote'),
    closeModalBtn: document.getElementById('close-modal'),
    closeModalBtn2: document.getElementById('close-modal-2'),
    copyQuoteBtn: document.getElementById('copy-quote'),
    quoteDate: document.getElementById('quote-date'),
    quoteContent: document.getElementById('quote-content'),
    quoteTotalValue: document.getElementById('quote-total-value')
};

// ================================
// State
// ================================

let quoteData = {
    targetRate: 0,
    baseHours: 0,
    featureHours: 0,
    complexityMultiplier: 1,
    totalProjectHours: 0,
    projectTotal: 0,
    projectType: ''
};

// ================================
// Calculator Functions
// ================================

/**
 * Main calculation function
 * Calculates hourly rates and project estimates based on inputs
 */
function calculate() {
    // Get input values
    const income = parseFloat(elements.annualIncome.value) || 0;
    const hoursPerWeek = parseFloat(elements.billableHours.value) || 30;
    const weeksOffYear = parseFloat(elements.weeksOff.value) || 5;
    const monthlyExpenses = parseFloat(elements.expenses.value) || 0;
    const expMultiplier = parseFloat(elements.experience.value) || 1;
    const complexityMultiplier = parseFloat(elements.complexity.value) || 1;

    // Update slider displays
    elements.billableHoursValue.textContent = hoursPerWeek;
    elements.weeksOffValue.textContent = weeksOffYear;

    // Calculate working time
    const workingWeeks = CONFIG.weeksPerYear - weeksOffYear;
    const annualHours = workingWeeks * hoursPerWeek;
    const annualExpenses = monthlyExpenses * 12;

    // Calculate rates
    const taxReserve = income * CONFIG.taxRate;
    const totalNeeded = income + annualExpenses + taxReserve;
    const minRate = Math.ceil(totalNeeded / annualHours);
    const targetRate = Math.ceil(minRate * expMultiplier);

    // Calculate project hours
    const baseHours = CONFIG.projectBaseHours[elements.projectType.value] || 40;
    let featureHours = 0;
    
    elements.checkboxItems.forEach(item => {
        if (item.classList.contains('checked')) {
            featureHours += parseInt(item.dataset.hours) || 0;
        }
    });

    const totalProjectHours = Math.ceil((baseHours + featureHours) * complexityMultiplier);
    const projectTotal = totalProjectHours * targetRate;

    // Update complexity meter
    updateComplexityMeter(totalProjectHours);

    // Update result displays
    elements.minRate.textContent = formatCurrency(minRate);
    elements.targetRate.textContent = formatCurrency(targetRate);
    elements.projectHours.textContent = totalProjectHours;
    elements.projectTotal.textContent = formatCurrency(projectTotal);

    // Update breakdown displays
    elements.bdIncome.textContent = formatCurrency(income);
    elements.bdExpenses.textContent = `-${formatCurrency(annualExpenses)}`;
    elements.bdTax.textContent = `-${formatCurrency(Math.ceil(taxReserve))}`;
    elements.bdWeeks.textContent = workingWeeks;
    elements.bdHours.textContent = annualHours.toLocaleString();
    elements.bdExp.textContent = `×${expMultiplier}`;

    // Store data for quote generation
    quoteData = {
        targetRate,
        baseHours,
        featureHours,
        complexityMultiplier,
        totalProjectHours,
        projectTotal,
        projectType: elements.projectType.options[elements.projectType.selectedIndex].text
    };
}

/**
 * Update the complexity meter visual indicator
 * @param {number} hours - Total project hours
 */
function updateComplexityMeter(hours) {
    const bars = elements.complexityMeter.querySelectorAll('.complexity-bar');
    
    // Determine complexity level based on hours
    let level = 1;
    if (hours > 20) level = 2;
    if (hours > 40) level = 3;
    if (hours > 60) level = 4;
    if (hours > 80) level = 5;

    // Update bar states
    bars.forEach((bar, index) => {
        bar.classList.remove('active', 'medium', 'high');
        
        if (index < level) {
            bar.classList.add('active');
            if (level >= 4) bar.classList.add('high');
            else if (level >= 3) bar.classList.add('medium');
        }
    });
}

// ================================
// Quote Modal Functions
// ================================

/**
 * Generate and display the quote modal
 */
function generateQuote() {
    const today = new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    elements.quoteDate.textContent = today;

    // Build quote content HTML
    let quoteHTML = `
        <div class="quote-line">
            <span>${quoteData.projectType} Development</span>
            <span>${quoteData.baseHours} hrs × ${formatCurrency(quoteData.targetRate)}</span>
        </div>
    `;

    if (quoteData.featureHours > 0) {
        quoteHTML += `
            <div class="quote-line">
                <span>Additional Features</span>
                <span>${quoteData.featureHours} hrs × ${formatCurrency(quoteData.targetRate)}</span>
            </div>
        `;
    }

    if (quoteData.complexityMultiplier > 1) {
        quoteHTML += `
            <div class="quote-line">
                <span>Complexity Adjustment</span>
                <span>×${quoteData.complexityMultiplier}</span>
            </div>
        `;
    }

    elements.quoteContent.innerHTML = quoteHTML;
    elements.quoteTotalValue.textContent = formatCurrency(quoteData.projectTotal);

    // Show modal
    elements.modal.classList.add('active');
}

/**
 * Close the quote modal
 */
function closeModal() {
    elements.modal.classList.remove('active');
}

/**
 * Copy quote to clipboard as plain text
 */
function copyQuoteToClipboard() {
    const text = `
PROJECT QUOTE
=============
${quoteData.projectType} Development: ${quoteData.baseHours} hrs × ${formatCurrency(quoteData.targetRate)}
${quoteData.featureHours > 0 ? `Additional Features: ${quoteData.featureHours} hrs × ${formatCurrency(quoteData.targetRate)}` : ''}
${quoteData.complexityMultiplier > 1 ? `Complexity Adjustment: ×${quoteData.complexityMultiplier}` : ''}
--------------
Total: ${formatCurrency(quoteData.projectTotal)}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        elements.copyQuoteBtn.textContent = 'Copied!';
        setTimeout(() => {
            elements.copyQuoteBtn.textContent = 'Copy to Clipboard';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ================================
// Utility Functions
// ================================

/**
 * Format a number as GBP currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return `£${amount.toLocaleString()}`;
}

// ================================
// Event Listeners
// ================================

function initEventListeners() {
    // Rate calculator inputs
    const calculatorInputs = [
        elements.annualIncome,
        elements.billableHours,
        elements.weeksOff,
        elements.expenses,
        elements.experience,
        elements.projectType,
        elements.complexity
    ];

    calculatorInputs.forEach(el => {
        el.addEventListener('input', calculate);
        el.addEventListener('change', calculate);
    });

    // Checkbox toggles
    elements.checkboxItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
            calculate();
        });
    });

    // Modal controls
    elements.generateBtn.addEventListener('click', generateQuote);
    elements.closeModalBtn.addEventListener('click', closeModal);
    elements.closeModalBtn2.addEventListener('click', closeModal);
    elements.copyQuoteBtn.addEventListener('click', copyQuoteToClipboard);

    // Close modal on overlay click
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ================================
// Initialization
// ================================

function init() {
    initEventListeners();
    calculate(); // Initial calculation
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
