// Enhanced Chart Management System
class ChartManager {
    constructor() {
        this.charts = {};
        this.initialized = false;
    }
    
    destroyChart(chartId) {
        if (this.charts[chartId]) {
            this.charts[chartId].destroy();
            delete this.charts[chartId];
        }
    }
    
    destroyAllCharts() {
        Object.keys(this.charts).forEach(key => {
            this.destroyChart(key);
        });
    }
    
    createChart(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Canvas element ${canvasId} not found`);
            return null;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.warn(`Could not get context for ${canvasId}`);
            return null;
        }
        
        // Destroy existing chart if it exists
        this.destroyChart(canvasId);
        
        // Create new chart with error handling
        try {
            this.charts[canvasId] = new Chart(ctx, config);
            return this.charts[canvasId];
        } catch (error) {
            console.error(`Error creating chart ${canvasId}:`, error);
            return null;
        }
    }
}

// Global chart manager instance
const chartManager = new ChartManager();

// Update timestamp
function updateTimestamp() {
    const element = document.getElementById('lastUpdate');
    if (element) {
        element.textContent = `Last Updated: ${new Date().toLocaleString('en-US', { 
            weekday: 'short', 
            month: 'short',
            day: 'numeric',
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        })}`;
    }
}

// Show/hide loading indicator
function setLoading(show) {
    const loader = document.getElementById('loadingIndicator');
    if (loader) {
        loader.classList.toggle('show', show);
    }
}

// Safe Chart.js configuration
function configureChartDefaults() {
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif";
        Chart.defaults.color = '#4a5568';
        Chart.defaults.plugins.legend.display = false;
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
    }
}

// Tab switching with improved error handling
function switchTab(tab) {
    setLoading(true);
    
    // Small delay to show loading state
    setTimeout(() => {
        try {
            // Remove active class from all tabs and buttons
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            
            // Destroy all existing charts
            chartManager.destroyAllCharts();
            
            // Add active class to selected tab and button
            const tabMap = {
                'operational': { tabId: 'operational-tab', buttonIndex: 0, initFunc: initOperationalCharts },
                'errors': { tabId: 'errors-tab', buttonIndex: 1, initFunc: initErrorCharts },
                'transactions': { tabId: 'transactions-tab', buttonIndex: 2, initFunc: initTransactionCharts }
            };
            
            const tabConfig = tabMap[tab];
            if (tabConfig) {
                const tabElement = document.getElementById(tabConfig.tabId);
                const buttonElement = document.querySelectorAll('.tab-button')[tabConfig.buttonIndex];
                
                if (tabElement && buttonElement) {
                    tabElement.classList.add('active');
                    buttonElement.classList.add('active');
                    
                    // Initialize charts for the selected tab
                    requestAnimationFrame(() => {
                        tabConfig.initFunc();
                        setLoading(false);
                    });
                }
            }
        } catch (error) {
            console.error('Error switching tabs:', error);
            setLoading(false);
        }
    }, 50);
}

// Initialize Operational Charts with error handling
function initOperationalCharts() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Availability Chart
    chartManager.createChart('availabilityChart', {
        type: 'line',
        data: {
            labels: ['Mar 24', 'Jun 24', 'Sep 24', 'Dec 24', 'Mar 25', 'Jun 25'],
            datasets: [{
                label: 'Availability %',
                data: [93.5, 94.2, 93.8, 94.5, 94.83, 94.9],
                borderColor: '#818cf8',
                backgroundColor: 'rgba(129, 140, 248, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            scales: {
                y: {
                    min: 92,
                    max: 96,
                    ticks: { callback: value => value + '%' }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `Availability: ${context.parsed.y}%`
                    }
                }
            }
        }
    });

    // Component Health Chart
    chartManager.createChart('healthChart', {
        type: 'doughnut',
        data: {
            labels: ['Healthy (>95%)', 'Warning (90-95%)', 'Critical (<90%)'],
            datasets: [{
                data: [5, 1, 2],
                backgroundColor: [
                    'rgba(167, 243, 208, 0.8)',
                    'rgba(254, 215, 170, 0.8)',
                    'rgba(254, 202, 202, 0.8)'
                ],
                borderColor: [
                    'rgba(110, 231, 183, 1)',
                    'rgba(251, 146, 60, 1)',
                    'rgba(252, 165, 165, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });

    // Daily Pattern Chart
    chartManager.createChart('dailyPatternChart', {
        type: 'bar',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Events',
                data: [150, 80, 450, 680, 520, 280],
                backgroundColor: 'rgba(129, 140, 248, 0.7)',
                borderColor: 'rgba(129, 140, 248, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Temperature Performance Chart
    chartManager.createChart('tempPerfChart', {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Temp vs Performance',
                data: [
                    {x: 28, y: 96.5}, {x: 35, y: 95.2}, {x: 42, y: 94.3},
                    {x: 48, y: 93.2}, {x: 55, y: 91.8}, {x: 62, y: 89.2}
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            scales: {
                x: { 
                    title: { 
                        display: true, 
                        text: 'Temperature (°C)' 
                    } 
                },
                y: { 
                    title: { 
                        display: true, 
                        text: 'Availability (%)' 
                    } 
                }
            }
        }
    });
}

// Initialize Error Charts with error handling
function initErrorCharts() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Error Distribution
    chartManager.createChart('errorDistChart', {
        type: 'pie',
        data: {
            labels: ['Critical', 'Major', 'Minor', 'Self-Resolved'],
            datasets: [{
                data: [2867, 5234, 8934, 1668],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(234, 179, 8, 0.7)',
                    'rgba(16, 185, 129, 0.7)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(16, 185, 129, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: { 
                    display: true, 
                    position: 'right' 
                }
            }
        }
    });

    // Temporal Error Pattern
    chartManager.createChart('temporalErrorChart', {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Error Frequency',
                data: [234, 567, 2345, 3456, 1890, 456],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Component Failures
    chartManager.createChart('failureChart', {
        type: 'bar',
        data: {
            labels: ['Ticket\nPrinter', 'Receipt\nPrinter', 'Note\nRecycler', 'Coin\nUnit', 'RTD', 'Card\nDisp'],
            datasets: [{
                label: 'Failures',
                data: [19690, 13703, 10244, 8635, 4257, 3326],
                backgroundColor: function(context) {
                    const value = context.raw;
                    if (value > 15000) return 'rgba(239, 68, 68, 0.7)';
                    if (value > 8000) return 'rgba(245, 158, 11, 0.7)';
                    return 'rgba(16, 185, 129, 0.7)';
                },
                borderColor: function(context) {
                    const value = context.raw;
                    if (value > 15000) return 'rgba(239, 68, 68, 1)';
                    if (value > 8000) return 'rgba(245, 158, 11, 1)';
                    return 'rgba(16, 185, 129, 1)';
                },
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { 
                    ticks: { 
                        callback: value => (value / 1000) + 'K' 
                    } 
                }
            }
        }
    });

    // Error Spikes
    chartManager.createChart('spikeChart', {
        type: 'bar',
        data: {
            labels: ['Mar 24', 'Jun 24', 'Sep 24', 'Dec 24', 'Mar 25', 'Jun 25'],
            datasets: [{
                label: 'Error Spikes',
                data: [456, 678, 523, 389, 412, 398],
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize Transaction Charts with error handling
function initTransactionCharts() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Revenue Chart
    chartManager.createChart('revenueChart', {
        type: 'line',
        data: {
            labels: ['Mar 24', 'Apr 24', 'May 24', 'Jun 24', 'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25'],
            datasets: [{
                label: 'Total Revenue',
                data: [142000, 148000, 155000, 162000, 168000, 175000, 178000, 182000, 185000, 188000, 191000, 194000, 197000, 199000, 201000, 203000],
                borderColor: '#818cf8',
                backgroundColor: 'rgba(129, 140, 248, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Cash Revenue',
                data: [95000, 93000, 91000, 89000, 87000, 85000, 83000, 81000, 79000, 77000, 75000, 73000, 71000, 69000, 67000, 65000],
                borderColor: '#10b981',
                borderDash: [5, 5],
                tension: 0.4
            }, {
                label: 'Card Revenue',
                data: [47000, 55000, 64000, 73000, 81000, 90000, 95000, 101000, 106000, 111000, 116000, 121000, 126000, 130000, 134000, 138000],
                borderColor: '#f59e0b',
                borderDash: [5, 5],
                tension: 0.4
            }]
        },
        options: {
            plugins: {
                legend: { 
                    display: true, 
                    position: 'top' 
                }
            },
            scales: {
                y: {
                    ticks: { 
                        callback: value => '£' + (value/1000) + 'K' 
                    }
                }
            }
        }
    });

    // Payment Distribution Chart
    chartManager.createChart('paymentDistChart', {
        type: 'doughnut',
        data: {
            labels: ['Cash', 'Bank Card', 'Contactless', 'Mobile Pay'],
            datasets: [{
                data: [58.8, 24.3, 12.4, 4.5],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(236, 72, 153, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: { 
                    display: true, 
                    position: 'right' 
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.parsed}%`
                    }
                }
            }
        }
    });

    // Hourly Transaction Pattern
    chartManager.createChart('hourlyTransChart', {
        type: 'bar',
        data: {
            labels: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            datasets: [{
                label: 'Transactions',
                data: [120, 450, 2340, 4560, 3890, 2340, 1890, 2560, 2890, 2340, 2670, 3890, 4670, 5230, 3450, 2340, 1560, 890, 340],
                backgroundColor: function(context) {
                    const value = context.raw;
                    if (value > 4000) return 'rgba(239, 68, 68, 0.7)';
                    if (value > 2000) return 'rgba(245, 158, 11, 0.7)';
                    return 'rgba(59, 130, 246, 0.7)';
                },
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Cash to Card Migration
    chartManager.createChart('cashCardTrendChart', {
        type: 'line',
        data: {
            labels: ['Mar 24', 'Jun 24', 'Sep 24', 'Dec 24', 'Mar 25', 'Jun 25'],
            datasets: [{
                label: 'Cash %',
                data: [72, 66, 63, 60, 59, 58.8],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Card %',
                data: [28, 34, 37, 40, 41, 41.2],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            plugins: {
                legend: { 
                    display: true, 
                    position: 'top' 
                }
            },
            scales: {
                y: {
                    ticks: { 
                        callback: value => value + '%' 
                    }
                }
            }
        }
    });

    // Product Volume Chart
    chartManager.createChart('productVolumeChart', {
        type: 'bar',
        data: {
            labels: ['Oyster', 'Magnetic', 'Contactless', 'Paper', 'Other'],
            datasets: [{
                label: 'Transaction Volume',
                data: [271000, 78000, 32000, 12000, 5520],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(107, 114, 128, 0.7)'
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(107, 114, 128, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { 
                    ticks: { 
                        callback: value => (value/1000) + 'K' 
                    } 
                }
            }
        }
    });

    // Product Revenue Chart
    chartManager.createChart('productRevenueChart', {
        type: 'pie',
        data: {
            labels: ['Oyster Top-up', 'Day Travelcard', 'Season Ticket', 'Pay As You Go', 'Other'],
            datasets: [{
                data: [1420000, 568000, 426000, 284000, 142000],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(107, 114, 128, 0.7)'
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(107, 114, 128, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: { 
                    display: true, 
                    position: 'right' 
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return context.label + ': £' + (value/1000000).toFixed(2) + 'M (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Initialize on DOM load with proper error handling
document.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
    
    // Wait for Chart.js to be fully loaded
    function waitForChartJS(callback, maxAttempts = 10) {
        let attempts = 0;
        const checkInterval = setInterval(() => {
            attempts++;
            if (typeof Chart !== 'undefined') {
                clearInterval(checkInterval);
                callback();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.error('Chart.js failed to load after maximum attempts');
                setLoading(false);
            }
        }, 200);
    }
    
    waitForChartJS(() => {
        configureChartDefaults();
        // Initialize operational charts on load with a small delay
        requestAnimationFrame(() => {
            initOperationalCharts();
            setLoading(false);
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Chart.js handles resize automatically when responsive: true
    // This is just for any custom resize logic if needed
});