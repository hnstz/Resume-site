import { Hero } from './features/Hero/Hero';
import { Info } from './features/Info/Info';
import { Workflow } from './features/Workflow/Workflow';
import { Projects } from './features/Projects/Projects';
import { ContactForm } from './features/ContactForm/ContactForm';

const App = () => {
  return (
    <main>
      <Hero />
      <Info />
      <Workflow />
      <Projects />
      <ContactForm />
    </main>
  );
};

export default App;