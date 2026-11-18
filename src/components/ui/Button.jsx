export function Button({
  href,
  children,
  variant = 'primary',
  size = 'default',
  ariaLabel,
}) {
  return (
    <a
      className={`button button-${variant} button-${size}`}
      href={href}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
