const tooltips = document.querySelectorAll('.has-tooltip');
let activeTooltip; // Переменная для хранения ссылки на активную подсказку

tooltips.forEach((tooltip) => {
    tooltip.addEventListener('click', (event) => {
        event.preventDefault();

        const tooltipText = tooltip.getAttribute('title');
        const linkDataText = tooltip.dataset.text || ''; 

        if (activeTooltip) { // Если есть активная подсказка
            if (tooltipText !== activeTooltip.textContent) { // Если текст подсказки не совпадает с текстом новой ссылки
                activeTooltip.textContent = tooltipText; // Обновляем текст подсказки
                activeTooltip.style.left = tooltip.getBoundingClientRect().left + 'px'; // Позиционируем подсказку относительно новой ссылки
                activeTooltip.style.top = tooltip.getBoundingClientRect().bottom + 'px';
            } else { // Если тексты совпадают
                activeTooltip.classList.toggle('tooltip_active'); // Инвертируем отображение подсказки
            }
        } else { // Если нет активной подсказки
            const newTooltip= `
            <div class="tooltip tooltip_active" style="top: ${tooltip.getBoundingClientRect().bottom}px;">
                ${tooltipText}
            </div>`;

            tooltip.insertAdjacentHTML('afterend', newTooltip);
            activeTooltip = tooltip.nextElementSibling;
        }
    });
});