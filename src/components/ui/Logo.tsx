import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'wordmark' | 'symbol' | 'full';
  className?: string;
  showLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({
  variant = 'wordmark',
  className = '',
  showLink = true,
  size = 'md',
}: LogoProps) {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { height: 22, width: 79 };
      case 'lg':
        return { height: 32, width: 115 };
      case 'md':
      default:
        return { height: 26, width: 93 };
    }
  };

  const { height, width } = getDimensions();

  const renderContent = () => {
    if (variant === 'symbol') {
      return (
        <Image
          src="/brand/pratiksel-icon.png"
          alt="Pratiksel"
          width={32}
          height={32}
          className={`h-8 w-8 object-contain rounded-lg ${className}`}
          priority
        />
      );
    }

    return (
      <Image
        src="/brand/pratiksel-logo.png"
        alt="Pratiksel"
        width={width}
        height={height}
        className={`w-auto h-auto object-contain select-none ${className}`}
        priority
      />
    );
  };

  if (showLink) {
    return (
      <Link href="/" className="inline-flex items-center focus:outline-none" aria-label="pratiksel ana sayfa">
        {renderContent()}
      </Link>
    );
  }

  return renderContent();
}
