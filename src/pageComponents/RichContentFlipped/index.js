import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import GlobalStructure from 'subComponents/GlobalStructure';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';

export const Default = (props) => {
  const { fields, rendering, params } = props;
  const { Styles } = params;
  const { description, image, title, titleTag, contentCentered } = fields;
  const { params: renderingParams } = rendering;

  const shouldRenderBannerTitle = !!title?.value;
  const shouldRenderDescription = !!description?.value;
  const shouldRenderImage = !!image?.value?.src;
  const shouldCenterContent = !!contentCentered?.value;
  return (
    <GlobalStructure
      className={clsx(styles['RichContentFlipped'], styles[renderingParams?.Styles])}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div
        className={clsx(
          styles['image-title-wrap'],
          'flex-it',
          shouldCenterContent && styles['centered']
        )}
      >
        <div className={styles['title-desc']}>
          {shouldRenderBannerTitle && (
            <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
          )}
          {shouldRenderDescription && (
            <TextComponent field={description} className={styles['description']} />
          )}
        </div>

        <div className={styles['image']}>
          {shouldRenderImage && <ImageRenderer desktopSrc={image} />}
        </div>
      </div>
    </GlobalStructure>
  );
};
