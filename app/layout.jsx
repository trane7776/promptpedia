import '@/styles/globals.css';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
export const metadata = {
  title: 'Поделись промптом',
  description:
    'Поделись промптом с друзьями и получи ответы на свои вопросы от незнакомцев. Поделись своими мыслями и узнай, что думают другие.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ru">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
