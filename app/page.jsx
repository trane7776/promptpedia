import Feed from "@/components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Уникальное пространство. Находи и делись
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> ИИ промптами</span>
      </h1>
      <p className="desc text-center">
        Добро пожаловать на Промптопедию – уникальное пространство для обмена
        идеями, вдохновением и творческими промптами.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
