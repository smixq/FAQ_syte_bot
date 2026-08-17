import { useEffect, useRef } from 'react';

interface TelegramEmbedProps {
    postPath: string; // Например "tutor4admin/7"
}

export const TelegramEmbed = ({ postPath }: TelegramEmbedProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Полная очистка перед монтированием
        container.innerHTML = '';

        const script = document.createElement('script');
        // Cache-buster (&t=...) заставляет браузер каждый раз выполнять скрипт заново
        script.src = `https://telegram.org/js/telegram-widget.js?22&t=${Date.now()}`;
        script.setAttribute('data-telegram-post', postPath);
        script.setAttribute('data-width', '100%');

        // Раскомментируйте, если сайт в темной теме:
        // script.setAttribute('data-dark', '1');

        script.async = true;

        container.appendChild(script);

        return () => {
            if (container) container.innerHTML = '';
        };
    }, [postPath]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                minHeight: '220px', // Не дает виджету сжаться в 0px до загрузки
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px 0'
            }}
        />
    );
};