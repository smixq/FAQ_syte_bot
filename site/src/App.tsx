import { FaqList } from './components/FaqList/FaqList';
import { faqData } from './data/faqData';
import './App.css';
import { HeaderLinks } from './components/HeaderLinks/HeaderLinks';

function App() {
  return (
    <main className="main-layout">
      <HeaderLinks
        telegramUrl="@bizarrebotgod_bot"
        webAppUrl="https://superbot.bizarreclub.ru/"
      />
      <FaqList data={faqData} />

    </main>
  );
}

export default App;