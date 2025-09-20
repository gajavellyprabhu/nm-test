import { RichText, RichTextProps } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';
import { HeaderTagResolver } from 'utils';

interface TextComponentProps extends RichTextProps {
  field: {
    value: string;
  };
  className?: string;
  headingTag?: { value: string };
  onClick?: any;
  onClickCapture?: any;
}

const TextComponent = (props: TextComponentProps) => {
  const { field, className, headingTag, onClick, onClickCapture } = props;
  const shouldRenderTitle = !!field?.value;
  //   const shouldRenderTitle = !!field;
  if (!shouldRenderTitle) {
    return null;
  }
  return (
    shouldRenderTitle && (
      <RichText
        {...{
          className: clsx('default-rich-text', className),
          field,
          onClick,
          tag: HeaderTagResolver(headingTag, 'div'),
          onClickCapture,
        }}
      />
    )
  );
};

export default TextComponent;
