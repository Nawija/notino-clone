const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent";

export function PortfolioItemSkeleton() {
  return (
    <div className="bg-main border-second overflow-hidden rounded-lg border">
      <div className="border-second group relative overflow-hidden border-b p-2 lg:p-4">
        <div
          className={`${shimmer} flex-c border-main relative h-44 w-full overflow-hidden rounded-lg border bg-zinc-800 opacity-20 lg:h-52`}
        >
          {/* Image placeholder */}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start p-4">
        <div className="flex-b text-main w-full">
          <div
            className={`${shimmer} relative mb-2 h-4 w-3/4 overflow-hidden rounded-lg bg-zinc-800`}
          />
          {/* Label placeholder */}
        </div>

        <div
          className={`${shimmer} relative mb-2 h-4 w-1/2 overflow-hidden rounded-lg bg-zinc-800`}
        />
        {/* Description placeholder */}
      </div>
    </div>
  );
}

export function FullFixedSkeleton() {
  return (
    <div
      className={`fixed left-0 top-0 z-[9999999999999] h-full w-full bg-[#292828] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-[#292828] before:via-[#4e4e4eee] before:to-[#292828]`}
    />
  );
}
