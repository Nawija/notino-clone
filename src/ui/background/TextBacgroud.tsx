type TextType = {
  text: string;
};

export default function TextBacgroud({ text }: TextType) {
  return (
    <span className="absolute left-1/2 top-0 -z-10 w-full -translate-x-1/2 overflow-hidden bg-gradient-to-t from-white/10 to-transparent bg-clip-text py-8 text-4xl font-bold uppercase tracking-[1rem] text-transparent sm:py-20 lg:text-[14rem]">
      {text}
    </span>
  );
}
