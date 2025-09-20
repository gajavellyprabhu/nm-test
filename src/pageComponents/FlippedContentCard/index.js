/* eslint-disable react/no-unescaped-entities */
import Button from 'subComponents/Button';
import styles from './styles.module.scss';
import clsx from 'clsx';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';

export const Default = (props) => {
  const { fields, params } = props;
  const { title, description, link, SecondaryCta, backgroundImage, imageMobile, image, items, titleTag } = fields;
  const { Styles } = params;
  const isPortrait = Styles?.includes('portrait');
  const isImageLeft = Styles?.includes('image-left');
  const isGrayBackground = Styles?.includes('gray-background');

  const shouldRenderTitle = !!title;
  const shouldRenderDescription = !!description;
  const shouldRenderLink = !!link?.value?.href;
  const shouldRenderSecondaryCTA = !!SecondaryCta?.value?.href;
  const shouldRenderMainImage = !!image?.value?.src;
  const shouldRenderbackgroundImage = !!backgroundImage?.desktopSrc;
  const shoulRenderTwoCTA= shouldRenderSecondaryCTA && shouldRenderLink;
  const shouldRenderItems = Array.isArray(items) && items.length > 0;

  return (
    <GlobalStructure
      className={clsx(styles['FlippedContentCard'], isGrayBackground && styles['gray-background'])}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div
        className={clsx(styles['content-container'], isImageLeft && styles['image-left'])}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className={clsx(styles['content'], !shouldRenderMainImage && styles['min-width'])}>
          {shouldRenderTitle && (
            // <div className={styles['title']}>
            //   {title}
            // </div>
            <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
          )}
          {shouldRenderDescription && (
            // <div
            //   className={styles['description']}
            //   dangerouslySetInnerHTML={{
            //     __html: description,
            //   }}
            // />
            <TextComponent field={description} className={styles['description']} />
          )}
          <div className={shoulRenderTwoCTA && styles['twoCta']}>
          {shouldRenderLink && (
            // <a
            //   href={primaryButton?.href}
            //   className={clsx('primary-button', styles['learn-more-button'])}
            // >
            //   {primaryButton?.text}
            // </a>
            <Button link={link} className={clsx('primary-button', styles['learn-more-button'])} />
          )}
           {shouldRenderSecondaryCTA && (
            <Button link={SecondaryCta} className={clsx('secondary-button', styles['learn-more-button'])} />
          )}
          </div>
        </div>
        <div className={clsx(styles['image'], isPortrait && styles['portrait'])}>
          {shouldRenderMainImage && <ImageRenderer desktopSrc={image} mobileSrc={imageMobile} />}
        </div>
      </div>
      {shouldRenderItems && (
        <div className={styles['logo-list']}>
          {items?.map((item, index) => {
            const { icon, title } = item?.fields;
            const shouldRenderIcon = !!icon?.value?.src;
            const shouldRenderTitle = !!title?.value;
            return (
              <div
                key={index}
                className={styles['logo']}
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
              >
                {shouldRenderIcon && (
                  <ImageRenderer
                    renderSVGInImageTag
                    desktopSrc={icon}
                    className={styles['image']}
                  />
                )}
                {shouldRenderTitle && <TextComponent field={title} className={styles['text']} />}
              </div>
            );
          })}
        </div>
      )}
      {shouldRenderbackgroundImage && (
        <ImageRenderer {...backgroundImage} className={styles['background-pattern']} />
      )}
    </GlobalStructure>
  );
};
