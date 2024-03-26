import { cn } from '~/utils/ui.util';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={cn('container mx-auto w-full max-w-[1920px] p-4 xl:px-20', className)}>{children}</div>;
}
