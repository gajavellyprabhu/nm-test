import clsx from 'clsx';

const GlobalStructure = ({
  children,
  paddingClass,
  style,
  className,
  isFullWidth,
  isNoPadding,
  defaultPaddingClass,
  anchorId,
  isExpendRight,
  isExpendLeft,
  componentContentClass,
  // props,
  // componentName,
  // className,
  // backgroundResponsiveImageClassName,
  // backgroundResponsiveImage = undefined,
  // hasAuto = false,
  // customRef,
  // isListing,
}) => {
  return (
    <div {...{ className }} {...(!!anchorId && { id: anchorId })}>
      <div className={clsx(`component-wrapper`, isFullWidth && 'full-width')} style={style}>
        <div
          className={clsx(
            `component-content`,
            componentContentClass,
            isNoPadding && 'no-paddding',
            !!defaultPaddingClass ? defaultPaddingClass : 'default-padding-Y', // global level
            isExpendRight && 'expand-right',
            isExpendLeft && 'expand-left',
            paddingClass // page level
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlobalStructure;
