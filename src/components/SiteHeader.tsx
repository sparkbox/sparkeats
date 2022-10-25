export const SiteHeader = () => {
  return (
    <header className="site-header">
      <h1 className="site-header__title">Sparkeats by Sparkbox</h1>
      <a
        className="site-header__logo"
        href={import.meta.env['BASE_URL']}
        aria-label="Return to the Sparkeats Home page."
      />
    </header>
  );
};
