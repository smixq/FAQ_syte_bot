import { useState, useEffect, useRef } from 'react';

interface TelegramEmbedProps {
    postPath: string; // Например "tutor4admin/7"
    isDark?: boolean;
}

export const TelegramEmbed = ({ postPath, isDark = false }: TelegramEmbedProps) => {
    const [frameHeight, setFrameHeight] = useState<number>(320);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== 'https://t.me') return;

            // Проверяем, что сообщение resize пришло именно от ЭТОГО конкретного iframe
            if (iframeRef.current && event.source === iframeRef.current.contentWindow) {
                try {
                    const data = JSON.parse(event.data);
                    if (data.event === 'resize' && data.height) {
                        setFrameHeight(data.height);
                    }
                } catch {
                    // Игнорируем сторонние сообщения
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const embedUrl = `https://t.me/${postPath}?embed=1${isDark ? '&dark=1' : ''}`;

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '550px',
                margin: '10px auto',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <iframe
                ref={iframeRef}
                title={`telegram-post-${postPath}`}
                src={embedUrl}
                width="100%"
                height={frameHeight}
                frameBorder="0"
                scrolling="no"
                style={{
                    border: 'none',
                    overflow: 'hidden',
                    width: '100%',
                    borderRadius: '10px',
                    transition: 'height 0.2s ease',
                }}
            />
        </div>
    );
};