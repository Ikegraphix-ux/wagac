type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className={`eyebrow mb-3 ${light ? '!text-[#c9ed80]' : ''}`}>
        {eyebrow}
      </p>
      <h2 className={`section-title ${light ? '!text-white' : ''}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-7 ${
            light ? 'text-emerald-50/85' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
