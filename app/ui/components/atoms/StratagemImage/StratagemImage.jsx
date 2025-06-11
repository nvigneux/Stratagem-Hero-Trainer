import Image from 'next/image';

/**
 * StratagemImage component
 * A specialized image component for stratagem icons with built-in error handling
 * @param {object} props - Component properties
 * @param {string} props.src - The source of the image
 * @param {string} props.name - The name of the stratagem
 * @param {number} [props.width=55] - Width of the image
 * @param {number} [props.height=55] - Height of the image
 * @param {string} [props.className] - Additional class names
 * @param {boolean} [props.priority=false] - Whether the image is priority
 * @param {string} [props.loading] - Loading behavior
 * @param {string} [props.testId=''] - Test ID for the image
 * @returns {JSX.Element} The StratagemImage component
 */
function StratagemImage({
  src,
  name,
  width = 55,
  height = 55,
  className,
  priority = false,
  loading,
  testId = '',
}) {
  return (
    <Image
      src={src}
      alt={name}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={loading}
      data-testid={testId}
      onError={(e) => {
        e.target.src = '/icons/question-mark.svg';
      }}
    />
  );
}

export default StratagemImage;
