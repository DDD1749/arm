import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../translations";

// Генерация массива для секции ценностей
function getValuesData(l) {
  return [
    {
      head: l.about.values.quality.title,
      desc: l.about.values.quality.description,
    },
    {
      head: l.about.values.craftsmanship.title,
      desc: l.about.values.craftsmanship.description,
    },
    {
      head: l.about.values.sustainability.title,
      desc: l.about.values.sustainability.description,
    }
  ];
}

const AboutPage: React.FC = () => {
  const { language: lang } = useLanguage();
  const t = useTranslation(lang);

  function HeaderBlock() {
    return (
      <div className="relative bg-slate-900">
        <div className="mx-auto flex flex-col items-center py-24  sm:px-6 px-4 lg:px-8 max-w-7xl relative overflow-visible">
          <h1 className="sm:text-5xl text-white text-4xl font-bold cursor-default">{t.about.hero.title}</h1>
          <p className="mt-6  text-xl max-w-3xl text-center text-gray-300 break-normal">{t.about.hero.subtitle}</p>
        </div>
      </div>
    );
  }

  function CompanyStory() {
    const story = t.about.story;
    return (
      <section className="py-16 bg-white">
        <div className="lg:px-8 max-w-7xl px-4  sm:px-6 mx-auto">
          <article className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-3xl text-gray-900 font-bold select-none">{story.title}</h2>
            <div className="space-y-4 text-gray-600">
              {[story.content1, story.content2, story.content3].map((par, i) => (
                <p key={i} className="break-normal">{par}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    );
  }

  function ValuesBlock() {
    const data = getValuesData(t);
    return (
      <section className="py-16  bg-gray-50">
        <div className="mx-auto px-4 lg:px-8 sm:px-6 max-w-7xl  ">
          <h2 className="text-gray-900 mb-12 text-3xl font-bold text-center  cursor-default">{t.about.values.title}</h2>
          <div className="grid gap-8 md:grid-cols-3  grid-cols-1">
            {data.map((v, i) => (
              <div key={i} className="rounded-lg bg-white shadow-md p-8 select-none">
                <h3 className="mb-4 font-semibold text-xl text-gray-900 cursor-default">{v.head}</h3>
                <p className="text-gray-600 break-normal">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="pt-20">
      {/* Хедер страницы */}
      <HeaderBlock />
      {/* Блок про историю компании */}
      <CompanyStory />
      {/* Три наших основных ценности */}
      <ValuesBlock />
    </div>
  );
};

export default AboutPage;
