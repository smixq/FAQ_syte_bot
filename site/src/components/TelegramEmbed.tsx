import { useEffect, useRef } from 'react';

interface TelegramEmbedProps {
    postPath: string; // путь поста, например "telegram/204" (без t.me)
}

export const TelegramEmbed = ({ postPath }: TelegramEmbedProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Очищаем контейнер
        containerRef.current.innerHTML = '';

        // Создаем скрипт
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-post', postPath);
        script.setAttribute('data-width', '100%');
        script.async = true;

        // Вставляем скрипт
        containerRef.current.appendChild(script);

        // CLEANUP: Очистка при размонтировании (важно для React)
        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [postPath]);

    return <div ref={containerRef} />;
};