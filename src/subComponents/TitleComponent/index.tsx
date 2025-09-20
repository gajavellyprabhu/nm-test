import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import clsx from 'clsx';
import { HeaderTagResolver } from 'utils';
interface TitleComponentProps {
  field: {
    value: string;
  };
  className?: string;
  headingTag?: {
    value: string;
  };
}

const TitleComponent = (props: TitleComponentProps) => {
  const { field, className, headingTag } = props;
  if (!field?.value) {
    return null;
  }
  return (
    <RichText
      className={clsx('default-rich-text', className)}
      field={field}
      tag={HeaderTagResolver(headingTag, 'p')}
    />
  );
};

export default TitleComponent;
