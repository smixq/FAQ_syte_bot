import { useState, useEffect, useRef } from 'react';
import type { IFaq } from '../../data/faqData';
import styles from './FaqItem.module.scss';
import { TelegramEmbed } from '../TelegramEmbed';

interface FaqItemProps {
    item: IFaq;
    level?: number;
    parentIsOpen?: boolean;
}

export const FaqItem = ({ item, level = 0, parentIsOpen = true }: FaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!parentIsOpen) {
            setIsOpen(false);
        }
    }, [parentIsOpen]);

    useEffect(() => {
        if (!isOpen && contentRef.current) {
            const videos = contentRef.current.querySelectorAll('video');
            videos.forEach((video) => video.pause());

            const iframes = contentRef.current.querySelectorAll('iframe');
            iframes.forEach((iframe) => {
                const currentSrc = iframe.src;
                iframe.src = currentSrc;
            });
        }
    }, [isOpen]);

    // Проверяем, отличается ли заголовок от краткого вопроса
    const showHeaderTitle = item.title && item.title !== item.question;

    return (
        <div
            className={`${styles.faqItem} ${isOpen ? styles.open : ''} ${item.isImportant ? styles.important : ''}`}
            style={{ '--level': level } as React.CSSProperties}
        >
            <button
                className={`${styles.questionBtn} ${level > 0 ? styles.nestedBtn : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={styles.questionText}>
                    {item.isImportant && <span className={styles.badge}>Важно</span>}
                    {item.question}
                </span>
                <span className={styles.icon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>

            <div className={styles.answerWrapper} ref={contentRef}>
                <div className={styles.answerContent}>
                    {/* Выводим развернутый title внутри блока, если он отличается от question */}
                    {showHeaderTitle && <h4 className={styles.itemTitle}>{item.title}</h4>}

                    {/* Поддержка переносов строк \n в тексте ответа */}
                    {item.answer && (
                        <p className={styles.text}>
                            {item.answer.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    )}

                    {item.videoUrl && (
                        <div className={styles.videoContainer}>
                            <video controls preload="metadata">
                                <source src={item.videoUrl} type="video/mp4" />
                            </video>
                        </div>
                    )}

                    {item.telegramPost && (
                        <div className={styles.videoContainer}>
                            <TelegramEmbed postPath={item.telegramPost} />
                        </div>
                    )}

                    {hasChildren && (
                        <div className={styles.nestedContainer}>
                            {item.children!.map((child) => (
                                <FaqItem
                                    key={child.id}
                                    item={child}
                                    level={level + 1}
                                    parentIsOpen={isOpen}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};