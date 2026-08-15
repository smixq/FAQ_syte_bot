import type { IFaq } from '../../data/faqData';
import { FaqItem } from '../FaqItem/FaqItem';
import styles from './FaqList.module.scss';

interface FaqListProps {
    data: IFaq[];
}

export const FaqList = ({ data }: FaqListProps) => {
    return (
        <section className={styles.faqSection}>
            <h2 className={styles.title}>Часто задаваемые вопросы</h2>
            <div className={styles.container}>
                {data.map((item) => (
                    <FaqItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};