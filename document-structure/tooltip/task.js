const tooltips = document.querySelectorAll('.has-tooltip');

tooltips.forEach((tooltip) => {
    tooltip.addEventListener('click', () => {
        const tooltipText = tooltip.getAttribute('title');

        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = tooltipText;
        tooltipElement.classList.add('tooltip_active');

        tooltip.insertAdjacentElement('afterend', tooltipElement);

        setTimeout(() => {
            tooltipElement.remove();
        }, 2000);
    });
});
