export default function AboutUsHero() {
  return (
    <section className="relative bg-[url(https://wallpaperaccess.com/download/1920x1080-cat-5922642)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l" />
      <div className="relative max-w-screen-xl px-4 py-32 mx-auto sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl mx-[80px] text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl text-primary extrabold text- sm:text-5xl">
            PicCat!
          </h1>
          <p className="max-w-lg mt-4 sm:text-xl/relaxed text-secondary">
            Welcome to PicCat, to the
            purrfect corner of the internet dedicated to all things feline! At
            Cat Trivia, we are passionate about celebrating the mysterious,
            playful, and downright enchanting world of cats. Our mission is to
            bring you a whisker-twitching collection of fascinating feline facts
            that will leave you both entertained and enlightened.
          </p>
        </div>
      </div>
    </section>
  );
}
