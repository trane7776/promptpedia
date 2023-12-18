import React from "react";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Пост</span>
      </h1>
      <p className="desc text-left max-w-md">
        Делись промптами с друзьями и знакомыми в интернете. Позволь своему
        другу и друзьям писать промпты и получить ответы на их вопросы.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Ваш ИИ Промпт
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            placeholder="Нашипи свой промпт здесь"
            required
            className="form_textarea"
          />
        </label>
      </form>
    </section>
  );
};

export default Form;
