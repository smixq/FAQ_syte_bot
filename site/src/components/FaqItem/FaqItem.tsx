import { useState } from 'react';
import type { IFaq } from '../../data/faqData';
import styles from './FaqItem.module.scss';
import { TelegramEmbed } from '../TelegramEmbed';

interface FaqItemProps {
    item: IFaq;
    level?: number;
}

export const FaqItem = ({ item, level = 0 }: FaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div
            className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
            style={{ '--level': level } as React.CSSProperties}
        >
            <button
                className={`${styles.questionBtn} ${level > 0 ? styles.nestedBtn : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.icon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>

            {/* 🔴 ВОТ ЭТОТ БЛОК БЫЛ УДАЛЕН. Он обязателен для анимации! */}
            <div className={styles.answerWrapper}>
                <div className={styles.answerContent}>
                    {item.answer && <p className={styles.text}>{item.answer}</p>}

                    {/* Стандартное видео */}
                    {item.videoUrl && (
                        <div className={styles.videoContainer}>
                            <video controls preload="metadata">
                                <source src={item.videoUrl} type="video/mp4" />
                            </video>
                        </div>
                    )}

                    {/* Наш новый Telegram-виджет */}
                    {item.telegramPost && (
                        <div className={styles.videoContainer}>
                            <TelegramEmbed postPath={item.telegramPost} />
                        </div>
                    )}

                    {/* Вложенные вопросы */}
                    {hasChildren && (
                        <div className={styles.nestedContainer}>
                            {item.children!.map((child) => (
                                <FaqItem key={child.id} item={child} level={level + 1} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};