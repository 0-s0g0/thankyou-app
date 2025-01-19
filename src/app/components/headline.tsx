export const Headline = ({ headline }: { headline: string }) => {
  return (
    <div className="w-[420px] px-5 py-2">
      <h1 className="font-bold text-lg">{headline}</h1>
    </div>
  );
};
