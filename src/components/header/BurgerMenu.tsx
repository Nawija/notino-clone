export function BurgerMenu({
  showMenu,
  handleMenu,
}: {
  showMenu: boolean;
  handleMenu: () => void;
}) {
  return (
    <button
      aria-label="Menu"
      className={`z-50 order-1 h-12 rounded-lg p-2.5 lg:order-none md:hidden`}
      onClick={handleMenu}
    >
      <div
        className={`bg-main h-0.5 rounded-lg transition-all duration-300 ${
          showMenu ? "w-4 -rotate-45 scale-110" : "m-1 w-4"
        }`}
      />
      <div
        className={`bg-main h-0.5 rounded-lg transition-all duration-300 ${
          showMenu ? "scale-0" : "m-1 w-3"
        }`}
      />
      <div
        className={` bg-main h-0.5 rounded-lg transition-all duration-300 ${
          showMenu ? "w-4 -translate-y-1 rotate-45 scale-110" : "m-1 w-4"
        }`}
      />
    </button>
  );
}
