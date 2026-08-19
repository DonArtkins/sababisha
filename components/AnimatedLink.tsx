import React from 'react';
import Link from 'next/link';
import { CyberText } from './CyberText';

interface AnimatedLinkProps {
  to?: string;
  href?: string;
  children: string;
  className?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export function AnimatedLink({ to, href, children, className = '', icon, leftIcon }: AnimatedLinkProps) {
  const baseClasses = `inline-flex items-center gap-2 interactive cursor-none transition-colors ${className}`;
  
  const content = (
    <>
      {leftIcon && leftIcon}
      <CyberText text={children} speed={30} />
      {icon && icon}
    </>
  );

  return (
    <Link href={href || to || '#'} className={baseClasses}>
      {content}
    </Link>
  );
}
