import { FaqList } from './components/FaqList/FaqList';
import { faqData } from './data/faqData';
import './App.css';

function App() {
  return (
    <main className="main-layout">

      <FaqList data={faqData} />

    </main>
  );
}

export default App;