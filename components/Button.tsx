import React from 'react';
import Link from 'next/link';
import { CyberText } from './CyberText';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

type ButtonAsButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: never;
  href?: never;
};

type ButtonAsLinkProps = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  href?: never;
};

type ButtonAsExternalLinkProps = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  to?: never;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsExternalLinkProps;

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold rounded-full interactive cursor-none transition-all duration-300 transform active:scale-95';
  
  const variants = {
    primary: 'bg-[#111111] text-white hover:bg-black/80 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-[#FF5A36] text-white hover:bg-[#E84E2D] shadow-[0_0_20px_rgba(255,90,54,0.3)] hover:shadow-[0_0_30px_rgba(255,90,54,0.4)] hover:scale-105',
    outline: 'border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white',
    ghost: 'bg-transparent text-[#111111] hover:bg-gray-100',
  };

  const sizes = {
    sm: 'h-10 px-5 text-xs',
    md: 'h-14 px-8 text-sm',
    lg: 'h-16 px-10 text-lg',
  };

  const renderChildren = () => {
    if (typeof children === 'string') {
      return <CyberText text={children} speed={30} />;
    }
    return children;
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if ('to' in props && props.to) {
    const { to, ...rest } = props as any;
    return (
      <Link href={to} className={combinedClasses} {...rest}>
        {renderChildren()}
        {icon && <span className="ml-2">{icon}</span>}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, ...rest } = props as any;
    return (
      <Link href={href} className={combinedClasses} {...rest}>
        {renderChildren()}
        {icon && <span className="ml-2">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {renderChildren()}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
}
